import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowRevenueUseCase } from "./ShowRevenueUseCase";

class ShowRevenueController {
  public async handle(request: Request, response: Response) {
    const { id } = request.params;

    const showRevenueUseCase = container.resolve(ShowRevenueUseCase);
    const revenue = await showRevenueUseCase.execute(id);

    return response.json(revenue);
  }
}

export { ShowRevenueController };
