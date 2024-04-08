/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { MandatoryDocumentWhereUniqueInput } from "../../mandatoryDocument/base/MandatoryDocumentWhereUniqueInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { WarehouseWhereUniqueInput } from "../../warehouse/base/WarehouseWhereUniqueInput";

@InputType()
class WarehouseMandatoryDocUpdateInput {
  @ApiProperty({
    required: false,
    type: () => MandatoryDocumentWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => MandatoryDocumentWhereUniqueInput)
  @IsOptional()
  @Field(() => MandatoryDocumentWhereUniqueInput, {
    nullable: true,
  })
  mandatoryDocuments?: MandatoryDocumentWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: () => WarehouseWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => WarehouseWhereUniqueInput)
  @IsOptional()
  @Field(() => WarehouseWhereUniqueInput, {
    nullable: true,
  })
  warehouses?: WarehouseWhereUniqueInput;
}

export { WarehouseMandatoryDocUpdateInput as WarehouseMandatoryDocUpdateInput };