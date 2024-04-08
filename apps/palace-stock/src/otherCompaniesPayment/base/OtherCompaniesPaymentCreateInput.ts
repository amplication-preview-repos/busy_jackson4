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
  IsBoolean,
  IsEnum,
  IsDate,
  IsInt,
} from "class-validator";

import { Decimal } from "decimal.js";
import { ConektaPaymentTransacWhereUniqueInput } from "../../conektaPaymentTransac/base/ConektaPaymentTransacWhereUniqueInput";
import { Type } from "class-transformer";
import { EnumOtherCompaniesPaymentEstatusPago } from "./EnumOtherCompaniesPaymentEstatusPago";
import { StripePaymentTransacWhereUniqueInput } from "../../stripePaymentTransac/base/StripePaymentTransacWhereUniqueInput";
import { EnumOtherCompaniesPaymentTipoPago } from "./EnumOtherCompaniesPaymentTipoPago";
import { WarehouseWhereUniqueInput } from "../../warehouse/base/WarehouseWhereUniqueInput";

@InputType()
class OtherCompaniesPaymentCreateInput {
  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  @Field(() => Float)
  abonoExtra!: Decimal;

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
    required: true,
    type: Number,
  })
  @IsNumber()
  @Field(() => Float)
  cantidadRecibida!: Decimal;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  @Field(() => Float)
  capitalPagado!: Decimal;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  codigoBloqueo?: string | null;

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
    required: true,
    type: Number,
  })
  @IsNumber()
  @Field(() => Float)
  desctoAplicado!: Decimal;

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
    required: true,
    enum: EnumOtherCompaniesPaymentEstatusPago,
  })
  @IsEnum(EnumOtherCompaniesPaymentEstatusPago)
  @Field(() => EnumOtherCompaniesPaymentEstatusPago)
  estatus_pago!: "A" | "C" | "P";

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  fechaPago!: Date;

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
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  formaPago?: string | null;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  horaPago!: Date;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  @Field(() => Float)
  interesPagado!: Decimal;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  numPago!: number;

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
    required: true,
    enum: EnumOtherCompaniesPaymentTipoPago,
  })
  @IsEnum(EnumOtherCompaniesPaymentTipoPago)
  @Field(() => EnumOtherCompaniesPaymentTipoPago)
  tipo_pago!: "P" | "A" | "D" | "C";

  @ApiProperty({
    required: true,
    type: () => WarehouseWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => WarehouseWhereUniqueInput)
  @Field(() => WarehouseWhereUniqueInput)
  warehouses!: WarehouseWhereUniqueInput;
}

export { OtherCompaniesPaymentCreateInput as OtherCompaniesPaymentCreateInput };