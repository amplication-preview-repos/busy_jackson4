/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { KardexSeryWhereInput } from "./KardexSeryWhereInput";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { KardexSeryOrderByInput } from "./KardexSeryOrderByInput";

@ArgsType()
class KardexSeryFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => KardexSeryWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => KardexSeryWhereInput, { nullable: true })
  @Type(() => KardexSeryWhereInput)
  where?: KardexSeryWhereInput;

  @ApiProperty({
    required: false,
    type: [KardexSeryOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [KardexSeryOrderByInput], { nullable: true })
  @Type(() => KardexSeryOrderByInput)
  orderBy?: Array<KardexSeryOrderByInput>;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { KardexSeryFindManyArgs as KardexSeryFindManyArgs };
