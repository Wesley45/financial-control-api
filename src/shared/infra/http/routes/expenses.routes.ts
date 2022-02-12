import { Router } from "express";

import { CreateExpenseController } from "@modules/expenses/useCases/createExpense/CreateExpenseController";
import { DeleteExpenseController } from "@modules/expenses/useCases/deleteExpense/DeleteExpenseController";
import { ListExpensesController } from "@modules/expenses/useCases/listExpenses/ListExpensesController";
import { ListExpensesByMonthController } from "@modules/expenses/useCases/listExpensesByMonth/ListExpensesByMonthController";
import { ShowExpenseController } from "@modules/expenses/useCases/showExpense/ShowExpenseController";
import { UpdateExpenseController } from "@modules/expenses/useCases/updateExpense/UpdateExpenseController";

const expensesRouter = Router();

const createExpenseController = new CreateExpenseController();
const deleteExpenseController = new DeleteExpenseController();
const listExpensesController = new ListExpensesController();
const listExpensesByMonthController = new ListExpensesByMonthController();
const showExpenseController = new ShowExpenseController();
const updateExpenseController = new UpdateExpenseController();

expensesRouter.get("/", listExpensesController.handle);
expensesRouter.get("/:id", showExpenseController.handle);
expensesRouter.get("/:year/:month", listExpensesByMonthController.handle);
expensesRouter.post("/", createExpenseController.handle);
expensesRouter.put("/:id", updateExpenseController.handle);
expensesRouter.delete("/:id", deleteExpenseController.handle);

export { expensesRouter };
