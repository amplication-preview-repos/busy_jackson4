/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field } from "@nestjs/graphql";
import { EstimateWhereUniqueInput } from "../../estimate/base/EstimateWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class EstimateUpdateManyWithoutWarehousesInput {
  @Field(() => [EstimateWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [EstimateWhereUniqueInput],
  })
  connect?: Array<EstimateWhereUniqueInput>;

  @Field(() => [EstimateWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [EstimateWhereUniqueInput],
  })
  disconnect?: Array<EstimateWhereUniqueInput>;

  @Field(() => [EstimateWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [EstimateWhereUniqueInput],
  })
  set?: Array<EstimateWhereUniqueInput>;
}

export { EstimateUpdateManyWithoutWarehousesInput as EstimateUpdateManyWithoutWarehousesInput };