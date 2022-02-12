import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateRevenueUseCase } from "./UpdateRevenueUseCase";

class UpdateRevenueController {
  public async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { description, amount, date } = request.body;

    const updateRevenueUseCase = container.resolve(UpdateRevenueUseCase);

    await updateRevenueUseCase.execute({ description, amount, date }, id);

    return response.status(204).send();
  }
}

export { UpdateRevenueController };
