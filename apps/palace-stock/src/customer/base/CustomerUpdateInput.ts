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
import { AngazaAccountUpdateManyWithoutCustomersInput } from "./AngazaAccountUpdateManyWithoutCustomersInput";

import {
  ValidateNested,
  IsOptional,
  IsString,
  IsInt,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsDate,
} from "class-validator";

import { Type } from "class-transformer";
import { EnumCustomerCteRequiereFactura } from "./EnumCustomerCteRequiereFactura";
import { DocumentUpdateManyWithoutCustomersInput } from "./DocumentUpdateManyWithoutCustomersInput";
import { Decimal } from "decimal.js";
import { EnumCustomerEstatusCliente } from "./EnumCustomerEstatusCliente";
import { FinancedSaleUpdateManyWithoutCustomersInput } from "./FinancedSaleUpdateManyWithoutCustomersInput";
import { EnumCustomerGeneroCliente } from "./EnumCustomerGeneroCliente";
import { EnumCustomerIneDireccionActual } from "./EnumCustomerIneDireccionActual";
import { LoanedDeviceUpdateManyWithoutCustomersInput } from "./LoanedDeviceUpdateManyWithoutCustomersInput";
import { LockedDevBadCustomerUpdateManyWithoutCustomersInput } from "./LockedDevBadCustomerUpdateManyWithoutCustomersInput";
import { PersonalLoanUpdateManyWithoutCustomersInput } from "./PersonalLoanUpdateManyWithoutCustomersInput";
import { ProtectionCertActivationUpdateManyWithoutCustomersInput } from "./ProtectionCertActivationUpdateManyWithoutCustomersInput";
import { ProtectionCertUpdateManyWithoutCustomersInput } from "./ProtectionCertUpdateManyWithoutCustomersInput";
import { SupportTicketUpdateManyWithoutCustomersInput } from "./SupportTicketUpdateManyWithoutCustomersInput";
import { TransactionUpdateManyWithoutCustomersInput } from "./TransactionUpdateManyWithoutCustomersInput";
import { UserModelWhereUniqueInput } from "../../userModel/base/UserModelWhereUniqueInput";
import { WarehouseWhereUniqueInput } from "../../warehouse/base/WarehouseWhereUniqueInput";

@InputType()
class CustomerUpdateInput {
  @ApiProperty({
    required: false,
    type: () => AngazaAccountUpdateManyWithoutCustomersInput,
  })
  @ValidateNested()
  @Type(() => AngazaAccountUpdateManyWithoutCustomersInput)
  @IsOptional()
  @Field(() => AngazaAccountUpdateManyWithoutCustomersInput, {
    nullable: true,
  })
  angazaAccounts?: AngazaAccountUpdateManyWithoutCustomersInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  antiguedadTrabajo?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  apellido1Cliente?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  apellido2Cliente?: string | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  billingCfdiUseId?: number | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  billingFiscalRegimeId?: number | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  ciudadActualCte?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  ciudadCte?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  ciudadRazSoc?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  clabePaycode?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  claveIdCliente?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  coloniaActualCte?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  coloniaCte?: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  coloniaRazSoc?: string | null;

  @ApiProperty({
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
  })
  conekta?: boolean | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  correoCte?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  correoRazSoc?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  cpActualCte?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  cpCte?: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  cpRazSoc?: string | null;

  @ApiProperty({
    required: false,
    enum: EnumCustomerCteRequiereFactura,
  })
  @IsEnum(EnumCustomerCteRequiereFactura)
  @IsOptional()
  @Field(() => EnumCustomerCteRequiereFactura, {
    nullable: true,
  })
  cte_requiere_factura?: "S" | "N";

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  curpCliente?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  direccionActualCte?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  direccionCte?: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  direccionRazSoc?: string | null;

