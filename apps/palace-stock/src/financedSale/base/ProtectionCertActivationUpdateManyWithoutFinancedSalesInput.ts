/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field } from "@nestjs/graphql";
import { ProtectionCertActivationWhereUniqueInput } from "../../protectionCertActivation/base/ProtectionCertActivationWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class ProtectionCertActivationUpdateManyWithoutFinancedSalesInput {
  @Field(() => [ProtectionCertActivationWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [ProtectionCertActivationWhereUniqueInput],
  })
  connect?: Array<ProtectionCertActivationWhereUniqueInput>;

  @Field(() => [ProtectionCertActivationWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [ProtectionCertActivationWhereUniqueInput],
  })
  disconnect?: Array<ProtectionCertActivationWhereUniqueInput>;

  @Field(() => [ProtectionCertActivationWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [ProtectionCertActivationWhereUniqueInput],
  })
  set?: Array<ProtectionCertActivationWhereUniqueInput>;
}

export { ProtectionCertActivationUpdateManyWithoutFinancedSalesInput as ProtectionCertActivationUpdateManyWithoutFinancedSalesInput };
