import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Classrooms } from "src/graphql/models/Classrooms";
import { CreateClassroomInput } from "src/graphql/utils/classrooms/CreateClassroomInput";
import { UpdateClassroomInput } from "src/graphql/utils/classrooms/UpdateClassroomInput";
import { Repository } from "typeorm";

@Injectable()
export class ClassroomsService {
    constructor(@InjectRepository(Classrooms) private classroomsRepository: Repository<Classrooms>) { }

    createClassroom(createClassroomInput: CreateClassroomInput) {
        const newClassroom = this.classroomsRepository.create(createClassroomInput);
        return this.classroomsRepository.save(newClassroom);
    }

    getClassrooms() {
        return this.classroomsRepository.find();
    }
    
    getClassroomById(id: number) {
        return this.classroomsRepository.createQueryBuilder("users")
            .where("users.id = :id", { id: id })
            .getOne()
    }

    async updateClassroom(id: number, updateClassroomInput: UpdateClassroomInput) {
        await this.classroomsRepository.createQueryBuilder().update(Classrooms)
            .set(updateClassroomInput)
            .where("id = :id", { id: id })
            .execute()
        return this.getClassroomById(id)
    }

    async deleteClassroom(id: number) {
        const toDelete = await this.getClassroomById(id)
        this.classroomsRepository.createQueryBuilder().delete()
            .from(Classrooms)
            .where("id = :id", { id: id })
            .execute()
        return toDelete
    }

    // getClassroomMembersForSTD7Years(userId:number, classroomId: number): Promise<Classrooms[]> {
    //     return this.classroomsRepository.find({
    //         where: {
    //             id: classroomId
    //         },
    //         relations: ['classroom', 'std'],
    //     });
    // }
}