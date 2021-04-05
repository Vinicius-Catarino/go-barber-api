import { getRepository } from "typeorm";
import { hash } from "bcryptjs";

import AppError from "@shared/errors/AppError";

import User from "../infra/typeorm/entities/User";

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExist = await userRepository.findOne({ where: { email } });
    if (checkUserExist) {
      throw new AppError("email addres already used");
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;