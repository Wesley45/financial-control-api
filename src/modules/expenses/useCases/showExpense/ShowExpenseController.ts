import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowExpenseUseCase } from "./ShowExpenseUseCase";

class ShowExpenseController {
  public async handle(request: Request, response: Response) {
    const { id } = request.params;

    const showExpenseUseCase = container.resolve(ShowExpenseUseCase);
    const expense = await showExpenseUseCase.execute(id);

    return response.json(expense);
  }
}

export { ShowExpenseController };
