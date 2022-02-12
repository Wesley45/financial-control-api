import { RevenueRepositoryInMemory } from "@modules/revenue/repositories/in-memory/RevenueRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { UpdateRevenueUseCase } from "./UpdateRevenueUseCase";

let updateRevenueUseCase: UpdateRevenueUseCase;
let revenueRepositoryInMemory: RevenueRepositoryInMemory;

describe("Update Revenue", () => {
  beforeAll(() => {
    revenueRepositoryInMemory = new RevenueRepositoryInMemory();
    updateRevenueUseCase = new UpdateRevenueUseCase(revenueRepositoryInMemory);
  });

  it("should be able to update a revenue data", async () => {
    const dateRevenue = new Date(`2022-02-05 00:00:00`);

    const revenueData = {
      description: "Revenue test",
      amount: 59.99,
      date: dateRevenue,
    };

    const revenue = await revenueRepositoryInMemory.create(revenueData);

    const updateRecipeData = {
      description: "Revenue update test",
      amount: 6000,
      date: "2022-02-05",
    };

    await updateRevenueUseCase.execute(updateRecipeData, revenue.id as string);

    const updatedRevenueData = await revenueRepositoryInMemory.findById(
      revenue.id as string
    );

    expect(updatedRevenueData?.description).toBe(updateRecipeData.description);
    expect(updatedRevenueData?.description).not.toBe(revenueData.description);
    expect(updatedRevenueData?.amount).toBe(updateRecipeData.amount / 100);
    expect(updatedRevenueData?.amount).not.toBe(revenueData.amount);
    expect(updatedRevenueData?.date).not.toBe(revenueData.date);
  });

  it("should not be able to update revenue data when it does not exist", async () => {
    await expect(
      updateRevenueUseCase.execute(
        {
          description: "Revenue update test",
          amount: 6000,
          date: "2022-02-05",
        },
        "revenue"
      )
    ).rejects.toEqual(new AppError("Revenue not found", 404));
  });

  it("should not be able to update revenue data with the same description in the same month", async () => {
    const dateRevenue = new Date(`2022-02-05 00:00:00`);

    const revenue = await revenueRepositoryInMemory.create({
      description: "Revenue test",
      amount: 59.99,
      date: dateRevenue,
    });

    await revenueRepositoryInMemory.create({
      description: "Another revenue test",
      amount: 69.99,
      date: dateRevenue,
    });

    await expect(
      updateRevenueUseCase.execute(
        {
          description: "Another revenue test",
          amount: 59.99,
          date: "2022-02-05",
        },
        revenue.id as string
      )
    ).rejects.toEqual(new AppError("Revenue already recorded"));
  });
});
