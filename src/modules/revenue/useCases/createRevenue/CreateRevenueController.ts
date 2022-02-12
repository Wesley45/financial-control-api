import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRevenueUseCase } from "./CreateRevenueUseCase";

class CreateRevenueController {
  public async handle(request: Request, response: Response) {
    const { description, amount, date } = request.body;

    const createRevenueUseCase = container.resolve(CreateRevenueUseCase);

    const revenue = await createRevenueUseCase.execute({
      description,
      amount,
      date,
    });

    return response.status(201).json(revenue);
  }
}

export { CreateRevenueController };
