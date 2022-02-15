import supertest from "supertest";
import { Connection } from "typeorm";
import { format } from "date-fns";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

const request = supertest(app);

let connection: Connection;

describe("List Revenue Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to list all revenue", async () => {
    const revenueData = {
      description: "Revenue list test",
      amount: 8990,
      date: format(new Date(), "yyyy-MM-dd"),
    };

    await request.post("/revenue").send(revenueData);

    const response = await request.get("/revenue");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("description");
    expect(response.body[0]).toHaveProperty("amount");
    expect(response.body[0]).toHaveProperty("date");
    expect(response.body[0]).toHaveProperty("id");
  });
});
