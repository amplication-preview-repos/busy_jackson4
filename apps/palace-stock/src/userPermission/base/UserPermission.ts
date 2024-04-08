/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Permission } from "../../permission/base/Permission";
import { UserModel } from "../../userModel/base/UserModel";

@ObjectType()
class UserPermission {
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  fechaAsignoPermiso!: Date;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  id!: number;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  idUsrAsignoPermiso!: number;

  @ApiProperty({
    required: true,
    type: () => Permission,
  })
  @ValidateNested()
  @Type(() => Permission)
  permissions?: Permission;

  @ApiProperty({
    required: true,
    type: () => UserModel,
  })
  @ValidateNested()
  @Type(() => UserModel)
  users?: UserModel;
}

export { UserPermission as UserPermission };
