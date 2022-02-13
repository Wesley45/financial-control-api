import { ExpensesRepositoryInMemory } from "@modules/expenses/repositories/in-memory/ExpensesRepositoryInMemory";
import { RevenueRepositoryInMemory } from "@modules/revenue/repositories/in-memory/RevenueRepositoryInMemory";
import { ShowMonthSummaryUseCase } from "./ShowMonthSummaryUseCase";

let expensesRepositoryInMemory: ExpensesRepositoryInMemory;
let revenueRepositoryInMemory: RevenueRepositoryInMemory;
let showMonthSummaryUseCase: ShowMonthSummaryUseCase;

describe("Show month summary", () => {
  beforeAll(() => {
    expensesRepositoryInMemory = new ExpensesRepositoryInMemory();
    revenueRepositoryInMemory = new RevenueRepositoryInMemory();
    showMonthSummaryUseCase = new ShowMonthSummaryUseCase(
      expensesRepositoryInMemory,
      revenueRepositoryInMemory
    );
  });

  it("should be able to detail the summary for a given month", async () => {
    //await showMonthSummaryUseCase.execute();
  });
});
