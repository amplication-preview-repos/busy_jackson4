/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { LoanedDeviceWhereInput } from "./LoanedDeviceWhereInput";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { LoanedDeviceOrderByInput } from "./LoanedDeviceOrderByInput";

@ArgsType()
class LoanedDeviceFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => LoanedDeviceWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => LoanedDeviceWhereInput, { nullable: true })
  @Type(() => LoanedDeviceWhereInput)
  where?: LoanedDeviceWhereInput;

  @ApiProperty({
    required: false,
    type: [LoanedDeviceOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [LoanedDeviceOrderByInput], { nullable: true })
  @Type(() => LoanedDeviceOrderByInput)
  orderBy?: Array<LoanedDeviceOrderByInput>;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { LoanedDeviceFindManyArgs as LoanedDeviceFindManyArgs };