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
import { IsInt, ValidateNested, IsOptional, IsDate } from "class-validator";
import { CollaboratorWhereUniqueInput } from "../../collaborator/base/CollaboratorWhereUniqueInput";
import { Type } from "class-transformer";
import { UserModelWhereUniqueInput } from "../../userModel/base/UserModelWhereUniqueInput";
import { WarehouseWhereUniqueInput } from "../../warehouse/base/WarehouseWhereUniqueInput";

@InputType()
class BranchManagerCreateInput {
  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  cargo!: number;

  @ApiProperty({
    required: false,
    type: () => CollaboratorWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CollaboratorWhereUniqueInput)
  @IsOptional()
  @Field(() => CollaboratorWhereUniqueInput, {
    nullable: true,
  })
  collaborators?: CollaboratorWhereUniqueInput | null;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  fechaIniciaCargo!: Date;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  numSucursal?: number | null;

  @ApiProperty({
    required: true,
    type: () => UserModelWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserModelWhereUniqueInput)
  @Field(() => UserModelWhereUniqueInput)
  users!: UserModelWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: () => WarehouseWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => WarehouseWhereUniqueInput)
  @IsOptional()
  @Field(() => WarehouseWhereUniqueInput, {
    nullable: true,
  })
  warehouses?: WarehouseWhereUniqueInput | null;
}

export { BranchManagerCreateInput as BranchManagerCreateInput };
