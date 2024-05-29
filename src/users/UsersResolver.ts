import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Users } from '../graphql/models/Users'
import { mockUsers } from 'src/__mocks__/mockUsers'
import { CreateUserInput } from '../graphql/utils/users/CreateUserInput'
import { UsersService } from './UsersService'
import { UpdateUserInput } from 'src/graphql/utils/users/UpdateUserInput'
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common'
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError } from 'graphql'
import { UsersDto } from './users.dto'
import { ClassroomMembers } from 'src/graphql/models/ClassroomMembers'
import { mockClassroomMembers } from 'src/__mocks__/mockClassroomMembers'
import { ClassroomMembersService } from 'src/classroom_members/ClassroomMembersService'

@Resolver((of) => Users)
export class UsersResolver {
    constructor(private usersService: UsersService, private classroomMembersService: ClassroomMembersService) { }

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
}