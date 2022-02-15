import { Router } from "express";

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
revenueRoutes.get("/:id", ensureAuthenticated, showRevenueUseCase.handle);
revenueRoutes.get(
  "/:year/:month",
  ensureAuthenticated,
  listRevenueByMonthController.handle
);
revenueRoutes.post("/", ensureAuthenticated, createRevenueController.handle);
revenueRoutes.put("/:id", ensureAuthenticated, updateRevenueController.handle);
revenueRoutes.delete(
  "/:id",
  ensureAuthenticated,
  deleteRevenueController.handle
);

export { revenueRoutes };