  @ApiProperty({
    required: false,
    type: () => DocumentUpdateManyWithoutCustomersInput,
  })
  @ValidateNested()
  @Type(() => DocumentUpdateManyWithoutCustomersInput)
  @IsOptional()
  @Field(() => DocumentUpdateManyWithoutCustomersInput, {
    nullable: true,
  })
  documents?: DocumentUpdateManyWithoutCustomersInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  domicilioTrabajo?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  edadCliente?: string | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Float, {
    nullable: true,
  })
  enganchePromoLealtad?: Decimal | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  estadoRepActualCte?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  estadoRepCte?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  estadoRepRazSoc?: string | null;

  @ApiProperty({
    required: false,
    enum: EnumCustomerEstatusCliente,
  })
  @IsEnum(EnumCustomerEstatusCliente)
  @IsOptional()
  @Field(() => EnumCustomerEstatusCliente, {
    nullable: true,
  })
  estatus_cliente?: "A" | "I";

  @ApiProperty({
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
  })
  estatusSeguroVida?: boolean | null;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  fechaActivacionSeguro?: Date | null;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  fechaAltaCliente?: Date;

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
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  fechaUltCambio?: Date | null;

  @ApiProperty({
    required: false,
    type: () => FinancedSaleUpdateManyWithoutCustomersInput,
  })
  @ValidateNested()
  @Type(() => FinancedSaleUpdateManyWithoutCustomersInput)
  @IsOptional()
  @Field(() => FinancedSaleUpdateManyWithoutCustomersInput, {
    nullable: true,
  })
  financedSales?: FinancedSaleUpdateManyWithoutCustomersInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  folioSeguroVida?: string | null;

  @ApiProperty({
    required: false,
    enum: EnumCustomerGeneroCliente,
  })
  @IsEnum(EnumCustomerGeneroCliente)
  @IsOptional()
  @Field(() => EnumCustomerGeneroCliente, {
    nullable: true,
  })
  genero_cliente?: "F" | "M" | "O" | null;

  @ApiProperty({
    required: false,
    enum: EnumCustomerIneDireccionActual,
  })
  @IsEnum(EnumCustomerIneDireccionActual)
  @IsOptional()
  @Field(() => EnumCustomerIneDireccionActual, {
    nullable: true,
  })
  ine_direccion_actual?: "S" | "N" | null;

  @ApiProperty({
    required: false,
    type: () => LoanedDeviceUpdateManyWithoutCustomersInput,
  })
  @ValidateNested()
  @Type(() => LoanedDeviceUpdateManyWithoutCustomersInput)
  @IsOptional()
  @Field(() => LoanedDeviceUpdateManyWithoutCustomersInput, {
    nullable: true,
  })
  loanedDevices?: LoanedDeviceUpdateManyWithoutCustomersInput;

  @ApiProperty({
    required: false,
    type: () => LockedDevBadCustomerUpdateManyWithoutCustomersInput,
  })
  @ValidateNested()
  @Type(() => LockedDevBadCustomerUpdateManyWithoutCustomersInput)
  @IsOptional()
  @Field(() => LockedDevBadCustomerUpdateManyWithoutCustomersInput, {
    nullable: true,
  })
  lockedDevBadCustomers?: LockedDevBadCustomerUpdateManyWithoutCustomersInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  lugarTrabajo?: string | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Float, {
    nullable: true,
  })
  montoDisponibleEnganche?: Decimal | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  nombreCompletoCliente?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  nombresCliente?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  nomRef1Cliente?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  nomRef2Cliente?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  nubariumScore?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  numExtCte?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  numExtRazSoc?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  numIntCte?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  numIntRazSoc?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  numTelCte?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  numTelFijoCte?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  numTelRazSoc?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  paisRazSoc?: string | null;

  @ApiProperty({
    required: false,
    type: () => PersonalLoanUpdateManyWithoutCustomersInput,
  })
  @ValidateNested()
  @Type(() => PersonalLoanUpdateManyWithoutCustomersInput)
  @IsOptional()
  @Field(() => PersonalLoanUpdateManyWithoutCustomersInput, {
    nullable: true,
  })
  personalLoans?: PersonalLoanUpdateManyWithoutCustomersInput;

  @ApiProperty({
    required: false,
    type: () => ProtectionCertActivationUpdateManyWithoutCustomersInput,
  })
  @ValidateNested()
  @Type(() => ProtectionCertActivationUpdateManyWithoutCustomersInput)
  @IsOptional()
  @Field(() => ProtectionCertActivationUpdateManyWithoutCustomersInput, {
    nullable: true,
  })
  protectionCertActivations?: ProtectionCertActivationUpdateManyWithoutCustomersInput;

  @ApiProperty({
    required: false,
    type: () => ProtectionCertUpdateManyWithoutCustomersInput,
  })
  @ValidateNested()
  @Type(() => ProtectionCertUpdateManyWithoutCustomersInput)
  @IsOptional()
  @Field(() => ProtectionCertUpdateManyWithoutCustomersInput, {
    nullable: true,
  })
  protectionCerts?: ProtectionCertUpdateManyWithoutCustomersInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  puestoTrabajo?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  qidAngaza?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  razonSocialCte?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  rfcCte?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  rfcPersonalCte?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  rutaFirma?: string | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Float, {
    nullable: true,
  })
  salarioMensualTrabajo?: Decimal | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  scoreMaxValue?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  secondaryTelephoneNumber?: string | null;

  @ApiProperty({
    required: false,
    type: () => SupportTicketUpdateManyWithoutCustomersInput,
  })
  @ValidateNested()
  @Type(() => SupportTicketUpdateManyWithoutCustomersInput)
  @IsOptional()
  @Field(() => SupportTicketUpdateManyWithoutCustomersInput, {
    nullable: true,
  })
  supportTickets?: SupportTicketUpdateManyWithoutCustomersInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  telRef1Cliente?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  telRef2Cliente?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  tipoIdCliente?: string | null;

  @ApiProperty({
    required: false,
    type: () => TransactionUpdateManyWithoutCustomersInput,
  })
  @ValidateNested()
  @Type(() => TransactionUpdateManyWithoutCustomersInput)
  @IsOptional()
  @Field(() => TransactionUpdateManyWithoutCustomersInput, {
    nullable: true,
  })
  transactions?: TransactionUpdateManyWithoutCustomersInput;

  @ApiProperty({
    required: false,
    type: () => UserModelWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserModelWhereUniqueInput)
  @IsOptional()
  @Field(() => UserModelWhereUniqueInput, {
    nullable: true,
  })
  usersCustomersCreatedUserIdTousers?: UserModelWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: () => UserModelWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserModelWhereUniqueInput)
  @IsOptional()
  @Field(() => UserModelWhereUniqueInput, {
    nullable: true,
  })
  usersCustomersUpdatedUserIdTousers?: UserModelWhereUniqueInput | null;

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
  warehouses?: WarehouseWhereUniqueInput | null;
}

export { CustomerUpdateInput as CustomerUpdateInput };
