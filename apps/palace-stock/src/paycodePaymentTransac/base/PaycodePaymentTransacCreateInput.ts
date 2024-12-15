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
import { AirtimeRechargeCreateNestedManyWithoutPaycodePaymentTransacsInput } from "./AirtimeRechargeCreateNestedManyWithoutPaycodePaymentTransacsInput";
import {
  ValidateNested,
  IsOptional,
  IsString,
  IsDate,
  IsInt,
} from "class-validator";
import { Type } from "class-transformer";
import { FinancedSaleWhereUniqueInput } from "../../financedSale/base/FinancedSaleWhereUniqueInput";
import { PaycodeApiLogCreateNestedManyWithoutPaycodePaymentTransacsInput } from "./PaycodeApiLogCreateNestedManyWithoutPaycodePaymentTransacsInput";
import { PaycodeWebhookLogCreateNestedManyWithoutPaycodePaymentTransacsInput } from "./PaycodeWebhookLogCreateNestedManyWithoutPaycodePaymentTransacsInput";
import { PaymentCreateNestedManyWithoutPaycodePaymentTransacsInput } from "./PaymentCreateNestedManyWithoutPaycodePaymentTransacsInput";
import { RecurringPaymentCreateNestedManyWithoutPaycodePaymentTransacsInput } from "./RecurringPaymentCreateNestedManyWithoutPaycodePaymentTransacsInput";

@InputType()
class PaycodePaymentTransacCreateInput {
  @ApiProperty({
    required: false,
    type: () =>
      AirtimeRechargeCreateNestedManyWithoutPaycodePaymentTransacsInput,
  })
  @ValidateNested()
  @Type(() => AirtimeRechargeCreateNestedManyWithoutPaycodePaymentTransacsInput)
  @IsOptional()
  @Field(
    () => AirtimeRechargeCreateNestedManyWithoutPaycodePaymentTransacsInput,
    {
      nullable: true,
    }
  )
  airtimeRecharges?: AirtimeRechargeCreateNestedManyWithoutPaycodePaymentTransacsInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  bank?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  beneficiary?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  clabe?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  concept?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  datosPago?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  displayMessage?: string | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  estatusCobro!: string;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  fechaRegistro!: Date;

  @ApiProperty({
    required: true,
    type: () => FinancedSaleWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => FinancedSaleWhereUniqueInput)
  @Field(() => FinancedSaleWhereUniqueInput)
  financedSales!: FinancedSaleWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  habilitarPagoRecurrente?: number | null;

  @ApiProperty({
    required: false,
    type: () => PaycodeApiLogCreateNestedManyWithoutPaycodePaymentTransacsInput,
  })
  @ValidateNested()
  @Type(() => PaycodeApiLogCreateNestedManyWithoutPaycodePaymentTransacsInput)
  @IsOptional()
  @Field(
    () => PaycodeApiLogCreateNestedManyWithoutPaycodePaymentTransacsInput,
    {
      nullable: true,
    }
  )
  paycodeApiLog?: PaycodeApiLogCreateNestedManyWithoutPaycodePaymentTransacsInput;

  @ApiProperty({
    required: false,
    type: () =>
      PaycodeWebhookLogCreateNestedManyWithoutPaycodePaymentTransacsInput,
  })
  @ValidateNested()
  @Type(
    () => PaycodeWebhookLogCreateNestedManyWithoutPaycodePaymentTransacsInput
  )
  @IsOptional()
  @Field(
    () => PaycodeWebhookLogCreateNestedManyWithoutPaycodePaymentTransacsInput,
    {
      nullable: true,
    }
  )
  paycodeWebhookLog?: PaycodeWebhookLogCreateNestedManyWithoutPaycodePaymentTransacsInput;

  @ApiProperty({
    required: false,
    type: () => PaymentCreateNestedManyWithoutPaycodePaymentTransacsInput,
  })
  @ValidateNested()
  @Type(() => PaymentCreateNestedManyWithoutPaycodePaymentTransacsInput)
  @IsOptional()
  @Field(() => PaymentCreateNestedManyWithoutPaycodePaymentTransacsInput, {
    nullable: true,
  })
  payments?: PaymentCreateNestedManyWithoutPaycodePaymentTransacsInput;

  @ApiProperty({
    required: false,
    type: () =>
      RecurringPaymentCreateNestedManyWithoutPaycodePaymentTransacsInput,
  })
  @ValidateNested()
  @Type(
    () => RecurringPaymentCreateNestedManyWithoutPaycodePaymentTransacsInput
  )
  @IsOptional()
  @Field(
    () => RecurringPaymentCreateNestedManyWithoutPaycodePaymentTransacsInput,
    {
      nullable: true,
    }
  )
  recurringPayments?: RecurringPaymentCreateNestedManyWithoutPaycodePaymentTransacsInput;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  referenceNumber!: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  trackCode?: string | null;
}

export { PaycodePaymentTransacCreateInput as PaycodePaymentTransacCreateInput };
