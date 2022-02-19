import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import { ShowMonthSummaryController } from "@modules/expenses/useCases/showMonthSummary/ShowMonthSummaryController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const summaryRoutes = Router();

const showMonthSummaryController = new ShowMonthSummaryController();

summaryRoutes.get(
  "/:year/:month",
  [
    ensureAuthenticated,
    celebrate({
      [Segments.PARAMS]: {
        year: Joi.number().integer().required(),
        month: Joi.number().integer().required(),
      },
    }),
  ],
  showMonthSummaryController.handle
);

export { summaryRoutes };
