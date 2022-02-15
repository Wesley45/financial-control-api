import supertest from "supertest";
import { Connection } from "typeorm";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

const request = supertest(app);

let connection: Connection;

describe("Create Expense Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    await connection.query(
      `INSERT INTO categories (id, name, active) VALUES ('${uuid()}', 'Alimentação', 'A');`
    );

    await connection.query(
      `INSERT INTO categories (id, name, active) VALUES ('${uuid()}', 'Outras', 'A');`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new expense", async () => {
    const [{ id }] = await connection.query(
      `SELECT id FROM categories WHERE name = 'Alimentação'`
    );

    const expenseData = {
      description: "Expense test",
      amount: 6000,
      date: format(new Date(), "yyyy-MM-dd"),
      category_id: id,
    };

    const expense = await request.post("/expenses").send(expenseData);

    expect(expense.status).toBe(201);
    expect(expense.body).toHaveProperty("description");
    expect(expense.body).toHaveProperty("amount");
    expect(expense.body).toHaveProperty("date");
    expect(expense.body).toHaveProperty("category_id");
    expect(expense.body).toHaveProperty("id");
    expect(expense.body.category_id).toBe(id);
    expect(expense.body.description).toBe(expenseData.description);
    expect(expense.body.amount).toBe(
      (expenseData.amount / 100).toFixed(2).toString()
    );
  });
});
