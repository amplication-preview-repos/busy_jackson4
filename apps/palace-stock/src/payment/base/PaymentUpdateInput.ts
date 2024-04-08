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
  ValidateNested,
  IsInt,
  IsString,
  IsBoolean,
  IsDate,
  IsEnum,
} from "class-validator";

import { Decimal } from "decimal.js";
import { BillUpdateManyWithoutPaymentsInput } from "./BillUpdateManyWithoutPaymentsInput";
import { Type } from "class-transformer";
import { CashCountDetailWhereUniqueInput } from "../../cashCountDetail/base/CashCountDetailWhereUniqueInput";
import { ConektaPaymentTransacWhereUniqueInput } from "../../conektaPaymentTransac/base/ConektaPaymentTransacWhereUniqueInput";
import { DocumentUpdateManyWithoutPaymentsInput } from "./DocumentUpdateManyWithoutPaymentsInput";
import { FinancedSaleWhereUniqueInput } from "../../financedSale/base/FinancedSaleWhereUniqueInput";
import { KardexUpdateManyWithoutPaymentsInput } from "./KardexUpdateManyWithoutPaymentsInput";
import { ModifiedPaymentUpdateManyWithoutPaymentsInput } from "./ModifiedPaymentUpdateManyWithoutPaymentsInput";
import { PaycodePaymentTransacWhereUniqueInput } from "../../paycodePaymentTransac/base/PaycodePaymentTransacWhereUniqueInput";
import { EnumPaymentPayStatus } from "./EnumPaymentPayStatus";
import { EnumPaymentPayType } from "./EnumPaymentPayType";
import { PersonalLoanWhereUniqueInput } from "../../personalLoan/base/PersonalLoanWhereUniqueInput";
import { StripePaymentTransacWhereUniqueInput } from "../../stripePaymentTransac/base/StripePaymentTransacWhereUniqueInput";
import { WarehouseWhereUniqueInput } from "../../warehouse/base/WarehouseWhereUniqueInput";

@InputType()
class PaymentUpdateInput {
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Float, {
    nullable: true,
  })
  abonoExtra?: Decimal;

  @ApiProperty({
    required: false,
    type: () => BillUpdateManyWithoutPaymentsInput,
  })
  @ValidateNested()
  @Type(() => BillUpdateManyWithoutPaymentsInput)
  @IsOptional()
  @Field(() => BillUpdateManyWithoutPaymentsInput, {
    nullable: true,
  })
  bills?: BillUpdateManyWithoutPaymentsInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Float, {
    nullable: true,
  })
  cambioDevuelto?: Decimal | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  canceledUserId?: number | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Float, {
    nullable: true,
  })
  cantidadRecibida?: Decimal;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Float, {
    nullable: true,
  })
  capitalPagado?: Decimal;

  @ApiProperty({
    required: false,
    type: () => CashCountDetailWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CashCountDetailWhereUniqueInput)
  @IsOptional()
  @Field(() => CashCountDetailWhereUniqueInput, {
    nullable: true,
  })
  cashCountDetails?: CashCountDetailWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  comentariosPago?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  comprobantePago?: string | null;

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
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  customerId?: number | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Float, {
    nullable: true,
  })
  desctoAplicado?: Decimal;

  @ApiProperty({
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
  })
  desdeWebhook?: boolean | null;

  @ApiProperty({
    required: false,
    type: () => DocumentUpdateManyWithoutPaymentsInput,
  })
  @ValidateNested()
  @Type(() => DocumentUpdateManyWithoutPaymentsInput)
  @IsOptional()
  @Field(() => DocumentUpdateManyWithoutPaymentsInput, {
    nullable: true,
  })
  documents?: DocumentUpdateManyWithoutPaymentsInput;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  fechaCancelo?: Date | null;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  fechaPago?: Date;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  fechaProxVenc?: Date | null;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  fechaVenc?: Date | null;

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
  financedSales?: FinancedSaleWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  formaPago?: string | null;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  horaPago?: Date;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Float, {
    nullable: true,
  })
  interesPagado?: Decimal;

  @ApiProperty({
    required: false,
    type: () => KardexUpdateManyWithoutPaymentsInput,
  })
  @ValidateNested()
  @Type(() => KardexUpdateManyWithoutPaymentsInput)
  @IsOptional()
  @Field(() => KardexUpdateManyWithoutPaymentsInput, {
    nullable: true,
  })
  kardex?: KardexUpdateManyWithoutPaymentsInput;

  @ApiProperty({
    required: false,
    type: () => ModifiedPaymentUpdateManyWithoutPaymentsInput,
  })
  @ValidateNested()
  @Type(() => ModifiedPaymentUpdateManyWithoutPaymentsInput)
  @IsOptional()
  @Field(() => ModifiedPaymentUpdateManyWithoutPaymentsInput, {
    nullable: true,
  })
  modifiedPayments?: ModifiedPaymentUpdateManyWithoutPaymentsInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  opcionCambio?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  opcionPago?: string | null;

  @ApiProperty({
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
  })
  pagoRecurrente?: boolean | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  pagosAdelantados?: number | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  pathFileDiscount?: string | null;

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
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  payCount?: number;

  @ApiProperty({
    required: false,
    enum: EnumPaymentPayStatus,
  })
  @IsEnum(EnumPaymentPayStatus)
  @IsOptional()
  @Field(() => EnumPaymentPayStatus, {
    nullable: true,
  })
  pay_status?: "A" | "C" | "P";

  @ApiProperty({
    required: false,
    enum: EnumPaymentPayType,
  })
  @IsEnum(EnumPaymentPayType)
  @IsOptional()
  @Field(() => EnumPaymentPayType, {
    nullable: true,
  })
  pay_type?: "P" | "A" | "D" | "C" | "E";

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  percentageDiscountDownPayment?: number | null;

  @ApiProperty({
    required: false,
    type: () => PersonalLoanWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => PersonalLoanWhereUniqueInput)
  @IsOptional()
  @Field(() => PersonalLoanWhereUniqueInput, {
    nullable: true,
  })
  personalLoans?: PersonalLoanWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  promotionId?: number | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  receivedUserId?: number | null;

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
  warehouses?: WarehouseWhereUniqueInput;
}

export { PaymentUpdateInput as PaymentUpdateInput };