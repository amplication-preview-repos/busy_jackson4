/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field } from "@nestjs/graphql";
import { TransitTransferWhereUniqueInput } from "../../transitTransfer/base/TransitTransferWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class TransitTransferUpdateManyWithoutTransactionsInput {
  @Field(() => [TransitTransferWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [TransitTransferWhereUniqueInput],
  })
  connect?: Array<TransitTransferWhereUniqueInput>;

  @Field(() => [TransitTransferWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [TransitTransferWhereUniqueInput],
  })
  disconnect?: Array<TransitTransferWhereUniqueInput>;

  @Field(() => [TransitTransferWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [TransitTransferWhereUniqueInput],
  })
  set?: Array<TransitTransferWhereUniqueInput>;
}

export { TransitTransferUpdateManyWithoutTransactionsInput as TransitTransferUpdateManyWithoutTransactionsInput };