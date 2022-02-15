import { format } from "date-fns";

import { ExpensesRepositoryInMemory } from "@modules/expenses/repositories/in-memory/ExpensesRepositoryInMemory";
import { RevenueRepositoryInMemory } from "@modules/revenue/repositories/in-memory/RevenueRepositoryInMemory";
import { CategoriesRepositoryInMemory } from "@modules/expenses/repositories/in-memory/CategoriesRepositoryInMemory";
import { ShowMonthSummaryUseCase } from "./ShowMonthSummaryUseCase";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let expensesRepositoryInMemory: ExpensesRepositoryInMemory;
let revenueRepositoryInMemory: RevenueRepositoryInMemory;
let showMonthSummaryUseCase: ShowMonthSummaryUseCase;

describe("Show month summary", () => {
  beforeAll(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    expensesRepositoryInMemory = new ExpensesRepositoryInMemory();
    revenueRepositoryInMemory = new RevenueRepositoryInMemory();
    showMonthSummaryUseCase = new ShowMonthSummaryUseCase(
      expensesRepositoryInMemory,
      revenueRepositoryInMemory
    );
  });

  it("should be able to detail the summary for a given month", async () => {
    const dateNow = new Date(`${format(new Date(), "yyyy-MM-dd")} 00:00:00`);

    const category = await categoriesRepositoryInMemory.findByName(
      "Alimentação"
    );

    const expenseData = {
      description: "Expense test",
      amount: 60.0,
      date: dateNow,
      category_id: category?.id,
    };

    await expensesRepositoryInMemory.create(expenseData);

    const revenueData = {
      description: "Revenue test",
      amount: 110.5,
      date: dateNow,
    };

    await revenueRepositoryInMemory.create(revenueData);

    const response = await showMonthSummaryUseCase.execute({
      year: format(dateNow, "yyyy"),
      month: format(dateNow, "MM"),
    });

    expect(response).toHaveProperty("totalAmountRevenue");
    expect(response).toHaveProperty("totalAmountExpenses");
    expect(response).toHaveProperty("balance");
    expect(response.totalAmountRevenue).toBe(revenueData.amount);
    expect(response.totalAmountExpenses).toBe(expenseData.amount);
    expect(response.balance).toBe(revenueData.amount - expenseData.amount);
  });
});
