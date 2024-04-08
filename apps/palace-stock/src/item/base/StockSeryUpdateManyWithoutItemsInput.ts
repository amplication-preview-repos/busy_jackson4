/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field } from "@nestjs/graphql";
import { StockSeryWhereUniqueInput } from "../../stockSery/base/StockSeryWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class StockSeryUpdateManyWithoutItemsInput {
  @Field(() => [StockSeryWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [StockSeryWhereUniqueInput],
  })
  connect?: Array<StockSeryWhereUniqueInput>;

  @Field(() => [StockSeryWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [StockSeryWhereUniqueInput],
  })
  disconnect?: Array<StockSeryWhereUniqueInput>;

  @Field(() => [StockSeryWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [StockSeryWhereUniqueInput],
  })
  set?: Array<StockSeryWhereUniqueInput>;
}

export { StockSeryUpdateManyWithoutItemsInput as StockSeryUpdateManyWithoutItemsInput };
