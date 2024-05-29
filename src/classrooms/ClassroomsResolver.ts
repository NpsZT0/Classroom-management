import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Classrooms } from 'src/graphql/models/Classrooms'
import { ClassroomsService } from './ClassroomsService'
import { GraphQLError } from 'graphql'
import { CreateClassroomInput } from 'src/graphql/utils/classrooms/CreateClassroomInput'
import { UpdateClassroomInput } from 'src/graphql/utils/classrooms/UpdateClassroomInput'
import { ClassroomDto } from './classrooms.dto'
import { ClassroomMembers } from 'src/graphql/models/ClassroomMembers'
import { ClassroomMembersService } from 'src/classroom_members/ClassroomMembersService'

@Resolver((of) => Classrooms)
export class ClassroomsResolver {
    constructor(private classroomsService: ClassroomsService, private classroomMembersService: ClassroomMembersService) { }

    @Mutation((returns) => ClassroomDto)
    async createClassroom(@Args('createClassroomInput') createClassroomInput: CreateClassroomInput): Promise<ClassroomDto> {
        const classrooms = [await this.classroomsService.createClassroom(createClassroomInput)]
        return { message: 'Classroom created', classrooms };
    }

    @Query((returns) => ClassroomDto, { nullable: true })
    async getClassrooms(): Promise<ClassroomDto> {
        const classrooms = await this.classroomsService.getClassrooms()
        if (!classrooms) {
            return { message: 'Not found any classrooms', classrooms };
        }
        return { message: 'Find all classrooms', classrooms };
    }

    @ResolveField((returns) => [ClassroomMembers], { name: 'classroomMembers', nullable: true })
    getClassroomMembers(@Parent() classroom: Classrooms): Promise<ClassroomMembers[]> {
        const classroomMembers = this.classroomMembersService.getClassroomMembersForSTD(classroom.id)
        return classroomMembers
    }

    @Query((returns) => ClassroomDto, { nullable: true })
    async getClassroomById(@Args('id', { type: () => Int }) id: number): Promise<ClassroomDto> {
        const classrooms = [await this.classroomsService.getClassroomById(id)]
        return { message: 'Find classroom by id', classrooms };
    }

    @Mutation((returns) => ClassroomDto, { nullable: true })
    async updateClassroom(
        @Args('id', { type: () => Int }) id: number,
        @Args('updateClassroomInput') updateClassroomInput: UpdateClassroomInput
    ): Promise<ClassroomDto> {
        try {
            const classrooms = [await this.classroomsService.updateClassroom(id, updateClassroomInput)]
            if (!classrooms[0]) {
                throw new GraphQLError('Classroom not found.', {
                    extensions: {
                        code: 'NOT-FOUND',
                    }
                });
            }
            return ({ classrooms, message: 'Classroom updated successfully.' });
        } catch (error) {
            throw new GraphQLError(error, {
                extensions: {
                    code: 'NOT-FOUND',
                },
            });
        }
    }

    @Mutation((returns) => ClassroomDto)
    async deleteClassroom(@Args('id', { type: () => Int }) id: number) {
        try {
            const classrooms = [await this.classroomsService.deleteClassroom(id)]
            if (!classrooms[0]) {
                throw new GraphQLError('Classroom not found.', {
                    extensions: {
                        code: 'NOT-FOUND',
                    }
                });
            }
            return ({ classrooms, message: 'Classroom deleted successfully.' });
        } catch (error) {
            throw new GraphQLError(error, {
                extensions: {
                    code: 'NOT-FOUND',
                },
            });
        }
    }
}