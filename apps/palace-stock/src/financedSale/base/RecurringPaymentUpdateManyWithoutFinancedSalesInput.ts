/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field } from "@nestjs/graphql";
import { RecurringPaymentWhereUniqueInput } from "../../recurringPayment/base/RecurringPaymentWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class RecurringPaymentUpdateManyWithoutFinancedSalesInput {
  @Field(() => [RecurringPaymentWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [RecurringPaymentWhereUniqueInput],
  })
  connect?: Array<RecurringPaymentWhereUniqueInput>;

  @Field(() => [RecurringPaymentWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [RecurringPaymentWhereUniqueInput],
  })
  disconnect?: Array<RecurringPaymentWhereUniqueInput>;

  @Field(() => [RecurringPaymentWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [RecurringPaymentWhereUniqueInput],
  })
  set?: Array<RecurringPaymentWhereUniqueInput>;
}

export { RecurringPaymentUpdateManyWithoutFinancedSalesInput as RecurringPaymentUpdateManyWithoutFinancedSalesInput };
