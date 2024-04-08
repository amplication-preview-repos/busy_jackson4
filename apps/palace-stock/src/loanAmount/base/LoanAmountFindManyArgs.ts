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
import { LoanAmountWhereInput } from "./LoanAmountWhereInput";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { LoanAmountOrderByInput } from "./LoanAmountOrderByInput";

@ArgsType()
class LoanAmountFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => LoanAmountWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => LoanAmountWhereInput, { nullable: true })
  @Type(() => LoanAmountWhereInput)
  where?: LoanAmountWhereInput;

  @ApiProperty({
    required: false,
    type: [LoanAmountOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [LoanAmountOrderByInput], { nullable: true })
  @Type(() => LoanAmountOrderByInput)
  orderBy?: Array<LoanAmountOrderByInput>;

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

export { LoanAmountFindManyArgs as LoanAmountFindManyArgs };