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
  IsString,
  IsOptional,
  IsInt,
  IsNumber,
  IsDate,
  IsEnum,
  ValidateNested,
} from "class-validator";
import { Decimal } from "decimal.js";
import { Type } from "class-transformer";
import { EnumPurchasePaymentType } from "./EnumPurchasePaymentType";
import { EnumPurchasePriority } from "./EnumPurchasePriority";
import { EnumPurchaseStatusPurchase } from "./EnumPurchaseStatusPurchase";
import { UserModelWhereUniqueInput } from "../../userModel/base/UserModelWhereUniqueInput";
import { VendorWhereUniqueInput } from "../../vendor/base/VendorWhereUniqueInput";

@InputType()
class PurchaseUpdateInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  accountingDepartmentDescription?: string;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  accountingDepartmentId?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Float, {
    nullable: true,
  })
  amount?: Decimal;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  comments?: string | null;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  createdAt?: Date | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  items?: string;

  @ApiProperty({
    required: false,
    enum: EnumPurchasePaymentType,
  })
  @IsEnum(EnumPurchasePaymentType)
  @IsOptional()
  @Field(() => EnumPurchasePaymentType, {
    nullable: true,
  })
  payment_type?: "E" | "D" | "T" | "C";

  @ApiProperty({
    required: false,
    enum: EnumPurchasePriority,
  })
  @IsEnum(EnumPurchasePriority)
  @IsOptional()
  @Field(() => EnumPurchasePriority, {
    nullable: true,
  })
  priority?: "N" | "U" | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  requestCollaboratorId?: number;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  requestDepartmentDesc?: string;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  requestDepartmentId?: number;

  @ApiProperty({
    required: false,
    enum: EnumPurchaseStatusPurchase,
  })
  @IsEnum(EnumPurchaseStatusPurchase)
  @IsOptional()
  @Field(() => EnumPurchaseStatusPurchase, {
    nullable: true,
  })
  status_purchase?: "P" | "PA" | "CA" | "CD" | "PC" | "TP" | "C";

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  superiorCollaboratorId?: number;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  updatedAt?: Date | null;

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
  usersPurchasesCreatedUserIdTousers?: UserModelWhereUniqueInput | null;

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
  usersPurchasesUpdatedUserIdTousers?: UserModelWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: () => VendorWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => VendorWhereUniqueInput)
  @IsOptional()
  @Field(() => VendorWhereUniqueInput, {
    nullable: true,
  })
  vendors?: VendorWhereUniqueInput | null;
}

export { PurchaseUpdateInput as PurchaseUpdateInput };