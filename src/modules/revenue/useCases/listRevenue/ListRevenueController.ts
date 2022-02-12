import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRevenueUseCase } from "./ListRevenueUseCase";

interface IRequest {
  description?: string;
}

class ListRevenueController {
  public async handle(request: Request, response: Response) {
    const { description } = request.query as IRequest;

    const listRevenueUseCase = container.resolve(ListRevenueUseCase);
    const revenue = await listRevenueUseCase.execute({ description });
    return response.json(revenue);
  }
}

export { ListRevenueController };
