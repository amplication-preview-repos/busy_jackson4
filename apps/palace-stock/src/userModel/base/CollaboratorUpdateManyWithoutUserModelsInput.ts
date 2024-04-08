/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field } from "@nestjs/graphql";
import { CollaboratorWhereUniqueInput } from "../../collaborator/base/CollaboratorWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class CollaboratorUpdateManyWithoutUserModelsInput {
  @Field(() => [CollaboratorWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [CollaboratorWhereUniqueInput],
  })
  connect?: Array<CollaboratorWhereUniqueInput>;

  @Field(() => [CollaboratorWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [CollaboratorWhereUniqueInput],
  })
  disconnect?: Array<CollaboratorWhereUniqueInput>;

  @Field(() => [CollaboratorWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [CollaboratorWhereUniqueInput],
  })
  set?: Array<CollaboratorWhereUniqueInput>;
}

export { CollaboratorUpdateManyWithoutUserModelsInput as CollaboratorUpdateManyWithoutUserModelsInput };