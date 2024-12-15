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
import { DocumentTypeWhereUniqueInput } from "../../documentType/base/DocumentTypeWhereUniqueInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { IntFilter } from "../../util/IntFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { WarehouseMandatoryDocListRelationFilter } from "../../warehouseMandatoryDoc/base/WarehouseMandatoryDocListRelationFilter";

@InputType()
class MandatoryDocumentWhereInput {
  @ApiProperty({
    required: false,
    type: () => DocumentTypeWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => DocumentTypeWhereUniqueInput)
  @IsOptional()
  @Field(() => DocumentTypeWhereUniqueInput, {
    nullable: true,
  })
  documentTypes?: DocumentTypeWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: IntFilter,
  })
  @Type(() => IntFilter)
  @IsOptional()
  @Field(() => IntFilter, {
    nullable: true,
  })
  id?: IntFilter;

  @ApiProperty({
    required: false,
    type: StringNullableFilter,
  })
  @Type(() => StringNullableFilter)
  @IsOptional()
  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  processType?: StringNullableFilter;

  @ApiProperty({
    required: false,
    type: StringNullableFilter,
  })
  @Type(() => StringNullableFilter)
  @IsOptional()
  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  relationship?: StringNullableFilter;

  @ApiProperty({
    required: false,
    type: () => WarehouseMandatoryDocListRelationFilter,
  })
  @ValidateNested()
  @Type(() => WarehouseMandatoryDocListRelationFilter)
  @IsOptional()
  @Field(() => WarehouseMandatoryDocListRelationFilter, {
    nullable: true,
  })
  warehouseMandatoryDocs?: WarehouseMandatoryDocListRelationFilter;
}

export { MandatoryDocumentWhereInput as MandatoryDocumentWhereInput };
