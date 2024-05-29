import { ObjectType, Field } from '@nestjs/graphql';
import { Classrooms } from 'src/graphql/models/Classrooms';

@ObjectType()
export class ClassroomDto {
    @Field()
    message: string;

    @Field(() => [Classrooms])
    classrooms: Classrooms[];
}
