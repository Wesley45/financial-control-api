import { format } from "date-fns";

import { CategoriesRepositoryInMemory } from "@modules/expenses/repositories/in-memory/CategoriesRepositoryInMemory";
import { ExpensesRepositoryInMemory } from "@modules/expenses/repositories/in-memory/ExpensesRepositoryInMemory";
import { CreateExpenseUseCase } from "./CreateExpenseUseCase";
import { AppError } from "@shared/errors/AppError";

let createExpenseUseCase: CreateExpenseUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let expensesRepositoryInMemory: ExpensesRepositoryInMemory;

describe("Create Expense", () => {
  beforeAll(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    expensesRepositoryInMemory = new ExpensesRepositoryInMemory();
    createExpenseUseCase = new CreateExpenseUseCase(
      categoriesRepositoryInMemory,
      expensesRepositoryInMemory
    );
  });

  it("should be able to create a new expense", async () => {
    const category = await categoriesRepositoryInMemory.findByName(
      "Alimentação"
    );

    const expenseData = {
      description: "Expense test",
      amount: 6000,
      date: format(new Date(), "yyyy-MM-dd"),
      category_id: category?.id,
    };

    const expense = await createExpenseUseCase.execute(expenseData);

    expect(expense).toHaveProperty("id");
    expect(expense).toHaveProperty("description");
    expect(expense).toHaveProperty("amount");
    expect(expense).toHaveProperty("date");
    expect(expense).toHaveProperty("category_id");
    expect(expense.category_id).toBe(category?.id);
    expect(expense.description).toBe(expenseData.description);
    expect(expense.amount).toBe(expenseData.amount / 100);
  });

  it("should be able to create a new expense when the category id is empty", async () => {
    const category = await categoriesRepositoryInMemory.findByName("Outras");

    const expenseData = {
      description: "Expense new test",
      amount: 7990,
      date: format(new Date(), "yyyy-MM-dd"),
    };

    const expense = await createExpenseUseCase.execute(expenseData);

    expect(expense).toHaveProperty("id");
    expect(expense).toHaveProperty("description");
    expect(expense).toHaveProperty("amount");
    expect(expense).toHaveProperty("date");
    expect(expense).toHaveProperty("category_id");
    expect(expense.category_id).toBe(category?.id);
    expect(expense.description).toBe(expenseData.description);
    expect(expense.amount).toBe(expenseData.amount / 100);
  });

  it("should not be able to create a new expense with the same description in the same month", async () => {
    await createExpenseUseCase.execute({
      description: "New Expense test",
      amount: 6000,
      date: format(new Date(), "yyyy-MM-dd"),
    });

    await expect(
      createExpenseUseCase.execute({
        description: "New Expense test",
        amount: 6000,
        date: format(new Date(), "yyyy-MM-dd"),
      })
    ).rejects.toEqual(new AppError("Expense already exists!"));
  });

  it("should not be able to create a new expense when the category id does not exist", async () => {
    await expect(
      createExpenseUseCase.execute({
        description: "Expense with category not found",
        amount: 6000,
        date: format(new Date(), "yyyy-MM-dd"),
        category_id: "expense",
      })
    ).rejects.toEqual(new AppError("Category not found!"));
  });
});
