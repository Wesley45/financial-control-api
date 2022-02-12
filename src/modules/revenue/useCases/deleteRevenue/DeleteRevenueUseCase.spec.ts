import { RevenueRepositoryInMemory } from "@modules/revenue/repositories/in-memory/RevenueRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { DeleteRevenueUseCase } from "./DeleteRevenueUseCase";

let deleteRevenueUseCase: DeleteRevenueUseCase;
let revenueRepositoryInMemory: RevenueRepositoryInMemory;

describe("Delete Revenue", () => {
  beforeAll(() => {
    revenueRepositoryInMemory = new RevenueRepositoryInMemory();
    deleteRevenueUseCase = new DeleteRevenueUseCase(revenueRepositoryInMemory);
  });

  it("should be able to delete a revenue", async () => {
    const dateRevenue = new Date(`2022-02-05 00:00:00`);

    const revenueData = {
      description: "Revenue test",
      amount: 60.0,
      date: dateRevenue,
    };

    const revenue = await revenueRepositoryInMemory.create(revenueData);

    await deleteRevenueUseCase.execute(revenue.id as string);

    const revenueNotExists = await revenueRepositoryInMemory.findById(
      revenue.id as string
    );

    expect(revenueNotExists).toBe(undefined);
  });

  it("should not be able to delete a revenue when it does not exists", async () => {
    await expect(deleteRevenueUseCase.execute("revenue")).rejects.toEqual(
      new AppError("Revenue not found", 404)
    );
  });
});
