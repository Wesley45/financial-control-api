import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateExpenseUseCase } from "./CreateExpenseUseCase";

class CreateExpenseController {
  public async handle(request: Request, response: Response) {
    const { description, amount, date, category_id } = request.body;

    const createExpenseUseCase = container.resolve(CreateExpenseUseCase);

    const expense = await createExpenseUseCase.execute({
      description,
      amount,
      date,
      category_id,
    });

    return response.status(201).json(expense);
  }
}

export { CreateExpenseController };
