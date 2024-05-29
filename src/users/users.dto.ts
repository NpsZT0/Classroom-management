import { ObjectType, Field } from '@nestjs/graphql';
import { Users } from 'src/graphql/models/Users';

@ObjectType()
export class UsersDto {
    @Field()
    message: string;

    @Field(() => [Users])
    users: Users[];
}
