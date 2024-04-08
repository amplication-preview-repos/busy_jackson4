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
import { IsString, IsOptional, IsEnum, IsInt, IsNumber } from "class-validator";
import { EnumPromotionHabilitado } from "./EnumPromotionHabilitado";
import { Decimal } from "decimal.js";
import { EnumPromotionTipoDescuento } from "./EnumPromotionTipoDescuento";

@ObjectType()
class Promotion {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  descripccionDescuento!: string | null;

  @ApiProperty({
    required: true,
    enum: EnumPromotionHabilitado,
  })
  @IsEnum(EnumPromotionHabilitado)
  @Field(() => EnumPromotionHabilitado, {
    nullable: true,
  })
  habilitado?: "H" | "I";

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  id!: number;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  @Field(() => Float)
  montoDescuento!: Decimal;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  opcionesDescuento!: string | null;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  @Field(() => Float)
  porcentajeDescuento!: Decimal;

  @ApiProperty({
    required: true,
    enum: EnumPromotionTipoDescuento,
  })
  @IsEnum(EnumPromotionTipoDescuento)
  @Field(() => EnumPromotionTipoDescuento, {
    nullable: true,
  })
  tipo_descuento?: "P" | "E";
}

export { Promotion as Promotion };