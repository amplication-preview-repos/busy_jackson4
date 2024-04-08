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
import {
  IsString,
  IsOptional,
  ValidateNested,
  IsInt,
  IsEnum,
  IsDate,
  IsNumber,
} from "class-validator";
import { Customer } from "../../customer/base/Customer";
import { Type } from "class-transformer";
import { EnumPersonalLoanEstatusPrestamo } from "./EnumPersonalLoanEstatusPrestamo";
import { Kardex } from "../../kardex/base/Kardex";
import { Decimal } from "decimal.js";
import { Payment } from "../../payment/base/Payment";
import { EnumPersonalLoanTipoPlazo } from "./EnumPersonalLoanTipoPlazo";
import { UserModel } from "../../userModel/base/UserModel";
import { EnumPersonalLoanValidacionesSaltadas } from "./EnumPersonalLoanValidacionesSaltadas";
import { Warehouse } from "../../warehouse/base/Warehouse";

@ObjectType()
class PersonalLoan {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  codigoBloqueo!: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  comentarios!: string | null;

  @ApiProperty({
    required: true,
    type: () => Customer,
  })
  @ValidateNested()
  @Type(() => Customer)
  customers?: Customer;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  deletedUserId!: number | null;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  desctoPagoOportuno!: number;

  @ApiProperty({
    required: false,
    enum: EnumPersonalLoanEstatusPrestamo,
  })
  @IsEnum(EnumPersonalLoanEstatusPrestamo)
  @IsOptional()
  @Field(() => EnumPersonalLoanEstatusPrestamo, {
    nullable: true,
  })
  estatus_prestamo?: "A" | "T" | "C" | null;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  fechaCancelacion!: Date | null;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  fechaPrestamo!: Date | null;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  fechaPrimerPago!: Date;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  fechaRegistro!: Date;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  id!: number;

  @ApiProperty({
    required: false,
    type: () => [Kardex],
  })
  @ValidateNested()
  @Type(() => Kardex)
  @IsOptional()
  kardex?: Array<Kardex>;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  @Field(() => Float)
  montoFinanciado!: Decimal;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  @Field(() => Float)
  montoPago!: Decimal;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Float, {
    nullable: true,
  })
  montoPagoInicial!: Decimal | null;

  @ApiProperty({
    required: false,
    type: () => [Payment],
  })
  @ValidateNested()
  @Type(() => Payment)
  @IsOptional()
  payments?: Array<Payment>;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  plazo!: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  requestedUserId!: number | null;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  @Field(() => Float)
  tasaInteres!: Decimal;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  tasaInteresAnual!: number;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  telefonoEnvioToken!: string | null;

  @ApiProperty({
    required: true,
    enum: EnumPersonalLoanTipoPlazo,
  })
  @IsEnum(EnumPersonalLoanTipoPlazo)
  @Field(() => EnumPersonalLoanTipoPlazo, {
    nullable: true,
  })
  tipo_plazo?: "S" | "Q";

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  tokenEnviado!: string | null;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  updatedAt!: Date | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  updatedUserId!: number | null;

  @ApiProperty({
    required: true,
    type: () => UserModel,
  })
  @ValidateNested()
  @Type(() => UserModel)
  users?: UserModel;

  @ApiProperty({
    required: false,
    enum: EnumPersonalLoanValidacionesSaltadas,
  })
  @IsEnum(EnumPersonalLoanValidacionesSaltadas)
  @IsOptional()
  @Field(() => EnumPersonalLoanValidacionesSaltadas, {
    nullable: true,
  })
  validaciones_saltadas?: "S" | "N" | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  vendorLock!: string | null;

  @ApiProperty({
    required: true,
    type: () => Warehouse,
  })
  @ValidateNested()
  @Type(() => Warehouse)
  warehouses?: Warehouse;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  warningAlert!: string | null;
}

export { PersonalLoan as PersonalLoan };