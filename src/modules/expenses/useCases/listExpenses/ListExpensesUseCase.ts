import { inject, injectable } from "tsyringe";

import { IExpensesRepository } from "@modules/expenses/repositories/IExpensesRepository";

interface IRequest {
  description?: string;
}

@injectable()
class ListExpensesUseCase {
  constructor(
    @inject("ExpensesRepository")
    private expensesRepository: IExpensesRepository
  ) {}

  public async execute({ description }: IRequest) {
    return this.expensesRepository.list({ description });
  }
}

export { ListExpensesUseCase };
