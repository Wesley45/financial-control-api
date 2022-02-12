import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { IExpensesRepository } from "@modules/expenses/repositories/IExpensesRepository";

@injectable()
class DeleteExpenseUseCase {
  constructor(
    @inject("ExpensesRepository")
    private expensesRepository: IExpensesRepository
  ) {}

  public async execute(id: string): Promise<void> {
    const expense = await this.expensesRepository.findById(id);

    if (!expense) {
      throw new AppError("Expense not found", 404);
    }

    await this.expensesRepository.delete(id);
  }
}

export { DeleteExpenseUseCase };
