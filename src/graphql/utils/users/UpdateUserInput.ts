import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateUserInput {
    @Field()
    stdId: string;

    @Field()
    prefix: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field({ nullable: true })
    gender?: string;

    @Field()
    birthday: string;

    @Field((type) => Int)
    gradeLevel: number;

}