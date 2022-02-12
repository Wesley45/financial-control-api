import { inject, injectable } from "tsyringe";
import { format } from "date-fns";

import { ICategoriesRepository } from "@modules/expenses/repositories/ICategoriesRepository";
import { IExpensesRepository } from "@modules/expenses/repositories/IExpensesRepository";
import { ExpenseModel } from "@modules/expenses/entities/ExpenseModel";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  description: string;
  amount: number;
  date: string;
  category_id?: string;
}

@injectable()
class CreateExpenseUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository,
    @inject("ExpensesRepository")
    private expensesRepository: IExpensesRepository
  ) {}

  public async execute({
    description,
    amount,
    date,
    category_id,
  }: IRequest): Promise<ExpenseModel> {
    const dateExpense = new Date(`${date} 00:00:00`);

    const expenseAlreadyExists =
      await this.expensesRepository.findByDescriptionAndDate(
        description,
        format(dateExpense, "yyyy-MM")
      );

    if (expenseAlreadyExists) {
      throw new AppError("Expense already exists!");
    }

    let categoryId: string = "";
    if (!category_id) {
      const categoryDefault = await this.categoriesRepository.findByName(
        "Outras"
      );

      categoryId = categoryDefault?.id as string;
    }

    if (category_id) {
      const category = await this.categoriesRepository.findById(category_id);

      if (!category) {
        throw new AppError("Category not found!");
      }

      categoryId = category.id as string;
    }

    const expense = await this.expensesRepository.create({
      description,
      amount: amount / 100,
      date: dateExpense,
      category_id: categoryId,
    });

    return expense;
  }
}

export { CreateExpenseUseCase };
