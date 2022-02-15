import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { expensesRouter } from "./expenses.routes";
import { revenueRoutes } from "./revenue.routes";
import { summaryRoutes } from "./summary.routes";
import { usersRouter } from "./users.routes";

const router = Router();

router.use(authenticateRoutes);

router.use("/expenses", expensesRouter);
router.use("/revenue", revenueRoutes);
router.use("/summary", summaryRoutes);
router.use("/users", usersRouter);

export { router };
