import { inject, injectable } from "tsyringe";
import { format } from "date-fns";

import { IRevenueRepository } from "@modules/revenue/repositories/IRevenueRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  description: string;
  amount: number;
  date: string;
}

@injectable()
class UpdateRevenueUseCase {
  constructor(
    @inject("RevenueRepository")
    private revenueRepository: IRevenueRepository
  ) {}

  public async execute(
    { description, amount, date }: IRequest,
    id: string
  ): Promise<void> {
    const revenue = await this.revenueRepository.findById(id);

    if (!revenue) {
      throw new AppError("Revenue not found", 404);
    }

    const dateRevenue = new Date(`${date} 00:00:00`);

    const revenueAlreadyExists =
      await this.revenueRepository.findByIdAndDescriptionAndDate(
        id,
        description,
        format(dateRevenue, "yyyy-MM")
      );

    if (revenueAlreadyExists) {
      throw new AppError("Revenue already recorded");
    }

    await this.revenueRepository.update(
      { description, amount: amount / 100, date: dateRevenue },
      id
    );
  }
}

export { UpdateRevenueUseCase };
