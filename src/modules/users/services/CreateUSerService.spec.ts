import AppError from "@shared/errors/AppError";

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakehashProvider";

import CreateUserService from "./CreateUserService";

describe("CreateUser", () => {
  it("should be able to create a new user", async () => {
    const fakeUsersrepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersrepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: "Jonh Doe",
      email: "jonhdoe@exemple.com",
      password: "123123",
    });

    expect(user).toHaveProperty("id");
  });

  it("should be not able to create a new user with same email from another", async () => {
    const fakeUsersrepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersrepository,
      fakeHashProvider
    );

    const appointment = await createUser.execute({
      name: "Jonh Doe",
      email: "jonhdoe@exemple.com",
      password: "123123",
    });

    expect(appointment).toHaveProperty("id");
    expect(
      createUser.execute({
        name: "Jonh Doe",
        email: "jonhdoe@exemple.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
