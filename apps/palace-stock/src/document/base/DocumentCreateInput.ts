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
import { CollaboratorWhereUniqueInput } from "../../collaborator/base/CollaboratorWhereUniqueInput";
import {
  ValidateNested,
  IsOptional,
  IsString,
  IsInt,
  IsEnum,
  IsBoolean,
  IsDate,
} from "class-validator";
import { Type } from "class-transformer";
import { CustomerWhereUniqueInput } from "../../customer/base/CustomerWhereUniqueInput";
import { EnumDocumentEstatus } from "./EnumDocumentEstatus";
import { FinancedSaleWhereUniqueInput } from "../../financedSale/base/FinancedSaleWhereUniqueInput";
import { PaymentWhereUniqueInput } from "../../payment/base/PaymentWhereUniqueInput";

@InputType()
class DocumentCreateInput {
  @ApiProperty({
    required: false,
    type: () => CollaboratorWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CollaboratorWhereUniqueInput)
  @IsOptional()
  @Field(() => CollaboratorWhereUniqueInput, {
    nullable: true,
  })
  collaborators?: CollaboratorWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: () => CustomerWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CustomerWhereUniqueInput)
  @IsOptional()
  @Field(() => CustomerWhereUniqueInput, {
    nullable: true,
  })
  customers?: CustomerWhereUniqueInput | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  direccion!: string;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  documentTypeId?: number | null;

  @ApiProperty({
    required: true,
    enum: EnumDocumentEstatus,
  })
  @IsEnum(EnumDocumentEstatus)
  @Field(() => EnumDocumentEstatus)
  estatus!: "A" | "I";

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
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  idCertProtecAct?: number | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  idFicha?: number | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  nombreOriginal?: string | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  numTicket?: number | null;

  @ApiProperty({
    required: false,
    type: () => PaymentWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => PaymentWhereUniqueInput)
  @IsOptional()
  @Field(() => PaymentWhereUniqueInput, {
    nullable: true,
  })
  payments?: PaymentWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
  })
  validado?: boolean | null;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  validatedAt?: Date | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  validationUserId?: number | null;
}

export { DocumentCreateInput as DocumentCreateInput };
