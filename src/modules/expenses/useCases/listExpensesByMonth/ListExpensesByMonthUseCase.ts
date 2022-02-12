import { inject, injectable } from "tsyringe";

import { IExpensesRepository } from "@modules/expenses/repositories/IExpensesRepository";

interface IRequest {
  year: string;
  month: string;
}

@injectable()
class ListExpensesByMonthUseCase {
  constructor(
    @inject("ExpensesRepository")
    private expensesRepository: IExpensesRepository
  ) {}

  public async execute({ year, month }: IRequest) {
    const expenses = await this.expensesRepository.listByYearAndMonth(
      year,
      month
    );
    return expenses;
  }
}

export { ListExpensesByMonthUseCase };
