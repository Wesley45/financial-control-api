import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";

const usersRouter = Router();

const createUserController = new CreateUserController();

usersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().lowercase().required(),
      password: Joi.string().required(),
    },
  }),
  createUserController.handle
);

export { usersRouter };
