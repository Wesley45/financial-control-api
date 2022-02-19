import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import joidate from "@joi/date";

const JoiExtended = Joi.extend(joidate) as typeof Joi;

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

expensesRouter.get(
  "/:id",
  [
    ensureAuthenticated,
    celebrate({
      [Segments.PARAMS]: {
        id: JoiExtended.string().uuid().required(),
      },
    }),
  ],
  showExpenseController.handle
);

expensesRouter.get(
  "/:year/:month",
  [
    ensureAuthenticated,
    celebrate({
      [Segments.PARAMS]: {
        year: JoiExtended.number().integer().required(),
        month: JoiExtended.number().integer().required(),
      },
    }),
  ],
  listExpensesByMonthController.handle
);

expensesRouter.post(
  "/",
  [
    ensureAuthenticated,
    celebrate({
      [Segments.BODY]: {
        description: JoiExtended.string().required(),
        amount: JoiExtended.number().integer().required(),
        date: JoiExtended.date().format("YYYY-MM-DD").utc().required(),
        category_id: JoiExtended.string().uuid(),
      },
    }),
  ],
  createExpenseController.handle
);

expensesRouter.put(
  "/:id",
  [
    ensureAuthenticated,
    celebrate({
      [Segments.BODY]: {
        description: JoiExtended.string().required(),
        amount: JoiExtended.number().integer().required(),
        date: JoiExtended.date().format("YYYY-MM-DD").utc().required(),
      },
    }),
  ],
  updateExpenseController.handle
);

expensesRouter.delete(
  "/:id",
  [
    ensureAuthenticated,
    celebrate({
      [Segments.PARAMS]: {
        id: JoiExtended.string().uuid().required(),
      },
    }),
  ],
  deleteExpenseController.handle
);

export { expensesRouter };
