import { ICreateRevenueDTO } from "../dtos/ICreateRevenueDTO";
import { IRequestRevenueDTO } from "../dtos/IRequestRevenueDTO";
import { RevenueModel } from "../entities/Revenue";

export interface IRevenueRepository {
  create(data: ICreateRevenueDTO): Promise<RevenueModel>;
  findById(id: string): Promise<RevenueModel | undefined>;
  findByDescription(description: string): Promise<RevenueModel | undefined>;
  findByDescriptionAndDate(
    description: string,
    date: string
  ): Promise<RevenueModel | undefined>;
  findByIdAndDescriptionAndDate(
    id: string,
    description: string,
    date: string
  ): Promise<RevenueModel | undefined>;
  delete(id: string): Promise<void>;
  list(data: IRequestRevenueDTO): Promise<RevenueModel[]>;
  listByYearAndMonth(year: string, month: string): Promise<RevenueModel[]>;
  totalAmountRevenueByMonth(year: string, month: string): Promise<number>;
  update(data: ICreateRevenueDTO, id: string): Promise<void>;
}
