import AppError from "@shared/errors/AppError";

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakehashProvider";

import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService";

describe("AuthenticateUser", () => {
  it("should be able to autheticate", async () => {
    const fakeUsersrepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersrepository,
      fakeHashProvider
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersrepository,
      fakeHashProvider
    );

    const user = await createUserService.execute({
      name: "John Doe",
      email: "jonhdoe@exemple.com",
      password: "123123",
    });

    const response = await authenticateUser.execute({
      email: "jonhdoe@exemple.com",
      password: "123123",
    });

    expect(response).toHaveProperty("token");
    expect(response.user).toEqual(user);
  });

  it("should not be able to autheticate with non existing user", async () => {
    const fakeUsersrepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersrepository,
      fakeHashProvider
    );

    expect(
      authenticateUser.execute({
        email: "jonhdoe@exemple.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to autheticate with wrong password", async () => {
    const fakeUsersrepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersrepository,
      fakeHashProvider
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersrepository,
      fakeHashProvider
    );

    await createUserService.execute({
      name: "John Doe",
      email: "johndoe@exemple.com",
      password: "123123",
    });

    expect(
      authenticateUser.execute({
        email: "johndoe@exemple.com",
        password: "wrong-password",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
