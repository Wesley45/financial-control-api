import { inject, injectable } from "tsyringe";

import { IRevenueRepository } from "@modules/revenue/repositories/IRevenueRepository";
import { RevenueModel } from "@modules/revenue/entities/Revenue";

interface IRequest {
  description?: string;
}

@injectable()
class ListRevenueUseCase {
  constructor(
    @inject("RevenueRepository")
    private revenueRepository: IRevenueRepository
  ) {}

  public async execute({ description }: IRequest): Promise<RevenueModel[]> {
    return this.revenueRepository.list({ description });
  }
}

export { ListRevenueUseCase };
