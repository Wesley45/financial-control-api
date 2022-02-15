import { Router } from "express";

import { CreateExpenseController } from "@modules/expenses/useCases/createExpense/CreateExpenseController";
import { DeleteExpenseController } from "@modules/expenses/useCases/deleteExpense/DeleteExpenseController";
import { ListExpensesController } from "@modules/expenses/useCases/listExpenses/ListExpensesController";
import { ListExpensesByMonthController } from "@modules/expenses/useCases/listExpensesByMonth/ListExpensesByMonthController";
import { ShowExpenseController } from "@modules/expenses/useCases/showExpense/ShowExpenseController";
import { UpdateExpenseController } from "@modules/expenses/useCases/updateExpense/UpdateExpenseController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const expensesRouter = Router();

const createExpenseController = new CreateExpenseController();
const deleteExpenseController = new DeleteExpenseController();
const listExpensesController = new ListExpensesController();
const listExpensesByMonthController = new ListExpensesByMonthController();
const showExpenseController = new ShowExpenseController();
const updateExpenseController = new UpdateExpenseController();

expensesRouter.get("/", ensureAuthenticated, listExpensesController.handle);
expensesRouter.get("/:id", ensureAuthenticated, showExpenseController.handle);
expensesRouter.get(
  "/:year/:month",
  ensureAuthenticated,
  listExpensesByMonthController.handle
);
expensesRouter.post("/", ensureAuthenticated, createExpenseController.handle);
expensesRouter.put("/:id", ensureAuthenticated, updateExpenseController.handle);
expensesRouter.delete(
  "/:id",
  ensureAuthenticated,
  deleteExpenseController.handle
);

export { expensesRouter };
