import { ObjectType, Field } from '@nestjs/graphql';
import { ClassroomMembers } from 'src/graphql/models/ClassroomMembers';

@ObjectType()
export class ClassroomMemberDto {
    @Field()
    message: string;

    @Field(() => [ClassroomMembers])
    classroomMembers: ClassroomMembers[];
}
