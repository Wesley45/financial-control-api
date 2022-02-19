import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post(
  "/sessions",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().lowercase().required(),
      password: Joi.string().required(),
    },
  }),
  authenticateUserController.handle
);

export { authenticateRoutes };
