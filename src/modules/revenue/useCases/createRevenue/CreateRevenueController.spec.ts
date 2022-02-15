import supertest from "supertest";
import { Connection } from "typeorm";
import { format } from "date-fns";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

const request = supertest(app);

let connection: Connection;

describe("Create Revenue Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new revenue", async () => {
    const revenueData = {
      description: "Revenue test",
      amount: 12000,
      date: format(new Date(), "yyyy-MM-dd"),
    };

    const response = await request.post("/revenue").send(revenueData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("amount");
    expect(response.body).toHaveProperty("date");
    expect(response.body.description).toBe(revenueData.description);
    expect(response.body.amount).toBe(
      (revenueData.amount / 100).toFixed(2).toString()
    );
  });

  it("should not be able to create a new revenue with the same description in the same month", async () => {
    const revenueData = {
      description: "Revenue test",
      amount: 12000,
      date: format(new Date(), "yyyy-MM-dd"),
    };

    const response = await request.post("/revenue").send(revenueData);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Revenue already recorded");
  });
});
