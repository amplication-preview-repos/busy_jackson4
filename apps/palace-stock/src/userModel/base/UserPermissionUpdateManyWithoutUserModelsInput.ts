/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field } from "@nestjs/graphql";
import { UserPermissionWhereUniqueInput } from "../../userPermission/base/UserPermissionWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class UserPermissionUpdateManyWithoutUserModelsInput {
  @Field(() => [UserPermissionWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [UserPermissionWhereUniqueInput],
  })
  connect?: Array<UserPermissionWhereUniqueInput>;

  @Field(() => [UserPermissionWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [UserPermissionWhereUniqueInput],
  })
  disconnect?: Array<UserPermissionWhereUniqueInput>;

  @Field(() => [UserPermissionWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [UserPermissionWhereUniqueInput],
  })
  set?: Array<UserPermissionWhereUniqueInput>;
}

export { UserPermissionUpdateManyWithoutUserModelsInput as UserPermissionUpdateManyWithoutUserModelsInput };
