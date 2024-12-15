/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field } from "@nestjs/graphql";
import { LoanedDeviceWhereUniqueInput } from "../../loanedDevice/base/LoanedDeviceWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class LoanedDeviceUpdateManyWithoutItemsInput {
  @Field(() => [LoanedDeviceWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [LoanedDeviceWhereUniqueInput],
  })
  connect?: Array<LoanedDeviceWhereUniqueInput>;

  @Field(() => [LoanedDeviceWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [LoanedDeviceWhereUniqueInput],
  })
  disconnect?: Array<LoanedDeviceWhereUniqueInput>;

  @Field(() => [LoanedDeviceWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [LoanedDeviceWhereUniqueInput],
  })
  set?: Array<LoanedDeviceWhereUniqueInput>;
}

export { LoanedDeviceUpdateManyWithoutItemsInput as LoanedDeviceUpdateManyWithoutItemsInput };
