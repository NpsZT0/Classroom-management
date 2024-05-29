import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClassroomMembers } from "src/graphql/models/ClassroomMembers";
import { CreateClassroomMemberInput } from "src/graphql/utils/classroom_members/CreateClassroomMemberInput";
import { Repository } from "typeorm";

@Injectable()
export class ClassroomMembersService {
    constructor(@InjectRepository(ClassroomMembers) private classroomMembersRepository: Repository<ClassroomMembers>) { }

    async createClassroomMember(createClassroomMemberInput: CreateClassroomMemberInput) {
        const classroomMember = await this.classroomMembersRepository.find({
            relations: ['classroom', 'std'],
        });
        classroomMember.some((cm) => {
            if (Number(cm.classroom.id) == Number(createClassroomMemberInput.classroom) &&
                (Number(cm.std.id) == Number(createClassroomMemberInput.std))
            ) {
                throw new Error('Classroom Member already exists');
            }
        })
        const newClassroomMember = await this.classroomMembersRepository.create(createClassroomMemberInput);
        const saveClass = await this.classroomMembersRepository.save(newClassroomMember);
        return this.getClassroomMemberById(saveClass.id)
    }

    getClassroomMembers() {
        return this.classroomMembersRepository.find({
            relations: ['classroom', 'std'],
        });
    }

    getClassroomMemberById(id: number) {
        return this.classroomMembersRepository.findOne({
            where: { id },
            relations: ['classroom', 'std'],
        });
    }

    getClassroomMembersForSTD(classroomId: number): Promise<ClassroomMembers[]> {
        return this.classroomMembersRepository.find({
            where: {
                classroom: { id: classroomId },
            },
            relations: ['classroom', 'std'],
        });
    }

    async deleteClassroomMember(id: number) {
        const toDelete = await this.getClassroomMemberById(id)
        this.classroomMembersRepository.createQueryBuilder().delete()
            .from(ClassroomMembers)
            .where("id = :id", { id: id })
            .execute()
        return toDelete
    }
}