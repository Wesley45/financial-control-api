import { inject, injectable } from "tsyringe";
import { format } from "date-fns";

import { IExpensesRepository } from "@modules/expenses/repositories/IExpensesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  description: string;
  amount: number;
  date: string;
}

@injectable()
class UpdateExpenseUseCase {
  constructor(
    @inject("ExpensesRepository")
    private expensesRepository: IExpensesRepository
  ) {}

  public async execute(
    { description, amount, date }: IRequest,
    id: string
  ): Promise<void> {
    const expense = await this.expensesRepository.findById(id);

    if (!expense) {
      throw new AppError("Expense not found", 404);
    }

    const dateExpense = new Date(`${date} 00:00:00`);

    const expenseAlreadyExists =
      await this.expensesRepository.findByIdAndDescriptionAndDate(
        id,
        description,
        format(dateExpense, "yyyy-MM")
      );

    if (expenseAlreadyExists) {
      throw new AppError("Expense already recorded");
    }

    await this.expensesRepository.update(
      { description, amount: amount / 100, date: dateExpense },
      id
    );
  }
}

export { UpdateExpenseUseCase };
