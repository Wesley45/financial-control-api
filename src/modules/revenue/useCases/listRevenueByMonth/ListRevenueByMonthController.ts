import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRevenueByMonthUseCase } from "./ListRevenueByMonthUseCase";

class ListRevenueByMonthController {
  public async handle(request: Request, response: Response) {
    const { year, month } = request.params;

    console.log(year);
    console.log(month);

    const listRevenueByMonthUseCase = container.resolve(
      ListRevenueByMonthUseCase
    );

    const revenue = await listRevenueByMonthUseCase.execute({ year, month });

    return response.json(revenue);
  }
}

export { ListRevenueByMonthController };
