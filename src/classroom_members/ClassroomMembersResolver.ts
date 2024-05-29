import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ClassroomMembers } from 'src/graphql/models/ClassroomMembers'
import { ClassroomMembersService } from './ClassroomMembersService'
import { CreateClassroomMemberInput } from 'src/graphql/utils/classroom_members/CreateClassroomMemberInput'
import { ClassroomMemberDto } from './classroomMembers.dto'
import { GraphQLError } from 'graphql'

@Resolver()
export class ClassroomMembersResolver {
    constructor(private classroomMembersService: ClassroomMembersService) { }

    @Mutation((returns) => ClassroomMemberDto, { nullable: true })
    async createClassroomMember(
        @Args('createClassroomMemberInput') createClassroomMemberInput: CreateClassroomMemberInput
    ): Promise<ClassroomMemberDto> {
        const classroomMembers = [await this.classroomMembersService.createClassroomMember(createClassroomMemberInput)]
        return { message: 'Classroom created', classroomMembers };
    }

    @Query((returns) => ClassroomMemberDto, { nullable: true })
    async getClassroomMembers(): Promise<ClassroomMemberDto> {
        const classroomMembers = await this.classroomMembersService.getClassroomMembers()
        if (!classroomMembers) {
            return { message: 'Not found any classroom members', classroomMembers };
        }
        return { message: 'Find all classroom members', classroomMembers };
    }

    @Mutation((returns) => ClassroomMemberDto)
    async deleteClassroomMember(@Args('id', { type: () => Int }) id: number): Promise<ClassroomMemberDto> {
        try {
            const classroomMembers = [await this.classroomMembersService.deleteClassroomMember(id)]
            if (!classroomMembers[0]) {
                throw new GraphQLError('Classroom Member not found.', {
                    extensions: {
                        code: 'NOT-FOUND',
                    }
                });
            }
            return ({ classroomMembers, message: 'Classroom Member deleted successfully.' });
        } catch (error) {
            throw new GraphQLError(error, {
                extensions: {
                    code: 'NOT-FOUND',
                },
            });
        }
    }
}