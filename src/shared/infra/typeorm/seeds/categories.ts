import { v4 as uuid } from "uuid";

import createConnection from "../index";

export async function createcategories(): Promise<void> {
  const connection = await createConnection("localhost");

  await connection.query(
    `INSERT INTO categories (id, name, active) VALUES ('${uuid()}', 'Alimentação', 'A');
     INSERT INTO categories (id, name, active) VALUES ('${uuid()}', 'Saúde', 'A');
     INSERT INTO categories (id, name, active) VALUES ('${uuid()}', 'Moradia', 'A');
     INSERT INTO categories (id, name, active) VALUES ('${uuid()}', 'Transporte', 'A');
     INSERT INTO categories (id, name, active) VALUES ('${uuid()}', 'Educação', 'A');
     INSERT INTO categories (id, name, active) VALUES ('${uuid()}', 'Lazer', 'A');
     INSERT INTO categories (id, name, active) VALUES ('${uuid()}', 'Imprevistos', 'A');
     INSERT INTO categories (id, name, active) VALUES ('${uuid()}', 'Outras', 'A');
    `
  );

  await connection.close();
}
