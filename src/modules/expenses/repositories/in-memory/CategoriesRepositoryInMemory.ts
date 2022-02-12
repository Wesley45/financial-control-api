import { v4 as uuid } from "uuid";

import { CategoryModel } from "@modules/expenses/entities/CategoryModel";
import { Category } from "@modules/expenses/infra/typeorm/entities/Category";
import { ICategoriesRepository } from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [
    {
      id: uuid(),
      name: "Alimentação",
      active: "A",
    },
    {
      id: uuid(),
      name: "Saúde",
      active: "A",
    },
    {
      id: uuid(),
      name: "Moradia",
      active: "A",
    },
    {
      id: uuid(),
      name: "Transporte",
      active: "A",
    },
    {
      id: uuid(),
      name: "Educação",
      active: "A",
    },
    {
      id: uuid(),
      name: "Lazer",
      active: "A",
    },
    {
      id: uuid(),
      name: "Imprevistos",
      active: "A",
    },
    {
      id: uuid(),
      name: "Outras",
      active: "A",
    },
  ];

  async findById(id: string): Promise<CategoryModel | undefined> {
    const category = this.categories.find((category) => category.id === id);
    return category;
  }

  async findByName(name: string): Promise<CategoryModel | undefined> {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
}

export { CategoriesRepositoryInMemory };
