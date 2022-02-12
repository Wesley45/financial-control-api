import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateExpenseUseCase } from "./UpdateExpenseUseCase";

class UpdateExpenseController {
  public async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { description, amount, date } = request.body;

    const updateExpenseUseCase = container.resolve(UpdateExpenseUseCase);

    await updateExpenseUseCase.execute({ description, amount, date }, id);

    return response.status(204).send();
  }
}

export { UpdateExpenseController };
