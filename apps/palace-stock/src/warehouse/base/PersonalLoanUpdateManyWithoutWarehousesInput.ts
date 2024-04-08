/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field } from "@nestjs/graphql";
import { PersonalLoanWhereUniqueInput } from "../../personalLoan/base/PersonalLoanWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class PersonalLoanUpdateManyWithoutWarehousesInput {
  @Field(() => [PersonalLoanWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [PersonalLoanWhereUniqueInput],
  })
  connect?: Array<PersonalLoanWhereUniqueInput>;

  @Field(() => [PersonalLoanWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [PersonalLoanWhereUniqueInput],
  })
  disconnect?: Array<PersonalLoanWhereUniqueInput>;

  @Field(() => [PersonalLoanWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [PersonalLoanWhereUniqueInput],
  })
  set?: Array<PersonalLoanWhereUniqueInput>;
}

export { PersonalLoanUpdateManyWithoutWarehousesInput as PersonalLoanUpdateManyWithoutWarehousesInput };
