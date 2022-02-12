import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteRevenueUseCase } from "./DeleteRevenueUseCase";

class DeleteRevenueController {
  public async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteRevenueUseCase = container.resolve(DeleteRevenueUseCase);

    await deleteRevenueUseCase.execute(id);

    return response.status(204).send();
  }
}

export { DeleteRevenueController };
