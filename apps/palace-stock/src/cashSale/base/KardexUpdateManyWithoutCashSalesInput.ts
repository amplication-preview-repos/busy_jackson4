/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field } from "@nestjs/graphql";
import { KardexWhereUniqueInput } from "../../kardex/base/KardexWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class KardexUpdateManyWithoutCashSalesInput {
  @Field(() => [KardexWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [KardexWhereUniqueInput],
  })
  connect?: Array<KardexWhereUniqueInput>;

  @Field(() => [KardexWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [KardexWhereUniqueInput],
  })
  disconnect?: Array<KardexWhereUniqueInput>;

  @Field(() => [KardexWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [KardexWhereUniqueInput],
  })
  set?: Array<KardexWhereUniqueInput>;
}

export { KardexUpdateManyWithoutCashSalesInput as KardexUpdateManyWithoutCashSalesInput };
