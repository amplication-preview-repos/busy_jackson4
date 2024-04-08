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
import { BillDetailUpdateManyWithoutItemsInput } from "./BillDetailUpdateManyWithoutItemsInput";
import {
  ValidateNested,
  IsOptional,
  IsString,
  IsInt,
  IsEnum,
  IsDate,
} from "class-validator";
import { Type } from "class-transformer";
import { CashSaleDetailUpdateManyWithoutItemsInput } from "./CashSaleDetailUpdateManyWithoutItemsInput";
import { CategoryWhereUniqueInput } from "../../category/base/CategoryWhereUniqueInput";
import { EnumItemEstatusArt } from "./EnumItemEstatusArt";
import { EstimateUpdateManyWithoutItemsInput } from "./EstimateUpdateManyWithoutItemsInput";
import { FinancedAccessoryUpdateManyWithoutItemsInput } from "./FinancedAccessoryUpdateManyWithoutItemsInput";
import { FinancedSaleUpdateManyWithoutItemsInput } from "./FinancedSaleUpdateManyWithoutItemsInput";
import { ItemPriceUpdateManyWithoutItemsInput } from "./ItemPriceUpdateManyWithoutItemsInput";
import { KardexUpdateManyWithoutItemsInput } from "./KardexUpdateManyWithoutItemsInput";
import { KardexSeryUpdateManyWithoutItemsInput } from "./KardexSeryUpdateManyWithoutItemsInput";
import { LoanedDeviceUpdateManyWithoutItemsInput } from "./LoanedDeviceUpdateManyWithoutItemsInput";
import { MeasuringUnitWhereUniqueInput } from "../../measuringUnit/base/MeasuringUnitWhereUniqueInput";
import { EnumItemOfrecerPlanes } from "./EnumItemOfrecerPlanes";
import { ProtectionCertActivationUpdateManyWithoutItemsInput } from "./ProtectionCertActivationUpdateManyWithoutItemsInput";
import { StockUpdateManyWithoutItemsInput } from "./StockUpdateManyWithoutItemsInput";
import { StockSeryUpdateManyWithoutItemsInput } from "./StockSeryUpdateManyWithoutItemsInput";
import { EnumItemTipoArt } from "./EnumItemTipoArt";
import { EnumItemTipoInventario } from "./EnumItemTipoInventario";

@InputType()
class ItemUpdateInput {
  @ApiProperty({
    required: false,
    type: () => BillDetailUpdateManyWithoutItemsInput,
  })
  @ValidateNested()
  @Type(() => BillDetailUpdateManyWithoutItemsInput)
  @IsOptional()
  @Field(() => BillDetailUpdateManyWithoutItemsInput, {
    nullable: true,
  })
  billDetails?: BillDetailUpdateManyWithoutItemsInput;

  @ApiProperty({
    required: false,
    type: () => CashSaleDetailUpdateManyWithoutItemsInput,
  })
  @ValidateNested()
  @Type(() => CashSaleDetailUpdateManyWithoutItemsInput)
  @IsOptional()
  @Field(() => CashSaleDetailUpdateManyWithoutItemsInput, {
    nullable: true,
  })
  cashSaleDetails?: CashSaleDetailUpdateManyWithoutItemsInput;

