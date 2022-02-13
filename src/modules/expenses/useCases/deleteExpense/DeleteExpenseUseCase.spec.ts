import { format } from "date-fns";

import { CategoriesRepositoryInMemory } from "@modules/expenses/repositories/in-memory/CategoriesRepositoryInMemory";
import { ExpensesRepositoryInMemory } from "@modules/expenses/repositories/in-memory/ExpensesRepositoryInMemory";
import { DeleteExpenseUseCase } from "./DeleteExpenseUseCase";
import { AppError } from "@shared/errors/AppError";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let deleteExpenseUseCase: DeleteExpenseUseCase;
let expensesRepositoryInMemory: ExpensesRepositoryInMemory;

describe("Delete Expense", () => {
  beforeAll(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    expensesRepositoryInMemory = new ExpensesRepositoryInMemory();
    deleteExpenseUseCase = new DeleteExpenseUseCase(expensesRepositoryInMemory);
  });

  it("should be able to delete a expense", async () => {
    const category = await categoriesRepositoryInMemory.findByName(
      "Alimentação"
    );

    const expenseData = {
      description: "Expense update test",
      amount: 79.99,
      date: new Date(`${format(new Date(), "yyyy-MM-dd")} 00:00:00`),
      category_id: category?.id,
    };

    const expense = await expensesRepositoryInMemory.create(expenseData);

    await deleteExpenseUseCase.execute(expense.id as string);

    const expenseNotExists = await expensesRepositoryInMemory.findById(
      expense.id as string
    );

    expect(expenseNotExists).toBe(undefined);
  });

  it("should not be able to delete a expense when it does not exists", async () => {
    await expect(deleteExpenseUseCase.execute("expense")).rejects.toEqual(
      new AppError("Expense not found", 404)
    );
  });
});
