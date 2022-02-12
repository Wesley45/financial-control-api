import { ICreateExpenseDTO } from "../dtos/ICreateExpenseDTO";
import { IRequestExpenseDTO } from "../dtos/IRequestExpenseDTO";
import { ExpenseModel } from "../entities/ExpenseModel";

export interface IExpensesRepository {
  create(data: ICreateExpenseDTO): Promise<ExpenseModel>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<ExpenseModel | undefined>;
  findByDescriptionAndDate(
    description: string,
    date: string
  ): Promise<ExpenseModel | undefined>;
  findByIdAndDescriptionAndDate(
    id: string,
    description: string,
    date: string
  ): Promise<ExpenseModel | undefined>;
  list(data: IRequestExpenseDTO): Promise<ExpenseModel[]>;
  listByYearAndMonth(year: string, month: string): Promise<ExpenseModel[]>;
  totalAmountExpensesByMonth(year: string, month: string): Promise<number>;
  totalAmountSpentInCategoriesByMonth(
    year: string,
    month: string
  ): Promise<
    {
      name: string;
      total: string;
    }[]
  >;
  update(data: ICreateExpenseDTO, id: string): Promise<void>;
}
