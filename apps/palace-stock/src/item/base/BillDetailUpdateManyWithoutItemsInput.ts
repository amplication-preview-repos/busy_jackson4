/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field } from "@nestjs/graphql";
import { BillDetailWhereUniqueInput } from "../../billDetail/base/BillDetailWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class BillDetailUpdateManyWithoutItemsInput {
  @Field(() => [BillDetailWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [BillDetailWhereUniqueInput],
  })
  connect?: Array<BillDetailWhereUniqueInput>;

  @Field(() => [BillDetailWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [BillDetailWhereUniqueInput],
  })
  disconnect?: Array<BillDetailWhereUniqueInput>;

  @Field(() => [BillDetailWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [BillDetailWhereUniqueInput],
  })
  set?: Array<BillDetailWhereUniqueInput>;
}

export { BillDetailUpdateManyWithoutItemsInput as BillDetailUpdateManyWithoutItemsInput };