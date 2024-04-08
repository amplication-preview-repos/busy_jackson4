/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { ObjectType, Field, Float } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CashCount } from "../../cashCount/base/CashCount";
import {
  ValidateNested,
  IsOptional,
  IsEnum,
  IsInt,
  IsNumber,
} from "class-validator";
import { Type } from "class-transformer";
import { CashSale } from "../../cashSale/base/CashSale";
import { EnumCashCountDetailEstatusDesglose } from "./EnumCashCountDetailEstatusDesglose";
import { FinancedSale } from "../../financedSale/base/FinancedSale";
import { Decimal } from "decimal.js";
import { Payment } from "../../payment/base/Payment";

@ObjectType()
class CashCountDetail {
  @ApiProperty({
    required: true,
    type: () => CashCount,
  })
  @ValidateNested()
  @Type(() => CashCount)
  cashCounts?: CashCount;

  @ApiProperty({
    required: false,
    type: () => CashSale,
  })
  @ValidateNested()
  @Type(() => CashSale)
  @IsOptional()
  cashSales?: CashSale | null;

  @ApiProperty({
    required: false,
    enum: EnumCashCountDetailEstatusDesglose,
  })
  @IsEnum(EnumCashCountDetailEstatusDesglose)
  @IsOptional()
  @Field(() => EnumCashCountDetailEstatusDesglose, {
    nullable: true,
  })
  estatus_desglose?: "A" | "I" | null;

  @ApiProperty({
    required: false,
    type: () => FinancedSale,
  })
  @ValidateNested()
  @Type(() => FinancedSale)
  @IsOptional()
  financedSales?: FinancedSale | null;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  id!: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Float, {
    nullable: true,
  })
  ingreso!: Decimal | null;

  @ApiProperty({
    required: false,
    type: () => Payment,
  })
  @ValidateNested()
  @Type(() => Payment)
  @IsOptional()
  payments?: Payment | null;
}

export { CashCountDetail as CashCountDetail };