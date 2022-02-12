import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListExpensesUseCase } from "./ListExpensesUseCase";

interface IRequest {
  description?: string;
}

class ListExpensesController {
  public async handle(request: Request, response: Response) {
    const { description } = request.query as IRequest;

    const listExpensesUseCase = container.resolve(ListExpensesUseCase);

    const expenses = await listExpensesUseCase.execute({ description });

    return response.json(expenses);
  }
}

export { ListExpensesController };
