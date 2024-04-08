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
import { ConektaPaymentTransacWhereUniqueInput } from "../../conektaPaymentTransac/base/ConektaPaymentTransacWhereUniqueInput";
import {
  ValidateNested,
  IsOptional,
  IsEnum,
  IsDate,
  IsString,
} from "class-validator";
import { Type } from "class-transformer";
import { EnumRecurringPaymentEstatusIntento } from "./EnumRecurringPaymentEstatusIntento";
import { FinancedSaleWhereUniqueInput } from "../../financedSale/base/FinancedSaleWhereUniqueInput";
import { PaycodePaymentTransacWhereUniqueInput } from "../../paycodePaymentTransac/base/PaycodePaymentTransacWhereUniqueInput";
import { StripePaymentTransacWhereUniqueInput } from "../../stripePaymentTransac/base/StripePaymentTransacWhereUniqueInput";

@InputType()
class RecurringPaymentUpdateInput {
  @ApiProperty({
    required: false,
    type: () => ConektaPaymentTransacWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ConektaPaymentTransacWhereUniqueInput)
  @IsOptional()
  @Field(() => ConektaPaymentTransacWhereUniqueInput, {
    nullable: true,
  })
  conektaPaymentTransacs?: ConektaPaymentTransacWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    enum: EnumRecurringPaymentEstatusIntento,
  })
  @IsEnum(EnumRecurringPaymentEstatusIntento)
  @IsOptional()
  @Field(() => EnumRecurringPaymentEstatusIntento, {
    nullable: true,
  })
  estatus_intento?: "E" | "F" | null;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  fechaRegistro?: Date | null;

  @ApiProperty({
    required: false,
    type: () => FinancedSaleWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => FinancedSaleWhereUniqueInput)
  @IsOptional()
  @Field(() => FinancedSaleWhereUniqueInput, {
    nullable: true,
  })
  financedSales?: FinancedSaleWhereUniqueInput;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  horaRegistro?: Date | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  mensajeIntento?: string | null;

  @ApiProperty({
    required: false,
    type: () => PaycodePaymentTransacWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => PaycodePaymentTransacWhereUniqueInput)
  @IsOptional()
  @Field(() => PaycodePaymentTransacWhereUniqueInput, {
    nullable: true,
  })
  paycodePaymentTransacs?: PaycodePaymentTransacWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: () => StripePaymentTransacWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => StripePaymentTransacWhereUniqueInput)
  @IsOptional()
  @Field(() => StripePaymentTransacWhereUniqueInput, {
    nullable: true,
  })
  stripePaymentTransacs?: StripePaymentTransacWhereUniqueInput | null;
}

export { RecurringPaymentUpdateInput as RecurringPaymentUpdateInput };