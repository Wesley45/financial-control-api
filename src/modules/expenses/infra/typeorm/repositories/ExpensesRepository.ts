import { getRepository, Repository } from "typeorm";

import { ICreateExpenseDTO } from "@modules/expenses/dtos/ICreateExpenseDTO";
import { ExpenseModel } from "@modules/expenses/entities/ExpenseModel";
import { IExpensesRepository } from "@modules/expenses/repositories/IExpensesRepository";

import { Expense } from "../entities/Expense";
import { IRequestExpenseDTO } from "@modules/expenses/dtos/IRequestExpenseDTO";
import { Category } from "../entities/Category";

class ExpensesRepository implements IExpensesRepository {
  private repository: Repository<Expense>;
  constructor() {
    this.repository = getRepository(Expense);
  }

  async create({
    description,
    amount,
    date,
    category_id,
  }: ICreateExpenseDTO): Promise<ExpenseModel> {
    const expense = this.repository.create({
      description,
      amount,
      date,
      category_id,
    });

    await this.repository.save(expense);

    return expense;
  }

  async findById(id: string): Promise<ExpenseModel | undefined> {
    const expense = await this.repository.findOne({ id });
    return expense;
  }

  async findByDescriptionAndDate(
    description: string,
    date: string
  ): Promise<ExpenseModel | undefined> {
    const expense = await this.repository
      .createQueryBuilder()
      .where(`description = :description`, { description: description })
      .andWhere(`DATE_FORMAT(date, '%Y-%m') = :date`, {
        date: date,
      })
      .getOne();

    return expense;
  }

  async list({ description }: IRequestExpenseDTO): Promise<ExpenseModel[]> {
    const whereConditional: IRequestExpenseDTO = {};
    if (description) {
      whereConditional.description = description;
    }

    return this.repository.find({ where: whereConditional });
  }

  async listByYearAndMonth(
    year: string,
    month: string
  ): Promise<ExpenseModel[]> {
    const expenses = await this.repository
      .createQueryBuilder()
      .where(`YEAR(date) = :year`, { year: year })
      .andWhere(`MONTH(date) = :month`, { month: month })
      .getMany();

    return expenses;
  }

  async findByIdAndDescriptionAndDate(
    id: string,
    description: string,
    date: string
  ): Promise<ExpenseModel | undefined> {
    const expense = await this.repository
      .createQueryBuilder()
      .where(`description = :description`, { description: description })
      .andWhere(`DATE_FORMAT(date, '%Y-%m') = :date`, {
        date: date,
      })
      .andWhere(`id <> :id`, { id: id })
      .getOne();

    return expense;
  }

  async update(
    { description, amount, date }: ICreateExpenseDTO,
    id: string
  ): Promise<void> {
    await this.repository.update(
      { id },
      {
        description,
        amount,
        date,
      }
    );
  }

  async totalAmountExpensesByMonth(
    year: string,
    month: string
  ): Promise<number> {
    const expense = await this.repository
      .createQueryBuilder()
      .select("SUM(amount)", "total")
      .where(`YEAR(date) = :year`, { year: year })
      .andWhere(`MONTH(date) = :month`, { month: month })
      .getRawOne<{ total: number }>();

    let total = 0;
    if (expense?.total) {
      total = expense.total * 100;
    }

    return total;
  }

  async totalAmountSpentInCategoriesByMonth(
    year: string,
    month: string
  ): Promise<
    {
      name: string;
      total: string;
    }[]
  > {
    const expenses = await this.repository
      .createQueryBuilder("e")
      .select(["c.name as name", "SUM(e.amount) as total"])
      .where(`YEAR(e.date) = :year`, { year: year })
      .andWhere(`MONTH(e.date) = :month`, { month: month })
      .innerJoin(Category, "c", "c.id = e.category_id")
      .groupBy("e.category_id")
      .getRawMany<{ name: string; total: string }>();

    return expenses;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ id });
  }
}

export { ExpensesRepository };
