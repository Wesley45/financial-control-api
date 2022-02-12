import { Router } from "express";

import { expensesRouter } from "./expenses.routes";
import { revenueRoutes } from "./revenue.routes";
import { summaryRoutes } from "./summary.routes";

const router = Router();

router.use("/expenses", expensesRouter);
router.use("/revenue", revenueRoutes);
router.use("/summary", summaryRoutes);

export { router };
