export interface ExpenseModel {
  id?: string;
  description: string;
  amount: number;
  date: Date;
  category_id?: string;
  created_at: Date;
  updated_at: Date;
}
