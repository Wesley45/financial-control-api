import { format } from "date-fns";

import { CategoriesRepositoryInMemory } from "@modules/expenses/repositories/in-memory/CategoriesRepositoryInMemory";
import { ExpensesRepositoryInMemory } from "@modules/expenses/repositories/in-memory/ExpensesRepositoryInMemory";
import { UpdateExpenseUseCase } from "./UpdateExpenseUseCase";
import { AppError } from "@shared/errors/AppError";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let expensesRepositoryInMemory: ExpensesRepositoryInMemory;
let updateExpenseUseCase: UpdateExpenseUseCase;

describe("Update Expense", () => {
  beforeAll(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    expensesRepositoryInMemory = new ExpensesRepositoryInMemory();
    updateExpenseUseCase = new UpdateExpenseUseCase(expensesRepositoryInMemory);
  });

  it("should be able to update a expense data", async () => {
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

    await updateExpenseUseCase.execute(
      {
        description: "Expense update test again",
        amount: 8999,
        date: format(new Date(), "yyyy-MM-dd"),
      },
      expense.id as string
    );

    const expenseUpdated = await expensesRepositoryInMemory.findById(
      expense.id as string
    );

    expect(expenseUpdated).toHaveProperty("id");
    expect(expenseUpdated).toHaveProperty("description");
    expect(expenseUpdated).toHaveProperty("amount");
    expect(expenseUpdated).toHaveProperty("date");
    expect(expenseUpdated).toHaveProperty("category_id");
    expect(expenseUpdated?.id).toBe(expense.id);
    expect(expenseUpdated?.category_id).toBe(expense.category_id);
    expect(expenseUpdated?.description).not.toBe(expenseData.description);
    expect(expenseUpdated?.amount).not.toBe(expenseData.amount / 100);
    expect(expenseUpdated?.date).toBe(expense.date);
  });

  it("should not be able to update expense data when it does not exist", async () => {
    await expect(
      updateExpenseUseCase.execute(
        {
          description: "Expense update test again",
          amount: 8999,
          date: format(new Date(), "yyyy-MM-dd"),
        },
        "expense"
      )
    ).rejects.toEqual(new AppError("Expense not found", 404));
  });

  it("should not be able to update expense data with the same description in the same month", async () => {
    const category = await categoriesRepositoryInMemory.findByName(
      "Alimentação"
    );

    const expense = await expensesRepositoryInMemory.create({
      description: "Expense update test",
      amount: 79.99,
      date: new Date(`${format(new Date(), "yyyy-MM-dd")} 00:00:00`),
      category_id: category?.id,
    });

    await expensesRepositoryInMemory.create({
      description: "Another expense test",
      amount: 69.99,
      date: new Date(`${format(new Date(), "yyyy-MM-dd")} 00:00:00`),
      category_id: category?.id,
    });

    await expect(
      updateExpenseUseCase.execute(
        {
          description: "Another expense test",
          amount: 7999,
          date: format(new Date(), "yyyy-MM-dd"),
        },
        expense.id as string
      )
    ).rejects.toEqual(new AppError("Expense already recorded"));
  });
});
