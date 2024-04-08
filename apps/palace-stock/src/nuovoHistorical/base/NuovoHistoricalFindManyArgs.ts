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
import { NuovoHistoricalWhereInput } from "./NuovoHistoricalWhereInput";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { NuovoHistoricalOrderByInput } from "./NuovoHistoricalOrderByInput";

@ArgsType()
class NuovoHistoricalFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => NuovoHistoricalWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => NuovoHistoricalWhereInput, { nullable: true })
  @Type(() => NuovoHistoricalWhereInput)
  where?: NuovoHistoricalWhereInput;

  @ApiProperty({
    required: false,
    type: [NuovoHistoricalOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [NuovoHistoricalOrderByInput], { nullable: true })
  @Type(() => NuovoHistoricalOrderByInput)
  orderBy?: Array<NuovoHistoricalOrderByInput>;

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

export { NuovoHistoricalFindManyArgs as NuovoHistoricalFindManyArgs };
