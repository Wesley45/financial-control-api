import { format } from "date-fns";

import { ICreateRevenueDTO } from "@modules/revenue/dtos/ICreateRevenueDTO";
import { IRequestRevenueDTO } from "@modules/revenue/dtos/IRequestRevenueDTO";
import { RevenueModel } from "@modules/revenue/entities/Revenue";
import { Revenue } from "@modules/revenue/infra/typeorm/entities/Revenue";
import { IRevenueRepository } from "../IRevenueRepository";

class RevenueRepositoryInMemory implements IRevenueRepository {
  revenue: Revenue[] = [];

  async create({
    description,
    amount,
    date,
  }: ICreateRevenueDTO): Promise<RevenueModel> {
    const revenue = new Revenue();

    Object.assign(revenue, {
      description,
      amount,
      date,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.revenue.push(revenue);

    return revenue;
  }

  async findById(id: string): Promise<RevenueModel | undefined> {
    const revenue = this.revenue.find((revenue) => revenue.id === id);
    return revenue;
  }

  async findByDescription(
    description: string
  ): Promise<RevenueModel | undefined> {
    const revenue = this.revenue.find(
      (revenue) => revenue.description === description
    );

    return revenue;
  }

  async findByDescriptionAndDate(
    description: string,
    date: string
  ): Promise<RevenueModel | undefined> {
    const revenue = this.revenue.find(
      (revenue) =>
        revenue.description === description &&
        format(revenue.date, "yyyy-MM") === date
    );
    return revenue;
  }

  async findByIdAndDescriptionAndDate(
    id: string,
    description: string,
    date: string
  ): Promise<RevenueModel | undefined> {
    const revenue = this.revenue.find(
      (revenue) =>
        revenue.id !== id &&
        revenue.description === description &&
        format(revenue.date, "yyyy-MM") === date
    );
    return revenue;
  }

  async delete(id: string): Promise<void> {
    const revenue = this.revenue.filter((revenue) => revenue.id !== id);
    this.revenue = revenue;
  }

  async list({ description }: IRequestRevenueDTO): Promise<RevenueModel[]> {
    if (description) {
      return this.revenue.filter(
        (revenue) => revenue.description === description
      );
    }

    return this.revenue;
  }

  async listByYearAndMonth(
    year: string,
    month: string
  ): Promise<RevenueModel[]> {
    const revenue = this.revenue.filter(
      (revenue) =>
        format(revenue.date, "yyyy") === year &&
        format(revenue.date, "MM") === month
    );
    return revenue;
  }

  async totalAmountRevenueByMonth(
    year: string,
    month: string
  ): Promise<number> {
    const total = this.revenue.reduce((accumulator, revenue) => {
      if (
        format(revenue.date, "yyyy") === year &&
        format(revenue.date, "MM") === month
      ) {
        accumulator += Number(revenue.amount);
      }
      return accumulator;
    }, 0);

    return total;
  }

  async update(
    { description, amount, date }: ICreateRevenueDTO,
    id: string
  ): Promise<void> {
    let revenue = this.revenue.find((revenue) => {
      return revenue.id === id;
    });

    if (revenue) {
      revenue.description = description;
      revenue.amount = amount;
      revenue.date = date;
    }
  }
}

export { RevenueRepositoryInMemory };
