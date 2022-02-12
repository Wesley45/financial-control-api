export interface ICreateExpenseDTO {
  description: string;
  amount: number;
  date: Date;
  category_id?: string;
}
