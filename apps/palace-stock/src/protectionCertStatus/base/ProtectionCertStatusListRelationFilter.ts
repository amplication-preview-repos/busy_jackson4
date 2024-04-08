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
import { ProtectionCertStatusWhereInput } from "./ProtectionCertStatusWhereInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

@InputType()
class ProtectionCertStatusListRelationFilter {
  @ApiProperty({
    required: false,
    type: () => ProtectionCertStatusWhereInput,
  })
  @ValidateNested()
  @Type(() => ProtectionCertStatusWhereInput)
  @IsOptional()
  @Field(() => ProtectionCertStatusWhereInput, {
    nullable: true,
  })
  every?: ProtectionCertStatusWhereInput;

  @ApiProperty({
    required: false,
    type: () => ProtectionCertStatusWhereInput,
  })
  @ValidateNested()
  @Type(() => ProtectionCertStatusWhereInput)
  @IsOptional()
  @Field(() => ProtectionCertStatusWhereInput, {
    nullable: true,
  })
  some?: ProtectionCertStatusWhereInput;

  @ApiProperty({
    required: false,
    type: () => ProtectionCertStatusWhereInput,
  })
  @ValidateNested()
  @Type(() => ProtectionCertStatusWhereInput)
  @IsOptional()
  @Field(() => ProtectionCertStatusWhereInput, {
    nullable: true,
  })
  none?: ProtectionCertStatusWhereInput;
}
export { ProtectionCertStatusListRelationFilter as ProtectionCertStatusListRelationFilter };