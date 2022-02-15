import { ICreateExpenseDTO } from "@modules/expenses/dtos/ICreateExpenseDTO";
import { IRequestExpenseDTO } from "@modules/expenses/dtos/IRequestExpenseDTO";
import { ExpenseModel } from "@modules/expenses/entities/ExpenseModel";
import { Expense } from "@modules/expenses/infra/typeorm/entities/Expense";
import { format } from "date-fns";
import { IExpensesRepository } from "../IExpensesRepository";

class ExpensesRepositoryInMemory implements IExpensesRepository {
  expenses: Expense[] = [];

  async create({
    description,
    amount,
    date,
    category_id,
  }: ICreateExpenseDTO): Promise<ExpenseModel> {
    const expense = new Expense();

    Object.assign(expense, {
      description,
      amount,
      date,
      category_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.expenses.push(expense);

    return expense;
  }

  async delete(id: string): Promise<void> {
    const expenses = this.expenses.filter((expense) => expense.id !== id);
    this.expenses = expenses;
  }

  async findById(id: string): Promise<ExpenseModel | undefined> {
    const expense = this.expenses.find((expense) => expense.id === id);
    return expense;
  }

  async findByDescriptionAndDate(
    description: string,
    date: string
  ): Promise<ExpenseModel | undefined> {
    const expense = this.expenses.find(
      (expense) =>
        expense.description === description &&
        format(expense.date, "yyyy-MM") === date
    );
    return expense;
  }

  async findByIdAndDescriptionAndDate(
    id: string,
    description: string,
    date: string
  ): Promise<ExpenseModel | undefined> {
    const expense = this.expenses.find(
      (expense) =>
        expense.id !== id &&
        expense.description === description &&
        format(expense.date, "yyyy-MM") === date
    );
    return expense;
  }

  async list({ description }: IRequestExpenseDTO): Promise<ExpenseModel[]> {
    if (description) {
      return this.expenses.filter(
        (expense) => expense.description === description
      );
    }
    return this.expenses;
  }

  async listByYearAndMonth(
    year: string,
    month: string
  ): Promise<ExpenseModel[]> {
    const expenses = this.expenses.filter(
      (expense) =>
        format(expense.date, "yyyy") === year &&
        format(expense.date, "MM") === month
    );
    return expenses;
  }

  async totalAmountExpensesByMonth(
    year: string,
    month: string
  ): Promise<number> {
    const total = this.expenses.reduce((accumulator, expense) => {
      if (
        format(expense.date, "yyyy") === year &&
        format(expense.date, "MM") === month
      ) {
        accumulator += Number(expense.amount);
      }
      return accumulator;
    }, 0);

    return total;
  }

  async totalAmountSpentInCategoriesByMonth(
    year: string,
    month: string
  ): Promise<{ name: string; total: string }[]> {
    return [{ name: "", total: "" }];
  }

  async update(
    { description, date, amount, category_id }: ICreateExpenseDTO,
    id: string
  ): Promise<void> {
    const expense = this.expenses.find((expense) => expense.id === id);

    if (expense) {
      expense.description = description;
      expense.date = date;
      expense.amount = amount;
      expense.category_id = expense.category_id;
    }
  }
}

export { ExpensesRepositoryInMemory };
