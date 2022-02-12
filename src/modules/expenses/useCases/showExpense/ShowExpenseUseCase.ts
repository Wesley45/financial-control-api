import { inject, injectable } from "tsyringe";

import { IExpensesRepository } from "@modules/expenses/repositories/IExpensesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ShowExpenseUseCase {
  constructor(
    @inject("ExpensesRepository")
    private expensesRepository: IExpensesRepository
  ) {}

  public async execute(id: string) {
    const expense = await this.expensesRepository.findById(id);

    if (!expense) {
      throw new AppError("Expense not found", 404);
    }

    return expense;
  }
}

export { ShowExpenseUseCase };
