import { container } from "tsyringe";

import { ICategoriesRepository } from "@modules/expenses/repositories/ICategoriesRepository";
import { CategoriesRepository } from "@modules/expenses/infra/typeorm/repositories/CategoriesRepository";
import { IExpensesRepository } from "@modules/expenses/repositories/IExpensesRepository";
import { ExpensesRepository } from "@modules/expenses/infra/typeorm/repositories/ExpensesRepository";
import { RevenueRepository } from "@modules/revenue/infra/typeorm/repositories/RevenueRepository";
import { IRevenueRepository } from "@modules/revenue/repositories/IRevenueRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<IExpensesRepository>(
  "ExpensesRepository",
  ExpensesRepository
);

container.registerSingleton<IRevenueRepository>(
  "RevenueRepository",
  RevenueRepository
);
