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
import { ProtectionCertWhereInput } from "./ProtectionCertWhereInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

@InputType()
class ProtectionCertListRelationFilter {
  @ApiProperty({
    required: false,
    type: () => ProtectionCertWhereInput,
  })
  @ValidateNested()
  @Type(() => ProtectionCertWhereInput)
  @IsOptional()
  @Field(() => ProtectionCertWhereInput, {
    nullable: true,
  })
  every?: ProtectionCertWhereInput;

  @ApiProperty({
    required: false,
    type: () => ProtectionCertWhereInput,
  })
  @ValidateNested()
  @Type(() => ProtectionCertWhereInput)
  @IsOptional()
  @Field(() => ProtectionCertWhereInput, {
    nullable: true,
  })
  some?: ProtectionCertWhereInput;

  @ApiProperty({
    required: false,
    type: () => ProtectionCertWhereInput,
  })
  @ValidateNested()
  @Type(() => ProtectionCertWhereInput)
  @IsOptional()
  @Field(() => ProtectionCertWhereInput, {
    nullable: true,
  })
  none?: ProtectionCertWhereInput;
}
export { ProtectionCertListRelationFilter as ProtectionCertListRelationFilter };