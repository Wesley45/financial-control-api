import { format } from "date-fns";

import { CategoriesRepositoryInMemory } from "@modules/expenses/repositories/in-memory/CategoriesRepositoryInMemory";
import { ExpensesRepositoryInMemory } from "@modules/expenses/repositories/in-memory/ExpensesRepositoryInMemory";
import { ShowExpenseUseCase } from "./ShowExpenseUseCase";
import { AppError } from "@shared/errors/AppError";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let expensesRepositoryInMemory: ExpensesRepositoryInMemory;
let showExpenseUseCase: ShowExpenseUseCase;

describe("Show Expense", () => {
  beforeAll(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    expensesRepositoryInMemory = new ExpensesRepositoryInMemory();
    showExpenseUseCase = new ShowExpenseUseCase(expensesRepositoryInMemory);
  });

  it("should be able to show the details of a expense", async () => {
    const category = await categoriesRepositoryInMemory.findByName(
      "Alimentação"
    );

    const expenseData = {
      description: "Expense test",
      amount: 59.99,
      date: new Date(`${format(new Date(), "yyyy-MM-dd")} 00:00:00`),
      category_id: category?.id,
    };

    const expense = await expensesRepositoryInMemory.create(expenseData);

    const expenseDetails = await showExpenseUseCase.execute(
      expense.id as string
    );

    expect(expenseDetails).toHaveProperty("description");
    expect(expenseDetails).toHaveProperty("amount");
    expect(expenseDetails).toHaveProperty("date");
    expect(expenseDetails).toHaveProperty("id");
    expect(expenseDetails).toEqual(expense);
  });

  it("should not be able to show the details of a expense that does not exist", async () => {
    await expect(showExpenseUseCase.execute("revenue")).rejects.toEqual(
      new AppError("Expense not found", 404)
    );
  });
});
