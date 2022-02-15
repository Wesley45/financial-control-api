import supertest from "supertest";
import { Connection } from "typeorm";
import { format } from "date-fns";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

const request = supertest(app);

let connection: Connection;

describe("Show Revenue Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to show the details of a revenue", async () => {
    const revenueData = {
      description: "Revenue list test",
      amount: 8990,
      date: format(new Date(), "yyyy-MM-dd"),
    };

    const revenueCreated = await request.post("/revenue").send(revenueData);

    const { id } = revenueCreated.body;

    const response = await request.get(`/revenue/${id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("amount");
    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("id");
    expect(response.body.description).toBe(response.body.description);
    expect(response.body.amount).toBe(response.body.amount);
    expect(response.body.date).toBe(response.body.date);
    expect(response.body.id).toBe(response.body.id);
  });

  it("should not be able to show the details of a revenue that does not exist", async () => {
    const response = await request.get(`/revenue/revenue`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Revenue not found");
  });
});
