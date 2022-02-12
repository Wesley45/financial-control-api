import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListExpensesByMonthUseCase } from "./ListExpensesByMonthUseCase";

class ListExpensesByMonthController {
  public async handle(request: Request, response: Response) {
    const { year, month } = request.params;

    const listExpensesByMonthUseCase = container.resolve(
      ListExpensesByMonthUseCase
    );

    const expenses = await listExpensesByMonthUseCase.execute({ year, month });

    return response.json(expenses);
  }
}

export { ListExpensesByMonthController };
