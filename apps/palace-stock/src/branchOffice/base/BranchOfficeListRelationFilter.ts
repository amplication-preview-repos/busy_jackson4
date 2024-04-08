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
import { BranchOfficeWhereInput } from "./BranchOfficeWhereInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

@InputType()
class BranchOfficeListRelationFilter {
  @ApiProperty({
    required: false,
    type: () => BranchOfficeWhereInput,
  })
  @ValidateNested()
  @Type(() => BranchOfficeWhereInput)
  @IsOptional()
  @Field(() => BranchOfficeWhereInput, {
    nullable: true,
  })
  every?: BranchOfficeWhereInput;

  @ApiProperty({
    required: false,
    type: () => BranchOfficeWhereInput,
  })
  @ValidateNested()
  @Type(() => BranchOfficeWhereInput)
  @IsOptional()
  @Field(() => BranchOfficeWhereInput, {
    nullable: true,
  })
  some?: BranchOfficeWhereInput;

  @ApiProperty({
    required: false,
    type: () => BranchOfficeWhereInput,
  })
  @ValidateNested()
  @Type(() => BranchOfficeWhereInput)
  @IsOptional()
  @Field(() => BranchOfficeWhereInput, {
    nullable: true,
  })
  none?: BranchOfficeWhereInput;
}
export { BranchOfficeListRelationFilter as BranchOfficeListRelationFilter };
