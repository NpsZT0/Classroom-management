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

    async getUserRawQuery() {
        return await this.usersRepository.query(`
        SELECT 
            u.id,
            u.std_id AS stdId,
            u.prefix,
            u.first_name AS firstName,
            u.last_name AS lastName,
            u.gender,
            DATE_FORMAT(u.birthday, '%Y-%m-%d') AS birthday,
            u.grade_level AS gradeLevel,
            cm.classroom_id AS classroomId
        FROM 
            users AS u
        JOIN 
            classroom_members AS cm
        ON 
            u.id = cm.std_id
        WHERE 
            TIMESTAMPDIFF(YEAR, u.birthday, CURDATE()) >= 7;
        `)
    }
}