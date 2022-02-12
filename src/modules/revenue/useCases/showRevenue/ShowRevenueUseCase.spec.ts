import { RevenueRepositoryInMemory } from "@modules/revenue/repositories/in-memory/RevenueRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { ShowRevenueUseCase } from "./ShowRevenueUseCase";

let showRevenueUseCase: ShowRevenueUseCase;
let revenueRepositoryInMemory: RevenueRepositoryInMemory;

describe("Show Revenue", () => {
  beforeAll(() => {
    revenueRepositoryInMemory = new RevenueRepositoryInMemory();
    showRevenueUseCase = new ShowRevenueUseCase(revenueRepositoryInMemory);
  });

  it("should be able to show the details of a revenue", async () => {
    const dateRevenue = new Date(`2022-02-05 00:00:00`);

    const revenueData = {
      description: "Revenue test",
      amount: 59.99,
      date: dateRevenue,
    };

    const revenue = await revenueRepositoryInMemory.create(revenueData);

    const revenueDetails = await showRevenueUseCase.execute(
      revenue.id as string
    );

    expect(revenueDetails).toHaveProperty("description");
    expect(revenueDetails).toHaveProperty("amount");
    expect(revenueDetails).toHaveProperty("date");
    expect(revenueDetails).toHaveProperty("id");
    expect(revenueDetails.description).toBe(revenueData.description);
    expect(revenueDetails.amount).toBe(revenueData.amount);
    expect(revenueDetails.date).toBe(revenueData.date);
    expect(revenueDetails.id).toBe(revenue.id);
  });

  it("should not be able to show the details of a revenue that does not exist", async () => {
    await expect(showRevenueUseCase.execute("revenue")).rejects.toEqual(
      new AppError("Revenue not found", 404)
    );
  });
});
