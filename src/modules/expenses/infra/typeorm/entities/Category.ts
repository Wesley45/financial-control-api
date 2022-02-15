import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import { Expense } from "./Expense";

@Entity("categories")
class Category {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @OneToMany(() => Expense, (expense) => expense.category)
  expenses?: Expense[];

  @Column()
  active: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Category };
