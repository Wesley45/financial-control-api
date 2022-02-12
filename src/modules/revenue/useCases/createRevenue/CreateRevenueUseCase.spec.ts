import { RevenueRepositoryInMemory } from "@modules/revenue/repositories/in-memory/RevenueRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRevenueUseCase } from "./CreateRevenueUseCase";

let createRevenueUseCase: CreateRevenueUseCase;
let revenueRepositoryInMemory: RevenueRepositoryInMemory;

describe("Create Revenue", () => {
  beforeAll(() => {
    revenueRepositoryInMemory = new RevenueRepositoryInMemory();
    createRevenueUseCase = new CreateRevenueUseCase(revenueRepositoryInMemory);
  });

  it("should be able to create a new revenue", async () => {
    const revenue = await createRevenueUseCase.execute({
      description: "Revenue test",
      amount: 5999,
      date: "2022-02-05",
    });

    expect(revenue).toHaveProperty("id");
    expect(revenue).toHaveProperty("created_at");
    expect(revenue).toHaveProperty("updated_at");
    expect(revenue.description).toBe("Revenue test");
    expect(revenue.amount).toBe(59.99);
  });

  it("should not be able to create a new revenue with the same description in the same month", async () => {
    await createRevenueUseCase.execute({
      description: "New revenue test",
      amount: 6000,
      date: "2022-02-05",
    });

    await expect(
      createRevenueUseCase.execute({
        description: "New revenue test",
        amount: 6000,
        date: "2022-02-05",
      })
    ).rejects.toEqual(new AppError("Revenue already recorded"));
  });
});
