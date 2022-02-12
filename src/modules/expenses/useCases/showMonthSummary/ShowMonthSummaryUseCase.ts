import { inject, injectable } from "tsyringe";

import { IExpensesRepository } from "@modules/expenses/repositories/IExpensesRepository";
import { IRevenueRepository } from "@modules/revenue/repositories/IRevenueRepository";

interface IRequest {
  year: string;
  month: string;
}

interface Category {
  name: string;
  total: number;
}

interface Response {
  totalAmountRevenue: number;
  totalAmountExpenses: number;
  balance: number;
  categories: Category[];
}

@injectable()
class ShowMonthSummaryUseCase {
  constructor(
    @inject("ExpensesRepository")
    private expensesRepository: IExpensesRepository,
    @inject("RevenueRepository")
    private revenueRepository: IRevenueRepository
  ) {}

  public async execute({ year, month }: IRequest): Promise<Response> {
    const totalAmountRevenue =
      await this.revenueRepository.totalAmountRevenueByMonth(year, month);

    const totalAmountExpenses =
      await this.expensesRepository.totalAmountExpensesByMonth(year, month);

    const totalAmountSpentInCategories =
      await this.expensesRepository.totalAmountSpentInCategoriesByMonth(
        year,
        month
      );

    const balance = totalAmountRevenue - totalAmountExpenses;

    let categories: Category[] = [];
    if (totalAmountSpentInCategories.length) {
      categories = totalAmountSpentInCategories.map((category) => {
        return {
          ...category,
          total: Number(category.total) * 100,
        };
      });
    }

    return {
      totalAmountRevenue,
      totalAmountExpenses,
      balance,
      categories,
    };
  }
}

export { ShowMonthSummaryUseCase };
