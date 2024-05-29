import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Users } from '../graphql/models/Users'
import { CreateUserInput } from '../graphql/utils/users/CreateUserInput'
import { UsersService } from './UsersService'
import { UpdateUserInput } from 'src/graphql/utils/users/UpdateUserInput'
import { GraphQLError } from 'graphql'
import { UsersDto } from './users.dto'
import { ClassroomMembers } from 'src/graphql/models/ClassroomMembers'
import { ClassroomMembersService } from 'src/classroom_members/ClassroomMembersService'
import { Classrooms } from 'src/graphql/models/Classrooms'
import { ClassroomsService } from 'src/classrooms/ClassroomsService'

@Resolver((of) => Users)
export class UsersResolver {
    constructor(
        private usersService: UsersService, 
        private classroomMembersService: ClassroomMembersService,
        private classroomsService: ClassroomsService
    ) { }

    @Mutation((returns) => UsersDto)
    async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<UsersDto> {
        const users = [await this.usersService.createUser(createUserInput)]
        return { message: 'User created', users };
    }

    @Query((returns) => UsersDto, { nullable: true })
    async getUsers(): Promise<UsersDto> {
        const users = await this.usersService.getUsers()
        if (!users) {
            return { message: 'Not found any users', users };
        }
        return { message: 'Find all users', users };
    }

    @ResolveField((returns) => [ClassroomMembers], { name: 'classroomMembers', nullable: true })
    getClassroomMembers(@Parent() users: Users): Promise<ClassroomMembers[]> {
        console.log("37:",users.stdId,users.id)
        const classroomMembers = this.classroomMembersService.getClassroomMembersForSTD(users.id)
        return classroomMembers
    }

    @Query((returns) => UsersDto, { nullable: true })
    async getUserById(@Args('id', { type: () => Int }) id: number): Promise<UsersDto> {
        const users = [await this.usersService.getUserById(id)]
        return { message: 'Find user by id', users };
    }

    @Mutation((returns) => UsersDto)
    async updateUser(
        @Args('id', { type: () => Int }) id: number,
        @Args('updateUserInput') updateUserInput: UpdateUserInput
    ): Promise<UsersDto> {
        try {
            const users = [await this.usersService.updateUser(id, updateUserInput)]
            if (!users[0]) {
                throw new GraphQLError('User not found.', {
                    extensions: {
                        code: 'NOT-FOUND',
                    }
                });
            }
            return ({ users, message: 'User updated successfully.' });
        } catch (error) {
            throw new GraphQLError(error, {
                extensions: {
                    code: 'NOT-FOUND',
                },
            });
        }
    }

    @Mutation((returns) => UsersDto)
    async deleteUser(@Args('id', { type: () => Int }) id: number): Promise<UsersDto> {
        try {
            const users = [await this.usersService.deleteUser(id)]
            if (!users[0]) {
                throw new GraphQLError('User not found.', {
                    extensions: {
                        code: 'NOT-FOUND',
                    }
                });
            }
            return ({ users, message: 'User deleted successfully.' });
        } catch (error) {
            throw new GraphQLError(error, {
                extensions: {
                    code: 'NOT-FOUND',
                },
            });
        }
    }

    @Query((returns) => UsersDto, { nullable: true })
    async getUserRawQuery(): Promise<any> {
        const users = await this.usersService.getUserRawQuery()
        if (!users) {
            return { message: 'Not found any users', users };
        }
        return { message: 'Find all users', users };
    }

    @ResolveField((returns) => Classrooms, { name: 'classroom_seven_years', nullable: true })
    getClassroomMembers7Years(@Parent() users: any, classrooms: Classrooms): Promise<Classrooms> {
        const classroomMembers = this.classroomsService.getClassroomById(users.classroomId)
        return classroomMembers
    }
}