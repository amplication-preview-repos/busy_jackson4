/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsOptional,
  IsEnum,
  IsInt,
  ValidateNested,
} from "class-validator";
import { EnumStockSeryEstatusBloqueo } from "./EnumStockSeryEstatusBloqueo";
import { EnumStockSeryEstatusSerie } from "./EnumStockSeryEstatusSerie";
import { Item } from "../../item/base/Item";
import { Type } from "class-transformer";
import { Warehouse } from "../../warehouse/base/Warehouse";

@ObjectType()
class StockSery {
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
    enum: EnumStockSeryEstatusBloqueo,
  })
  @IsEnum(EnumStockSeryEstatusBloqueo)
  @IsOptional()
  @Field(() => EnumStockSeryEstatusBloqueo, {
    nullable: true,
  })
  estatus_bloqueo?: "A" | "B" | "DI" | null;

  @ApiProperty({
    required: true,
    enum: EnumStockSeryEstatusSerie,
  })
  @IsEnum(EnumStockSeryEstatusSerie)
  @Field(() => EnumStockSeryEstatusSerie, {
    nullable: true,
  })
  estatus_serie?: "DI" | "VE" | "BA" | "TR" | "PR" | "AP";

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  id!: number;

  @ApiProperty({
    required: true,
    type: () => Item,
  })
  @ValidateNested()
  @Type(() => Item)
  items?: Item;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  otraSerie!: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  proveedorBloqueo!: string | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  serialCode!: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  serieEnrolada!: string | null;

  @ApiProperty({
    required: true,
    type: () => Warehouse,
  })
  @ValidateNested()
  @Type(() => Warehouse)
  warehouses?: Warehouse;
}

export { StockSery as StockSery };
