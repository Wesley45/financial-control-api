import { CategoryModel } from "@modules/expenses/entities/CategoryModel";
import { ICategoriesRepository } from "@modules/expenses/repositories/ICategoriesRepository";
import { getRepository, Repository } from "typeorm";
import { Category } from "../entities/Category";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async findById(id: string): Promise<CategoryModel | undefined> {
    return this.repository.findOne(id);
  }

  async findByName(name: string): Promise<CategoryModel | undefined> {
    return this.repository.findOne({ where: { name } });
  }
}

export { CategoriesRepository };
