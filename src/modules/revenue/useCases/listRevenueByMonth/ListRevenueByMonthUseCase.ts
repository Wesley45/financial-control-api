import { inject, injectable } from "tsyringe";

import { IRevenueRepository } from "@modules/revenue/repositories/IRevenueRepository";
import { RevenueModel } from "@modules/revenue/entities/Revenue";

interface IRequest {
  year: string;
  month: string;
}

@injectable()
class ListRevenueByMonthUseCase {
  constructor(
    @inject("RevenueRepository")
    private revenueRepository: IRevenueRepository
  ) {}

  public async execute({ year, month }: IRequest): Promise<RevenueModel[]> {
    return this.revenueRepository.listByYearAndMonth(year, month);
  }
}

export { ListRevenueByMonthUseCase };
