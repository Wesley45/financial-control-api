import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserModel } from "@modules/accounts/entities/UserModel";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<UserModel> {
    const user = this.repository.create({
      name,
      email,
      password,
    });

    await this.repository.save(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  async findById(id: string): Promise<UserModel | undefined> {
    return this.repository.findOne(id);
  }

  async findByEmail(email: string): Promise<UserModel | undefined> {
    return this.repository.findOne({ email });
  }
}

export { UsersRepository };
