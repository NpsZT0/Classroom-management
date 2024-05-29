import { Field, InputType, Int } from "@nestjs/graphql";
import { Classrooms } from "src/graphql/models/Classrooms";
import { Users } from "src/graphql/models/Users";

@InputType()
export class CreateClassroomMemberInput {
    @Field((type) => Int)
    classroom: Classrooms;

    @Field((type) => Int)
    std: Users;
}