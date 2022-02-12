import { getRepository, Repository } from "typeorm";

import { ICreateRevenueDTO } from "@modules/revenue/dtos/ICreateRevenueDTO";
import { RevenueModel } from "@modules/revenue/entities/Revenue";
import { IRevenueRepository } from "@modules/revenue/repositories/IRevenueRepository";
import { Revenue } from "../entities/Revenue";
import { IRequestRevenueDTO } from "@modules/revenue/dtos/IRequestRevenueDTO";

class RevenueRepository implements IRevenueRepository {
  private repository: Repository<Revenue>;

  constructor() {
    this.repository = getRepository(Revenue);
  }

  async create({
    description,
    amount,
    date,
  }: ICreateRevenueDTO): Promise<RevenueModel> {
    const revenue = this.repository.create({
      description,
      amount,
      date,
    });

    await this.repository.save(revenue);

    return revenue;
  }

  async findByDescription(
    description: string
  ): Promise<RevenueModel | undefined> {
    const revenue = await this.repository.findOne({
      where: {
        description,
      },
    });

    return revenue;
  }

  async list({ description }: IRequestRevenueDTO): Promise<RevenueModel[]> {
    const whereConditional: IRequestRevenueDTO = {};
    if (description) {
      whereConditional.description = description;
    }

    const revenue = await this.repository.find({
      where: whereConditional,
    });
    return revenue;
  }

  async listByYearAndMonth(
    year: string,
    month: string
  ): Promise<RevenueModel[]> {
    const revenue = await this.repository
      .createQueryBuilder()
      .where(`YEAR(date) = :year`, { year: year })
      .andWhere(`MONTH(date) = :month`, { month: month })
      .getMany();

    return revenue;
  }

  async findById(id: string): Promise<RevenueModel | undefined> {
    const revenue = await this.repository.findOne({
      where: {
        id,
      },
    });

    return revenue;
  }

  async findByDescriptionAndDate(
    description: string,
    date: string
  ): Promise<RevenueModel | undefined> {
    const revenue = await this.repository
      .createQueryBuilder()
      .where(`description = :description`, { description: description })
      .andWhere(`DATE_FORMAT(date, '%Y-%m') = :date`, {
        date: date,
      })
      .getOne();

    return revenue;
  }

  async findByIdAndDescriptionAndDate(
    id: string,
    description: string,
    date: string
  ): Promise<RevenueModel | undefined> {
    const revenue = await this.repository
      .createQueryBuilder()
      .where(`description = :description`, { description: description })
      .andWhere(`DATE_FORMAT(date, '%Y-%m') = :date`, {
        date: date,
      })
      .andWhere(`id <> :id`, { id: id })
      .getOne();

    return revenue;
  }

  async update(
    { description, amount, date }: ICreateRevenueDTO,
    id: string
  ): Promise<void> {
    await this.repository.update(
      { id },
      {
        description,
        amount,
        date,
      }
    );
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ id });
  }

  async totalAmountRevenueByMonth(
    year: string,
    month: string
  ): Promise<number> {
    const revenue = await this.repository
      .createQueryBuilder()
      .select("SUM(amount)", "total")
      .where(`YEAR(date) = :year`, { year: year })
      .andWhere(`MONTH(date) = :month`, { month: month })
      .getRawOne<{ total: number }>();

    let total = 0;
    if (revenue?.total) {
      total = revenue.total * 100;
    }

    return total;
  }
}

export { RevenueRepository };
