import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowMonthSummaryUseCase } from "./ShowMonthSummaryUseCase";

class ShowMonthSummaryController {
  public async handle(request: Request, response: Response) {
    const { year, month } = request.params;

    const showMonthSummaryUseCase = container.resolve(ShowMonthSummaryUseCase);

    const summary = await showMonthSummaryUseCase.execute({ year, month });

    return response.json(summary);
  }
}

export { ShowMonthSummaryController };
