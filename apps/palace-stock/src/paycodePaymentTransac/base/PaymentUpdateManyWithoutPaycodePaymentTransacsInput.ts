/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field } from "@nestjs/graphql";
import { PaymentWhereUniqueInput } from "../../payment/base/PaymentWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class PaymentUpdateManyWithoutPaycodePaymentTransacsInput {
  @Field(() => [PaymentWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [PaymentWhereUniqueInput],
  })
  connect?: Array<PaymentWhereUniqueInput>;

  @Field(() => [PaymentWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [PaymentWhereUniqueInput],
  })
  disconnect?: Array<PaymentWhereUniqueInput>;

  @Field(() => [PaymentWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [PaymentWhereUniqueInput],
  })
  set?: Array<PaymentWhereUniqueInput>;
}

export { PaymentUpdateManyWithoutPaycodePaymentTransacsInput as PaymentUpdateManyWithoutPaycodePaymentTransacsInput };