  @ApiProperty({
    required: false,
    type: () => CategoryWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CategoryWhereUniqueInput)
  @IsOptional()
  @Field(() => CategoryWhereUniqueInput, {
    nullable: true,
  })
  categories?: CategoryWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  codigoArt?: string;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  createdUserId?: number | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  descripcionArt?: string;

  @ApiProperty({
    required: false,
    enum: EnumItemEstatusArt,
  })
  @IsEnum(EnumItemEstatusArt)
  @IsOptional()
  @Field(() => EnumItemEstatusArt, {
    nullable: true,
  })
  estatus_art?: "A" | "I";

  @ApiProperty({
    required: false,
    type: () => EstimateUpdateManyWithoutItemsInput,
  })
  @ValidateNested()
  @Type(() => EstimateUpdateManyWithoutItemsInput)
  @IsOptional()
  @Field(() => EstimateUpdateManyWithoutItemsInput, {
    nullable: true,
  })
  estimates?: EstimateUpdateManyWithoutItemsInput;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  fechaModificado?: Date | null;

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
    type: () => FinancedAccessoryUpdateManyWithoutItemsInput,
  })
  @ValidateNested()
  @Type(() => FinancedAccessoryUpdateManyWithoutItemsInput)
  @IsOptional()
  @Field(() => FinancedAccessoryUpdateManyWithoutItemsInput, {
    nullable: true,
  })
  financedAccessories?: FinancedAccessoryUpdateManyWithoutItemsInput;

  @ApiProperty({
    required: false,
    type: () => FinancedSaleUpdateManyWithoutItemsInput,
  })
  @ValidateNested()
  @Type(() => FinancedSaleUpdateManyWithoutItemsInput)
  @IsOptional()
  @Field(() => FinancedSaleUpdateManyWithoutItemsInput, {
    nullable: true,
  })
  financedSales?: FinancedSaleUpdateManyWithoutItemsInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  ignorarPlazos?: string | null;

  @ApiProperty({
    required: false,
    type: () => ItemPriceUpdateManyWithoutItemsInput,
  })
  @ValidateNested()
  @Type(() => ItemPriceUpdateManyWithoutItemsInput)
  @IsOptional()
  @Field(() => ItemPriceUpdateManyWithoutItemsInput, {
    nullable: true,
  })
  itemPrices?: ItemPriceUpdateManyWithoutItemsInput;

  @ApiProperty({
    required: false,
    type: () => KardexUpdateManyWithoutItemsInput,
  })
  @ValidateNested()
  @Type(() => KardexUpdateManyWithoutItemsInput)
  @IsOptional()
  @Field(() => KardexUpdateManyWithoutItemsInput, {
    nullable: true,
  })
  kardex?: KardexUpdateManyWithoutItemsInput;

  @ApiProperty({
    required: false,
    type: () => KardexSeryUpdateManyWithoutItemsInput,
  })
  @ValidateNested()
  @Type(() => KardexSeryUpdateManyWithoutItemsInput)
  @IsOptional()
  @Field(() => KardexSeryUpdateManyWithoutItemsInput, {
    nullable: true,
  })
  kardexSeries?: KardexSeryUpdateManyWithoutItemsInput;

  @ApiProperty({
    required: false,
    type: () => LoanedDeviceUpdateManyWithoutItemsInput,
  })
  @ValidateNested()
  @Type(() => LoanedDeviceUpdateManyWithoutItemsInput)
  @IsOptional()
  @Field(() => LoanedDeviceUpdateManyWithoutItemsInput, {
    nullable: true,
  })
  loanedDevices?: LoanedDeviceUpdateManyWithoutItemsInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  marca?: string | null;

  @ApiProperty({
    required: false,
    type: () => MeasuringUnitWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => MeasuringUnitWhereUniqueInput)
  @IsOptional()
  @Field(() => MeasuringUnitWhereUniqueInput, {
    nullable: true,
  })
  measuringUnits?: MeasuringUnitWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  modelo?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  nombreArchivo?: string | null;

  @ApiProperty({
    required: false,
    enum: EnumItemOfrecerPlanes,
  })
  @IsEnum(EnumItemOfrecerPlanes)
  @IsOptional()
  @Field(() => EnumItemOfrecerPlanes, {
    nullable: true,
  })
  ofrecer_planes?: "I" | "A";

  @ApiProperty({
    required: false,
    type: () => ProtectionCertActivationUpdateManyWithoutItemsInput,
  })
  @ValidateNested()
  @Type(() => ProtectionCertActivationUpdateManyWithoutItemsInput)
  @IsOptional()
  @Field(() => ProtectionCertActivationUpdateManyWithoutItemsInput, {
    nullable: true,
  })
  protectionCertActivationsProtectionCertActivationsItemIdToitems?: ProtectionCertActivationUpdateManyWithoutItemsInput;

  @ApiProperty({
    required: false,
    type: () => ProtectionCertActivationUpdateManyWithoutItemsInput,
  })
  @ValidateNested()
  @Type(() => ProtectionCertActivationUpdateManyWithoutItemsInput)
  @IsOptional()
  @Field(() => ProtectionCertActivationUpdateManyWithoutItemsInput, {
    nullable: true,
  })
  protectionCertActivationsProtectionCertActivationsReservedItemIdToitems?: ProtectionCertActivationUpdateManyWithoutItemsInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  rutaArchivo?: string | null;

  @ApiProperty({
    required: false,
    type: () => StockUpdateManyWithoutItemsInput,
  })
  @ValidateNested()
  @Type(() => StockUpdateManyWithoutItemsInput)
  @IsOptional()
  @Field(() => StockUpdateManyWithoutItemsInput, {
    nullable: true,
  })
  stock?: StockUpdateManyWithoutItemsInput;

  @ApiProperty({
    required: false,
    type: () => StockSeryUpdateManyWithoutItemsInput,
  })
  @ValidateNested()
  @Type(() => StockSeryUpdateManyWithoutItemsInput)
  @IsOptional()
  @Field(() => StockSeryUpdateManyWithoutItemsInput, {
    nullable: true,
  })
  stockSeries?: StockSeryUpdateManyWithoutItemsInput;

  @ApiProperty({
    required: false,
    enum: EnumItemTipoArt,
  })
  @IsEnum(EnumItemTipoArt)
  @IsOptional()
  @Field(() => EnumItemTipoArt, {
    nullable: true,
  })
  tipo_art?: "P" | "S";

  @ApiProperty({
    required: false,
    enum: EnumItemTipoInventario,
  })
  @IsEnum(EnumItemTipoInventario)
  @IsOptional()
  @Field(() => EnumItemTipoInventario, {
    nullable: true,
  })
  tipo_inventario?: "T" | "S";

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  updatedUserId?: number | null;
}

export { ItemUpdateInput as ItemUpdateInput };