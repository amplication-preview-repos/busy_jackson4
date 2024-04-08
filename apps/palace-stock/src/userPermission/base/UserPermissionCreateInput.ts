/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, ValidateNested } from "class-validator";
import { PermissionWhereUniqueInput } from "../../permission/base/PermissionWhereUniqueInput";
import { Type } from "class-transformer";
import { UserModelWhereUniqueInput } from "../../userModel/base/UserModelWhereUniqueInput";

@InputType()
class UserPermissionCreateInput {
  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  idUsrAsignoPermiso!: number;

  @ApiProperty({
    required: true,
    type: () => PermissionWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => PermissionWhereUniqueInput)
  @Field(() => PermissionWhereUniqueInput)
  permissions!: PermissionWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => UserModelWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserModelWhereUniqueInput)
  @Field(() => UserModelWhereUniqueInput)
  users!: UserModelWhereUniqueInput;
}

export { UserPermissionCreateInput as UserPermissionCreateInput };