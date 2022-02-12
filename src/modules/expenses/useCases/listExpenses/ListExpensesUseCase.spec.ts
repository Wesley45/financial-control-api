import { format } from "date-fns";

import { CategoriesRepositoryInMemory } from "@modules/expenses/repositories/in-memory/CategoriesRepositoryInMemory";
import { ExpensesRepositoryInMemory } from "@modules/expenses/repositories/in-memory/ExpensesRepositoryInMemory";
import { ListExpensesUseCase } from "./ListExpensesUseCase";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let expensesRepositoryInMemory: ExpensesRepositoryInMemory;
let listExpensesUseCase: ListExpensesUseCase;

describe("List Expenses", () => {
  beforeAll(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    expensesRepositoryInMemory = new ExpensesRepositoryInMemory();
    listExpensesUseCase = new ListExpensesUseCase(expensesRepositoryInMemory);
  });

  it("should be able to list all expenses", async () => {
    const category = await categoriesRepositoryInMemory.findByName(
      "Alimentação"
    );

    const expenseData = {
      description: "Expense test",
      amount: 59.99,
      date: new Date(`${format(new Date(), "yyyy-MM-dd")} 00:00:00`),
      category_id: category?.id,
    };

    await expensesRepositoryInMemory.create(expenseData);

    const expenses = await listExpensesUseCase.execute({ description: "" });

    expect(expenses.length).toBe(1);
    expect(expenses[0]).toHaveProperty("description");
    expect(expenses[0]).toHaveProperty("amount");
    expect(expenses[0]).toHaveProperty("date");
    expect(expenses[0]).toHaveProperty("id");
    expect(expenses[0].description).toBe(expenseData.description);
    expect(expenses[0].amount).toBe(expenseData.amount);
    expect(expenses[0].date).toBe(expenseData.date);
    expect(expenses[0].category_id).toBe(category?.id);
  });
});
