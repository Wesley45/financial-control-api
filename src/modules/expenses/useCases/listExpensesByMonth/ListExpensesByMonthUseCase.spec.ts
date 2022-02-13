import { add, format } from "date-fns";

import { ExpensesRepositoryInMemory } from "@modules/expenses/repositories/in-memory/ExpensesRepositoryInMemory";
import { ListExpensesByMonthUseCase } from "./ListExpensesByMonthUseCase";

let expensesRepositoryInMemory: ExpensesRepositoryInMemory;
let listExpensesByMonthUseCase: ListExpensesByMonthUseCase;

describe("List expenses by month", () => {
  beforeAll(() => {
    expensesRepositoryInMemory = new ExpensesRepositoryInMemory();
    listExpensesByMonthUseCase = new ListExpensesByMonthUseCase(
      expensesRepositoryInMemory
    );
  });

  it("should be able to list all as expenses for a given month", async () => {
    const dateNow = new Date(`${format(new Date(), "yyyy-MM-dd")} 00:00:00`);

    const expenseData = {
      description: "Expense test",
      amount: 59.99,
      date: dateNow,
    };

    const expense = await expensesRepositoryInMemory.create(expenseData);

    await expensesRepositoryInMemory.create({
      description: "Expense test",
      amount: 59.99,
      date: add(dateNow, { months: 1 }),
    });

    const listExpenses = await listExpensesByMonthUseCase.execute({
      year: format(dateNow, "yyyy"),
      month: format(dateNow, "MM"),
    });

    expect(listExpenses.length).toBe(1);
    expect(listExpenses[0]).toHaveProperty("description");
    expect(listExpenses[0]).toHaveProperty("amount");
    expect(listExpenses[0]).toHaveProperty("date");
    expect(listExpenses[0]).toHaveProperty("id");
    expect(listExpenses[0].description).toBe(expense.description);
    expect(listExpenses[0].amount).toBe(expense.amount);
    expect(listExpenses[0].date).toBe(expense.date);
  });
});
