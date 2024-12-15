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
import { EnumEstimateAspiraOtroProducto } from "./EnumEstimateAspiraOtroProducto";
import { IsEnum, IsOptional, ValidateNested } from "class-validator";
import { EnumEstimateAutorizaContacto } from "./EnumEstimateAutorizaContacto";
import { IntFilter } from "../../util/IntFilter";
import { Type } from "class-transformer";
import { DecimalFilter } from "../../util/DecimalFilter";
import { DateTimeFilter } from "../../util/DateTimeFilter";
import { ItemWhereUniqueInput } from "../../item/base/ItemWhereUniqueInput";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { DecimalNullableFilter } from "../../util/DecimalNullableFilter";
import { EnumEstimatePlazo } from "./EnumEstimatePlazo";
import { EnumEstimateRechazoFinanc } from "./EnumEstimateRechazoFinanc";
import { WarehouseWhereUniqueInput } from "../../warehouse/base/WarehouseWhereUniqueInput";

@InputType()
class EstimateWhereInput {
  @ApiProperty({
    required: false,
    enum: EnumEstimateAspiraOtroProducto,
  })
  @IsEnum(EnumEstimateAspiraOtroProducto)
  @IsOptional()
  @Field(() => EnumEstimateAspiraOtroProducto, {
    nullable: true,
  })
  aspira_otro_producto?: "N" | "S";

  @ApiProperty({
    required: false,
    enum: EnumEstimateAutorizaContacto,
  })
  @IsEnum(EnumEstimateAutorizaContacto)
  @IsOptional()
  @Field(() => EnumEstimateAutorizaContacto, {
    nullable: true,
  })
  autoriza_contacto?: "N" | "S";

  @ApiProperty({
    required: false,
    type: IntFilter,
  })
  @Type(() => IntFilter)
  @IsOptional()
  @Field(() => IntFilter, {
    nullable: true,
  })
  createdUserId?: IntFilter;

  @ApiProperty({
    required: false,
    type: IntFilter,
  })
  @Type(() => IntFilter)
  @IsOptional()
  @Field(() => IntFilter, {
    nullable: true,
  })
  desctoPagoOportuno?: IntFilter;

  @ApiProperty({
    required: false,
    type: DecimalFilter,
  })
  @Type(() => DecimalFilter)
  @IsOptional()
  @Field(() => DecimalFilter, {
    nullable: true,
  })
  enganche?: DecimalFilter;

  @ApiProperty({
    required: false,
    type: DateTimeFilter,
  })
  @Type(() => DateTimeFilter)
  @IsOptional()
  @Field(() => DateTimeFilter, {
    nullable: true,
  })
  fechaCotiz?: DateTimeFilter;

  @ApiProperty({
    required: false,
    type: IntFilter,
  })
  @Type(() => IntFilter)
  @IsOptional()
  @Field(() => IntFilter, {
    nullable: true,
  })
  id?: IntFilter;

  @ApiProperty({
    required: false,
    type: DecimalFilter,
  })
  @Type(() => DecimalFilter)
  @IsOptional()
  @Field(() => DecimalFilter, {
    nullable: true,
  })
  interesAnual?: DecimalFilter;

  @ApiProperty({
    required: false,
    type: DecimalFilter,
  })
  @Type(() => DecimalFilter)
  @IsOptional()
  @Field(() => DecimalFilter, {
    nullable: true,
  })
  interesSemanalMultiplo?: DecimalFilter;

  @ApiProperty({
    required: false,
    type: () => ItemWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ItemWhereUniqueInput)
  @IsOptional()
  @Field(() => ItemWhereUniqueInput, {
    nullable: true,
  })
  items?: ItemWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: DecimalFilter,
  })
  @Type(() => DecimalFilter)
  @IsOptional()
  @Field(() => DecimalFilter, {
    nullable: true,
  })
  montoPago?: DecimalFilter;

  @ApiProperty({
    required: false,
    type: StringNullableFilter,
  })
  @Type(() => StringNullableFilter)
  @IsOptional()
  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  motivoRechazo?: StringNullableFilter;

  @ApiProperty({
    required: false,
    type: StringFilter,
  })
  @Type(() => StringFilter)
  @IsOptional()
  @Field(() => StringFilter, {
    nullable: true,
  })
  nombreCompletoCliente?: StringFilter;

  @ApiProperty({
    required: false,
    type: IntFilter,
  })
  @Type(() => IntFilter)
  @IsOptional()
  @Field(() => IntFilter, {
    nullable: true,
  })
  numPagos?: IntFilter;

  @ApiProperty({
    required: false,
    type: StringNullableFilter,
  })
  @Type(() => StringNullableFilter)
  @IsOptional()
  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  observacionesCotizacion?: StringNullableFilter;

  @ApiProperty({
    required: false,
    type: DecimalNullableFilter,
  })
  @Type(() => DecimalNullableFilter)
  @IsOptional()
  @Field(() => DecimalNullableFilter, {
    nullable: true,
  })
  pagoSemanalIdeal?: DecimalNullableFilter;

  @ApiProperty({
    required: false,
    enum: EnumEstimatePlazo,
  })
  @IsEnum(EnumEstimatePlazo)
  @IsOptional()
  @Field(() => EnumEstimatePlazo, {
    nullable: true,
  })
  plazo?: "S" | "Q";

  @ApiProperty({
    required: false,
    type: DecimalNullableFilter,
  })
  @Type(() => DecimalNullableFilter)
  @IsOptional()
  @Field(() => DecimalNullableFilter, {
    nullable: true,
  })
  precioLista?: DecimalNullableFilter;

  @ApiProperty({
    required: false,
    type: StringNullableFilter,
  })
  @Type(() => StringNullableFilter)
  @IsOptional()
  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  productoInteres?: StringNullableFilter;

  @ApiProperty({
    required: false,
    enum: EnumEstimateRechazoFinanc,
  })
  @IsEnum(EnumEstimateRechazoFinanc)
  @IsOptional()
  @Field(() => EnumEstimateRechazoFinanc, {
    nullable: true,
  })
  rechazo_financ?: "N" | "S";

  @ApiProperty({
    required: false,
    type: StringFilter,
  })
  @Type(() => StringFilter)
  @IsOptional()
  @Field(() => StringFilter, {
    nullable: true,
  })
  telefonoCliente?: StringFilter;

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

export { EstimateWhereInput as EstimateWhereInput };
