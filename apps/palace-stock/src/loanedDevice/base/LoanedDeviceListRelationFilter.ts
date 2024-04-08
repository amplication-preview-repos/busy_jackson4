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
import { LoanedDeviceWhereInput } from "./LoanedDeviceWhereInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

@InputType()
class LoanedDeviceListRelationFilter {
  @ApiProperty({
    required: false,
    type: () => LoanedDeviceWhereInput,
  })
  @ValidateNested()
  @Type(() => LoanedDeviceWhereInput)
  @IsOptional()
  @Field(() => LoanedDeviceWhereInput, {
    nullable: true,
  })
  every?: LoanedDeviceWhereInput;

  @ApiProperty({
    required: false,
    type: () => LoanedDeviceWhereInput,
  })
  @ValidateNested()
  @Type(() => LoanedDeviceWhereInput)
  @IsOptional()
  @Field(() => LoanedDeviceWhereInput, {
    nullable: true,
  })
  some?: LoanedDeviceWhereInput;

  @ApiProperty({
    required: false,
    type: () => LoanedDeviceWhereInput,
  })
  @ValidateNested()
  @Type(() => LoanedDeviceWhereInput)
  @IsOptional()
  @Field(() => LoanedDeviceWhereInput, {
    nullable: true,
  })
  none?: LoanedDeviceWhereInput;
}
export { LoanedDeviceListRelationFilter as LoanedDeviceListRelationFilter };