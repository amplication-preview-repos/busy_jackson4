/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field, Float } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Decimal } from "decimal.js";
import { WarehouseLoanAmountUpdateManyWithoutLoanAmountsInput } from "./WarehouseLoanAmountUpdateManyWithoutLoanAmountsInput";
import { Type } from "class-transformer";

@InputType()
class LoanAmountUpdateInput {
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Float, {
    nullable: true,
  })
  amount?: Decimal;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  loyaltyPromotion?: string | null;

  @ApiProperty({
    required: false,
    type: () => WarehouseLoanAmountUpdateManyWithoutLoanAmountsInput,
  })
  @ValidateNested()
  @Type(() => WarehouseLoanAmountUpdateManyWithoutLoanAmountsInput)
  @IsOptional()
  @Field(() => WarehouseLoanAmountUpdateManyWithoutLoanAmountsInput, {
    nullable: true,
  })
  warehouseLoanAmounts?: WarehouseLoanAmountUpdateManyWithoutLoanAmountsInput;
}

export { LoanAmountUpdateInput as LoanAmountUpdateInput };