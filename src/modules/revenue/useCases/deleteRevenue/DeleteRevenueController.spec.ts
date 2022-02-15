import supertest from "supertest";
import { Connection } from "typeorm";
import { format } from "date-fns";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

const request = supertest(app);

let connection: Connection;

describe("Delete Revenue Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to delete a revenue", async () => {
    const revenueData = {
      description: "Revenue list test",
      amount: 8990,
      date: format(new Date(), "yyyy-MM-dd"),
    };

    const revenueCreated = await request.post("/revenue").send(revenueData);

    const { id } = revenueCreated.body;

    const response = await request.delete(`/revenue/${id}`);

    expect(response.status).toBe(204);
    expect(response.body).toMatchObject({});
  });

  it("should not be able to delete a revenue when it does not exists", async () => {
    const response = await request.delete(`/revenue/revenue`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Revenue not found");
  });
});
