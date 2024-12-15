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
import {
  IsInt,
  IsOptional,
  IsDate,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { FinancedSaleWhereUniqueInput } from "../../financedSale/base/FinancedSaleWhereUniqueInput";
import { OtherCompaniesPaymentUpdateManyWithoutStripePaymentTransacsInput } from "./OtherCompaniesPaymentUpdateManyWithoutStripePaymentTransacsInput";
import { PaymentUpdateManyWithoutStripePaymentTransacsInput } from "./PaymentUpdateManyWithoutStripePaymentTransacsInput";
import { RecurringPaymentUpdateManyWithoutStripePaymentTransacsInput } from "./RecurringPaymentUpdateManyWithoutStripePaymentTransacsInput";
import { StripeApiLogUpdateManyWithoutStripePaymentTransacsInput } from "./StripeApiLogUpdateManyWithoutStripePaymentTransacsInput";

@InputType()
class StripePaymentTransacUpdateInput {
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  amount?: number;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  created?: Date;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  datosPago?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  eventStatus?: string | null;

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
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  habilitarPagoRecurrente?: number | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  linkVoucher?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  metodoPago?: string | null;

  @ApiProperty({
    required: false,
    type: () =>
      OtherCompaniesPaymentUpdateManyWithoutStripePaymentTransacsInput,
  })
  @ValidateNested()
  @Type(() => OtherCompaniesPaymentUpdateManyWithoutStripePaymentTransacsInput)
  @IsOptional()
  @Field(
    () => OtherCompaniesPaymentUpdateManyWithoutStripePaymentTransacsInput,
    {
      nullable: true,
    }
  )
  otherCompaniesPayments?: OtherCompaniesPaymentUpdateManyWithoutStripePaymentTransacsInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  paymentIntent?: string;

  @ApiProperty({
    required: false,
    type: () => PaymentUpdateManyWithoutStripePaymentTransacsInput,
  })
  @ValidateNested()
  @Type(() => PaymentUpdateManyWithoutStripePaymentTransacsInput)
  @IsOptional()
  @Field(() => PaymentUpdateManyWithoutStripePaymentTransacsInput, {
    nullable: true,
  })
  payments?: PaymentUpdateManyWithoutStripePaymentTransacsInput;

  @ApiProperty({
    required: false,
    type: () => RecurringPaymentUpdateManyWithoutStripePaymentTransacsInput,
  })
  @ValidateNested()
  @Type(() => RecurringPaymentUpdateManyWithoutStripePaymentTransacsInput)
  @IsOptional()
  @Field(() => RecurringPaymentUpdateManyWithoutStripePaymentTransacsInput, {
    nullable: true,
  })
  recurringPayments?: RecurringPaymentUpdateManyWithoutStripePaymentTransacsInput;

  @ApiProperty({
    required: false,
    type: () => StripeApiLogUpdateManyWithoutStripePaymentTransacsInput,
  })
  @ValidateNested()
  @Type(() => StripeApiLogUpdateManyWithoutStripePaymentTransacsInput)
  @IsOptional()
  @Field(() => StripeApiLogUpdateManyWithoutStripePaymentTransacsInput, {
    nullable: true,
  })
  stripeApiLog?: StripeApiLogUpdateManyWithoutStripePaymentTransacsInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  stripeClientSecret?: string;
}

export { StripePaymentTransacUpdateInput as StripePaymentTransacUpdateInput };
