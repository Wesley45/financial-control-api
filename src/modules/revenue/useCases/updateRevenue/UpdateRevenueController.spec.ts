import supertest from "supertest";
import { Connection } from "typeorm";
import { format } from "date-fns";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

const request = supertest(app);

let connection: Connection;

describe("Update Revenue Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to update a revenue data", async () => {
    const revenueData = {
      description: "Revenue update test",
      amount: 8990,
      date: format(new Date(), "yyyy-MM-dd"),
    };

    const revenueCreated = await request.post("/revenue").send(revenueData);

    const { id } = revenueCreated.body;

    const updateRecipeData = {
      description: "Revenue update test",
      amount: 6000,
      date: format(new Date(), "yyyy-MM-dd"),
    };

    const revenueUpdated = await request
      .put(`/revenue/${id}`)
      .send(updateRecipeData);

    const revenue = await request.get(`/revenue/${id}`);

    expect(revenueUpdated.status).toBe(204);
    expect(revenue.body.amount).not.toBe(revenueCreated.body.amount);
  });

  it("should not be able to update revenue data when it does not exist", async () => {
    const updateRecipeData = {
      description: "Revenue update test",
      amount: 6000,
      date: format(new Date(), "yyyy-MM-dd"),
    };

    const response = await request
      .put(`/revenue/revenue`)
      .send(updateRecipeData);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Revenue not found");
  });

  it("should not be able to update revenue data with the same description in the same month", async () => {
    const revenueData = {
      description: "Revenue update test with same description",
      amount: 8990,
      date: format(new Date(), "yyyy-MM-dd"),
    };

    const revenueCreated = await request.post("/revenue").send(revenueData);

    const { id } = revenueCreated.body;

    await request.post("/revenue").send({
      description: "Another revenue test",
      amount: 6999,
      date: format(new Date(), "yyyy-MM-dd"),
    });

    const revenueUpdated = await request.put(`/revenue/${id}`).send({
      description: "Another revenue test",
      amount: 5999,
      date: format(new Date(), "yyyy-MM-dd"),
    });

    expect(revenueUpdated.status).toBe(400);
    expect(revenueUpdated.body.message).toBe("Revenue already recorded");
  });
});
