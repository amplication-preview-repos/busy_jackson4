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
  IsDate,
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
} from "class-validator";
import { Type } from "class-transformer";
import { Decimal } from "decimal.js";
import { EnumNuovoHistoricalLocked } from "./EnumNuovoHistoricalLocked";
import { EnumNuovoHistoricalState } from "./EnumNuovoHistoricalState";

@InputType()
class NuovoHistoricalCreateInput {
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  deviceId!: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  imeiNo?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  imeiNo2?: string | null;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  lastConnectedAt?: Date | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  locationAddress?: string | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Float, {
    nullable: true,
  })
  locationLatitude?: Decimal | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Float, {
    nullable: true,
  })
  locationLongitude?: Decimal | null;

  @ApiProperty({
    required: true,
    enum: EnumNuovoHistoricalLocked,
  })
  @IsEnum(EnumNuovoHistoricalLocked)
  @Field(() => EnumNuovoHistoricalLocked)
  locked!: "T" | "F";

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  make!: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  model!: string;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  nextLockDate?: Date | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  serialNo?: string | null;

  @ApiProperty({
    required: false,
    enum: EnumNuovoHistoricalState,
  })
  @IsEnum(EnumNuovoHistoricalState)
  @IsOptional()
  @Field(() => EnumNuovoHistoricalState, {
    nullable: true,
  })
  state?: "A" | "I" | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  status!: string;
}

export { NuovoHistoricalCreateInput as NuovoHistoricalCreateInput };