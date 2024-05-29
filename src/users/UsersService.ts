import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/graphql/models/Users";
import { CreateUserInput } from "src/graphql/utils/users/CreateUserInput";
import { UpdateUserInput } from "src/graphql/utils/users/UpdateUserInput";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) { }

    createUser(createUserInput: CreateUserInput) {
        const newUser = this.usersRepository.create(createUserInput);
        return this.usersRepository.save(newUser);
    }

    getUsers() {
        return this.usersRepository.find();
    }

    getUserById(id: number) {
        return this.usersRepository.createQueryBuilder("users")
            .where("users.id = :id", { id: id })
            .getOne()
    }

    async updateUser(id: number, updateUserInput: UpdateUserInput) {
        await this.usersRepository.createQueryBuilder().update(Users)
            .set(updateUserInput)
            .where("id = :id", { id: id })
            .execute()
        return this.getUserById(id)
    }

    async deleteUser(id: number) {
        const toDelete = await this.getUserById(id)
        this.usersRepository.createQueryBuilder().delete()
            .from(Users)
            .where("id = :id", { id: id })
            .execute()
        return toDelete
    }
}