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
import { TransacErrorWhereInput } from "./TransacErrorWhereInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

@InputType()
class TransacErrorListRelationFilter {
  @ApiProperty({
    required: false,
    type: () => TransacErrorWhereInput,
  })
  @ValidateNested()
  @Type(() => TransacErrorWhereInput)
  @IsOptional()
  @Field(() => TransacErrorWhereInput, {
    nullable: true,
  })
  every?: TransacErrorWhereInput;

  @ApiProperty({
    required: false,
    type: () => TransacErrorWhereInput,
  })
  @ValidateNested()
  @Type(() => TransacErrorWhereInput)
  @IsOptional()
  @Field(() => TransacErrorWhereInput, {
    nullable: true,
  })
  some?: TransacErrorWhereInput;

  @ApiProperty({
    required: false,
    type: () => TransacErrorWhereInput,
  })
  @ValidateNested()
  @Type(() => TransacErrorWhereInput)
  @IsOptional()
  @Field(() => TransacErrorWhereInput, {
    nullable: true,
  })
  none?: TransacErrorWhereInput;
}
export { TransacErrorListRelationFilter as TransacErrorListRelationFilter };
