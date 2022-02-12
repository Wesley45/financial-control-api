import { inject, injectable } from "tsyringe";

import { IRevenueRepository } from "@modules/revenue/repositories/IRevenueRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ShowRevenueUseCase {
  constructor(
    @inject("RevenueRepository")
    private revenueRepository: IRevenueRepository
  ) {}

  public async execute(id: string) {
    const revenue = await this.revenueRepository.findById(id);

    if (!revenue) {
      throw new AppError("Revenue not found", 404);
    }

    return revenue;
  }
}

export { ShowRevenueUseCase };
