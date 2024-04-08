/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field } from "@nestjs/graphql";
import { CashSaleWhereUniqueInput } from "../../cashSale/base/CashSaleWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class CashSaleUpdateManyWithoutWarehousesInput {
  @Field(() => [CashSaleWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [CashSaleWhereUniqueInput],
  })
  connect?: Array<CashSaleWhereUniqueInput>;

  @Field(() => [CashSaleWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [CashSaleWhereUniqueInput],
  })
  disconnect?: Array<CashSaleWhereUniqueInput>;

  @Field(() => [CashSaleWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [CashSaleWhereUniqueInput],
  })
  set?: Array<CashSaleWhereUniqueInput>;
}

export { CashSaleUpdateManyWithoutWarehousesInput as CashSaleUpdateManyWithoutWarehousesInput };