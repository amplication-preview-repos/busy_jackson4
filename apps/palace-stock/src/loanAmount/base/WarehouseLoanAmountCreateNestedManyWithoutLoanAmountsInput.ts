/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field } from "@nestjs/graphql";
import { WarehouseLoanAmountWhereUniqueInput } from "../../warehouseLoanAmount/base/WarehouseLoanAmountWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class WarehouseLoanAmountCreateNestedManyWithoutLoanAmountsInput {
  @Field(() => [WarehouseLoanAmountWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [WarehouseLoanAmountWhereUniqueInput],
  })
  connect?: Array<WarehouseLoanAmountWhereUniqueInput>;
}

export { WarehouseLoanAmountCreateNestedManyWithoutLoanAmountsInput as WarehouseLoanAmountCreateNestedManyWithoutLoanAmountsInput };