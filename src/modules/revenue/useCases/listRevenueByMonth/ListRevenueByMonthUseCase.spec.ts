import { add, format } from "date-fns";

import { RevenueRepositoryInMemory } from "@modules/revenue/repositories/in-memory/RevenueRepositoryInMemory";
import { ListRevenueByMonthUseCase } from "./ListRevenueByMonthUseCase";

let revenueRepositoryInMemory: RevenueRepositoryInMemory;
let listRevenueByMonthUseCase: ListRevenueByMonthUseCase;

describe("List revenue by month", () => {
  beforeAll(() => {
    revenueRepositoryInMemory = new RevenueRepositoryInMemory();
    listRevenueByMonthUseCase = new ListRevenueByMonthUseCase(
      revenueRepositoryInMemory
    );
  });

  it("should be able to list all as revenue for a given month", async () => {
    const dateNow = new Date(`${format(new Date(), "yyyy-MM-dd")} 00:00:00`);

    const revenueData = {
      description: "Revenue test",
      amount: 59.99,
      date: dateNow,
    };

    const revenue = await revenueRepositoryInMemory.create(revenueData);

    await revenueRepositoryInMemory.create({
      description: "Revenue test",
      amount: 59.99,
      date: add(dateNow, { months: 1 }),
    });

    const listRevenue = await listRevenueByMonthUseCase.execute({
      year: format(dateNow, "yyyy"),
      month: format(dateNow, "MM"),
    });

    expect(listRevenue.length).toBe(1);
    expect(listRevenue[0]).toHaveProperty("description");
    expect(listRevenue[0]).toHaveProperty("amount");
    expect(listRevenue[0]).toHaveProperty("date");
    expect(listRevenue[0]).toHaveProperty("id");
    expect(listRevenue[0].description).toBe(revenue.description);
    expect(listRevenue[0].amount).toBe(revenue.amount);
    expect(listRevenue[0].date).toBe(revenue.date);
  });
});
