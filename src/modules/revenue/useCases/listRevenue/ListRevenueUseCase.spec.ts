import { RevenueRepositoryInMemory } from "@modules/revenue/repositories/in-memory/RevenueRepositoryInMemory";

import { ListRevenueUseCase } from "./ListRevenueUseCase";

let listRevenueUseCase: ListRevenueUseCase;
let revenueRepositoryInMemory: RevenueRepositoryInMemory;

describe("List Revenue", () => {
  beforeAll(() => {
    revenueRepositoryInMemory = new RevenueRepositoryInMemory();
    listRevenueUseCase = new ListRevenueUseCase(revenueRepositoryInMemory);
  });

  it("should be able to list all revenue", async () => {
    const dateRevenue = new Date(`2022-02-05 00:00:00`);

    const revenueData = {
      description: "Revenue test",
      amount: 59.99,
      date: dateRevenue,
    };

    await revenueRepositoryInMemory.create(revenueData);

    const revenue = await listRevenueUseCase.execute({ description: "" });

    expect(revenue.length).toBe(1);
    expect(revenue[0]).toHaveProperty("id");
    expect(revenue[0]).toHaveProperty("description");
    expect(revenue[0]).toHaveProperty("amount");
    expect(revenue[0]).toHaveProperty("date");
    expect(revenue[0]).toHaveProperty("created_at");
    expect(revenue[0]).toHaveProperty("updated_at");
    expect(revenue[0].description).toBe(revenueData.description);
    expect(revenue[0].amount).toBe(revenueData.amount);
    expect(revenue[0].date).toBe(dateRevenue);
  });
});
