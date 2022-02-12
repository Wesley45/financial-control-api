import { CategoryModel } from "../entities/CategoryModel";

export interface ICategoriesRepository {
  findById(id: string): Promise<CategoryModel | undefined>;
  findByName(name: string): Promise<CategoryModel | undefined>;
}
