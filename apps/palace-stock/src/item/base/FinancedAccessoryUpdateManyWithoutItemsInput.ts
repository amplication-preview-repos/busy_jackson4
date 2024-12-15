/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field } from "@nestjs/graphql";
import { FinancedAccessoryWhereUniqueInput } from "../../financedAccessory/base/FinancedAccessoryWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class FinancedAccessoryUpdateManyWithoutItemsInput {
  @Field(() => [FinancedAccessoryWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [FinancedAccessoryWhereUniqueInput],
  })
  connect?: Array<FinancedAccessoryWhereUniqueInput>;

  @Field(() => [FinancedAccessoryWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [FinancedAccessoryWhereUniqueInput],
  })
  disconnect?: Array<FinancedAccessoryWhereUniqueInput>;

  @Field(() => [FinancedAccessoryWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [FinancedAccessoryWhereUniqueInput],
  })
  set?: Array<FinancedAccessoryWhereUniqueInput>;
}

export { FinancedAccessoryUpdateManyWithoutItemsInput as FinancedAccessoryUpdateManyWithoutItemsInput };
