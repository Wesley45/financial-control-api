import { Router } from "express";

import { ShowMonthSummaryController } from "@modules/expenses/useCases/showMonthSummary/ShowMonthSummaryController";

const summaryRoutes = Router();

const showMonthSummaryController = new ShowMonthSummaryController();

summaryRoutes.get("/:year/:month", showMonthSummaryController.handle);

export { summaryRoutes };
