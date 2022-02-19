import { inject, injectable } from "tsyringe";
import { format } from "date-fns";

import { IRevenueRepository } from "@modules/revenue/repositories/IRevenueRepository";
import { RevenueModel } from "@modules/revenue/entities/Revenue";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  description: string;
  amount: number;
  date: string;
}

@injectable()
class CreateRevenueUseCase {
  constructor(
    @inject("RevenueRepository")
    private revenueRepository: IRevenueRepository
  ) {}

  async execute({
    description,
    amount,
    date,
  }: IRequest): Promise<RevenueModel> {
    const dateRevenue = new Date(date);

    const revenueAlreadyExists =
      await this.revenueRepository.findByDescriptionAndDate(
        description,
        format(dateRevenue, "yyyy-MM")
      );

    if (revenueAlreadyExists) {
      throw new AppError("Revenue already recorded");
    }

    const revenue = await this.revenueRepository.create({
      description,
      amount: amount / 100,
      date: dateRevenue,
    });

    return revenue;
  }
}

export { CreateRevenueUseCase };
