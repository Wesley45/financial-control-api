import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { UserModel } from "../entities/UserModel";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<UserModel>;
  findById(id: string): Promise<UserModel | undefined>;
  findByEmail(email: string): Promise<UserModel | undefined>;
}

export { IUsersRepository };
