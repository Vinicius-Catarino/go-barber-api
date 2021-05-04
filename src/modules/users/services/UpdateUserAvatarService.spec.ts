import AppError from "@shared/errors/AppError";

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakehashProvider";

import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";
import UpdateUserAvatarService from "./UpdateUserAvatarService";

describe("UpdateUSerAvatar", () => {
  it("should be able to create a new user", async () => {
    const fakeUsersrepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUSerAvatar = new UpdateUserAvatarService(
      fakeUsersrepository,
      fakeStorageProvider
    );

    const user = await fakeUsersrepository.create({
      name: "Jonh Doe",
      email: "jonhdoe@exemple.com",
      password: "123123",
    });

    await updateUSerAvatar.execute({
      user_id: user.id,
      avatarFileName: "avatar.jpg",
    });

    expect(user.avatar).toBe("avatar.jpg");
  });

  it("should not be able to update avatar from non existing user", async () => {
    const fakeUsersrepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUSerAvatar = new UpdateUserAvatarService(
      fakeUsersrepository,
      fakeStorageProvider
    );

    expect(
      updateUSerAvatar.execute({
        user_id: "non-existing-user",
        avatarFileName: "avatar.jpg",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should delete old avatar when updating new one", async () => {
    const fakeUsersrepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, "deleteFile");

    const updateUSerAvatar = new UpdateUserAvatarService(
      fakeUsersrepository,
      fakeStorageProvider
    );

    const user = await fakeUsersrepository.create({
      name: "Jonh Doe",
      email: "jonhdoe@exemple.com",
      password: "123123",
    });

    await updateUSerAvatar.execute({
      user_id: user.id,
      avatarFileName: "avatar.jpg",
    });

    await updateUSerAvatar.execute({
      user_id: user.id,
      avatarFileName: "avatar2.jpg",
    });

    expect(deleteFile).toHaveBeenCalledWith("avatar.jpg");
    expect(user.avatar).toBe("avatar2.jpg");
  });
});
