import { Router } from "express";

import { ShowMonthSummaryController } from "@modules/expenses/useCases/showMonthSummary/ShowMonthSummaryController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const summaryRoutes = Router();

const showMonthSummaryController = new ShowMonthSummaryController();

summaryRoutes.get(
  "/:year/:month",
  ensureAuthenticated,
  showMonthSummaryController.handle
);

export { summaryRoutes };
