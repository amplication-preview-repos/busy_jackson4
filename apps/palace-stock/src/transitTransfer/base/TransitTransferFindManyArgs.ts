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
import { TransitTransferWhereInput } from "./TransitTransferWhereInput";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { TransitTransferOrderByInput } from "./TransitTransferOrderByInput";

@ArgsType()
class TransitTransferFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => TransitTransferWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => TransitTransferWhereInput, { nullable: true })
  @Type(() => TransitTransferWhereInput)
  where?: TransitTransferWhereInput;

  @ApiProperty({
    required: false,
    type: [TransitTransferOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [TransitTransferOrderByInput], { nullable: true })
  @Type(() => TransitTransferOrderByInput)
  orderBy?: Array<TransitTransferOrderByInput>;

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

export { TransitTransferFindManyArgs as TransitTransferFindManyArgs };
