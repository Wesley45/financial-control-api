import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { Category } from "./Category";

@Entity("expenses")
class Expense {
  @PrimaryColumn()
  id?: string;

  @Column()
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  amount: number;

  @Column("timestamp")
  date: Date;

  @ManyToOne(() => Category, (category) => category.expenses)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column()
  category_id?: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Expense };
