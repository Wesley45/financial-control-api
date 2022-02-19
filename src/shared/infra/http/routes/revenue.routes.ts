import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import joidate from "@joi/date";

const JoiExtended = Joi.extend(joidate) as typeof Joi;

import { CreateRevenueController } from "@modules/revenue/useCases/createRevenue/CreateRevenueController";
import { DeleteRevenueController } from "@modules/revenue/useCases/deleteRevenue/DeleteRevenueController";
import { ListRevenueController } from "@modules/revenue/useCases/listRevenue/ListRevenueController";
import { ListRevenueByMonthController } from "@modules/revenue/useCases/listRevenueByMonth/ListRevenueByMonthController";
import { ShowRevenueController } from "@modules/revenue/useCases/showRevenue/ShowRevenueController";
import { UpdateRevenueController } from "@modules/revenue/useCases/updateRevenue/UpdateRevenueController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const revenueRoutes = Router();

const createRevenueController = new CreateRevenueController();
const deleteRevenueController = new DeleteRevenueController();
const listRevenueController = new ListRevenueController();
const listRevenueByMonthController = new ListRevenueByMonthController();
const showRevenueUseCase = new ShowRevenueController();
const updateRevenueController = new UpdateRevenueController();

revenueRoutes.get("/", ensureAuthenticated, listRevenueController.handle);

revenueRoutes.get(
  "/:id",
  [
    ensureAuthenticated,
    celebrate({
      [Segments.PARAMS]: {
        id: JoiExtended.string().uuid().required(),
      },
    }),
  ],
  showRevenueUseCase.handle
);

revenueRoutes.get(
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
  listRevenueByMonthController.handle
);

revenueRoutes.post(
  "/",
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
  createRevenueController.handle
);

revenueRoutes.put(
  "/:id",
  [
    ensureAuthenticated,
    celebrate({
      [Segments.BODY]: {
        description: JoiExtended.string().required(),
        amount: JoiExtended.number().integer().required(),
        date: JoiExtended.date().format("YYYY-MM-DD").utc().required(),
      },
      [Segments.PARAMS]: {
        id: JoiExtended.string().uuid().required(),
      },
    }),
  ],
  updateRevenueController.handle
);

revenueRoutes.delete(
  "/:id",
  [
    ensureAuthenticated,
    celebrate({
      [Segments.PARAMS]: {
        id: JoiExtended.string().uuid().required(),
      },
    }),
  ],
  deleteRevenueController.handle
);

export { revenueRoutes };
