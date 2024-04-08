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
import { AccessLevelWhereUniqueInput } from "../../accessLevel/base/AccessLevelWhereUniqueInput";
import {
  ValidateNested,
  IsOptional,
  IsEnum,
  IsInt,
  IsString,
} from "class-validator";
import { Type } from "class-transformer";
import { BranchManagerUpdateManyWithoutUserModelsInput } from "./BranchManagerUpdateManyWithoutUserModelsInput";
import { BranchOfficeUpdateManyWithoutUserModelsInput } from "./BranchOfficeUpdateManyWithoutUserModelsInput";
import { CollaboratorUpdateManyWithoutUserModelsInput } from "./CollaboratorUpdateManyWithoutUserModelsInput";
import { CollaboratorWhereUniqueInput } from "../../collaborator/base/CollaboratorWhereUniqueInput";
import { ConektaPaymentTransacUpdateManyWithoutUserModelsInput } from "./ConektaPaymentTransacUpdateManyWithoutUserModelsInput";
import { CustomerUpdateManyWithoutUserModelsInput } from "./CustomerUpdateManyWithoutUserModelsInput";
import { EnumUserModelEstatusUsuario } from "./EnumUserModelEstatusUsuario";
import { LoanedDeviceUpdateManyWithoutUserModelsInput } from "./LoanedDeviceUpdateManyWithoutUserModelsInput";
import { ModifiedPermissionUpdateManyWithoutUserModelsInput } from "./ModifiedPermissionUpdateManyWithoutUserModelsInput";
import { NubariumValidationUpdateManyWithoutUserModelsInput } from "./NubariumValidationUpdateManyWithoutUserModelsInput";
import { PersonalLoanUpdateManyWithoutUserModelsInput } from "./PersonalLoanUpdateManyWithoutUserModelsInput";
import { ProtectionCertUpdateManyWithoutUserModelsInput } from "./ProtectionCertUpdateManyWithoutUserModelsInput";
import { PurchaseUpdateManyWithoutUserModelsInput } from "./PurchaseUpdateManyWithoutUserModelsInput";
import { UserPermissionUpdateManyWithoutUserModelsInput } from "./UserPermissionUpdateManyWithoutUserModelsInput";
import { UserQualityHistoryUpdateManyWithoutUserModelsInput } from "./UserQualityHistoryUpdateManyWithoutUserModelsInput";
import { VendorUpdateManyWithoutUserModelsInput } from "./VendorUpdateManyWithoutUserModelsInput";
import { WarehouseGrantUpdateManyWithoutUserModelsInput } from "./WarehouseGrantUpdateManyWithoutUserModelsInput";

@InputType()
class UserModelUpdateInput {
  @ApiProperty({
    required: false,
    type: () => AccessLevelWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => AccessLevelWhereUniqueInput)
  @IsOptional()
  @Field(() => AccessLevelWhereUniqueInput, {
    nullable: true,
  })
  accessLevels?: AccessLevelWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: () => BranchManagerUpdateManyWithoutUserModelsInput,
  })
  @ValidateNested()
  @Type(() => BranchManagerUpdateManyWithoutUserModelsInput)
  @IsOptional()
  @Field(() => BranchManagerUpdateManyWithoutUserModelsInput, {
    nullable: true,
  })
  branchManagers?: BranchManagerUpdateManyWithoutUserModelsInput;

  @ApiProperty({
    required: false,
    type: () => BranchOfficeUpdateManyWithoutUserModelsInput,
  })
  @ValidateNested()
  @Type(() => BranchOfficeUpdateManyWithoutUserModelsInput)
  @IsOptional()
  @Field(() => BranchOfficeUpdateManyWithoutUserModelsInput, {
    nullable: true,
  })
  branchOffices?: BranchOfficeUpdateManyWithoutUserModelsInput;

  @ApiProperty({
    required: false,
    type: () => CollaboratorUpdateManyWithoutUserModelsInput,
  })
  @ValidateNested()
  @Type(() => CollaboratorUpdateManyWithoutUserModelsInput)
  @IsOptional()
  @Field(() => CollaboratorUpdateManyWithoutUserModelsInput, {
    nullable: true,
  })
  collaboratorsCollaboratorsCreatedUserIdTousers?: CollaboratorUpdateManyWithoutUserModelsInput;

  @ApiProperty({
    required: false,
    type: () => CollaboratorWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CollaboratorWhereUniqueInput)
  @IsOptional()
  @Field(() => CollaboratorWhereUniqueInput, {
    nullable: true,
  })
  collaboratorsUsersCollaboratorIdTocollaborators?: CollaboratorWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: () => ConektaPaymentTransacUpdateManyWithoutUserModelsInput,
  })
  @ValidateNested()
  @Type(() => ConektaPaymentTransacUpdateManyWithoutUserModelsInput)
  @IsOptional()
  @Field(() => ConektaPaymentTransacUpdateManyWithoutUserModelsInput, {
    nullable: true,
  })
  conektaPaymentTransacs?: ConektaPaymentTransacUpdateManyWithoutUserModelsInput;

  @ApiProperty({
    required: false,
    type: () => CustomerUpdateManyWithoutUserModelsInput,
  })
  @ValidateNested()
  @Type(() => CustomerUpdateManyWithoutUserModelsInput)
  @IsOptional()
  @Field(() => CustomerUpdateManyWithoutUserModelsInput, {
    nullable: true,
  })
  customersCustomersCreatedUserIdTousers?: CustomerUpdateManyWithoutUserModelsInput;

  @ApiProperty({
    required: false,
    type: () => CustomerUpdateManyWithoutUserModelsInput,
  })
  @ValidateNested()
  @Type(() => CustomerUpdateManyWithoutUserModelsInput)
  @IsOptional()
  @Field(() => CustomerUpdateManyWithoutUserModelsInput, {
    nullable: true,
  })
  customersCustomersUpdatedUserIdTousers?: CustomerUpdateManyWithoutUserModelsInput;

  @ApiProperty({
    required: false,
    enum: EnumUserModelEstatusUsuario,
  })
  @IsEnum(EnumUserModelEstatusUsuario)
  @IsOptional()
  @Field(() => EnumUserModelEstatusUsuario, {
    nullable: true,
  })
  estatus_usuario?: "A" | "I";

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  idColabRegistroUsuario?: number;

  @ApiProperty({
    required: false,
    type: () => LoanedDeviceUpdateManyWithoutUserModelsInput,
  })
  @ValidateNested()
  @Type(() => LoanedDeviceUpdateManyWithoutUserModelsInput)
  @IsOptional()
  @Field(() => LoanedDeviceUpdateManyWithoutUserModelsInput, {
    nullable: true,
  })
  loanedDevicesLoanedDevicesCreatedUserIdTousers?: LoanedDeviceUpdateManyWithoutUserModelsInput;

  @ApiProperty({
    required: false,
    type: () => LoanedDeviceUpdateManyWithoutUserModelsInput,
  })
  @ValidateNested()
  @Type(() => LoanedDeviceUpdateManyWithoutUserModelsInput)
  @IsOptional()
  @Field(() => LoanedDeviceUpdateManyWithoutUserModelsInput, {
    nullable: true,
  })
  loanedDevicesLoanedDevicesReturnedUserIdTousers?: LoanedDeviceUpdateManyWithoutUserModelsInput;

  @ApiProperty({
    required: false,
    type: () => ModifiedPermissionUpdateManyWithoutUserModelsInput,
  })
  @ValidateNested()
  @Type(() => ModifiedPermissionUpdateManyWithoutUserModelsInput)
  @IsOptional()
  @Field(() => ModifiedPermissionUpdateManyWithoutUserModelsInput, {
    nullable: true,
  })
  modifiedPermissions?: ModifiedPermissionUpdateManyWithoutUserModelsInput;

  @ApiProperty({
    required: false,
    type: () => NubariumValidationUpdateManyWithoutUserModelsInput,
  })
  @ValidateNested()
  @Type(() => NubariumValidationUpdateManyWithoutUserModelsInput)
  @IsOptional()
  @Field(() => NubariumValidationUpdateManyWithoutUserModelsInput, {
    nullable: true,
  })
  nubariumValidations?: NubariumValidationUpdateManyWithoutUserModelsInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  passCifrado?: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  permisosExcluidos?: string | null;

  @ApiProperty({
    required: false,
    type: () => PersonalLoanUpdateManyWithoutUserModelsInput,
  })
  @ValidateNested()
  @Type(() => PersonalLoanUpdateManyWithoutUserModelsInput)
  @IsOptional()
  @Field(() => PersonalLoanUpdateManyWithoutUserModelsInput, {
    nullable: true,
  })
  personalLoans?: PersonalLoanUpdateManyWithoutUserModelsInput;

  @ApiProperty({
    required: false,
    type: () => ProtectionCertUpdateManyWithoutUserModelsInput,
  })
  @ValidateNested()
  @Type(() => ProtectionCertUpdateManyWithoutUserModelsInput)
  @IsOptional()
  @Field(() => ProtectionCertUpdateManyWithoutUserModelsInput, {
    nullable: true,
  })
  protectionCerts?: ProtectionCertUpdateManyWithoutUserModelsInput;

  @ApiProperty({
    required: false,
    type: () => PurchaseUpdateManyWithoutUserModelsInput,
  })
  @ValidateNested()
  @Type(() => PurchaseUpdateManyWithoutUserModelsInput)
  @IsOptional()
  @Field(() => PurchaseUpdateManyWithoutUserModelsInput, {
    nullable: true,
  })
  purchasesPurchasesCreatedUserIdTousers?: PurchaseUpdateManyWithoutUserModelsInput;

  @ApiProperty({
    required: false,
    type: () => PurchaseUpdateManyWithoutUserModelsInput,
  })
  @ValidateNested()
  @Type(() => PurchaseUpdateManyWithoutUserModelsInput)
  @IsOptional()
  @Field(() => PurchaseUpdateManyWithoutUserModelsInput, {
    nullable: true,
  })
  purchasesPurchasesUpdatedUserIdTousers?: PurchaseUpdateManyWithoutUserModelsInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  userName?: string;

  @ApiProperty({
    required: false,
    type: () => UserPermissionUpdateManyWithoutUserModelsInput,
  })
  @ValidateNested()
  @Type(() => UserPermissionUpdateManyWithoutUserModelsInput)
  @IsOptional()
  @Field(() => UserPermissionUpdateManyWithoutUserModelsInput, {
    nullable: true,
  })
  userPermissions?: UserPermissionUpdateManyWithoutUserModelsInput;

  @ApiProperty({
    required: false,
    type: () => UserQualityHistoryUpdateManyWithoutUserModelsInput,
  })
  @ValidateNested()
  @Type(() => UserQualityHistoryUpdateManyWithoutUserModelsInput)
  @IsOptional()
  @Field(() => UserQualityHistoryUpdateManyWithoutUserModelsInput, {
    nullable: true,
  })
  userQualityHistories?: UserQualityHistoryUpdateManyWithoutUserModelsInput;

  @ApiProperty({
    required: false,
    type: () => VendorUpdateManyWithoutUserModelsInput,
  })
  @ValidateNested()
  @Type(() => VendorUpdateManyWithoutUserModelsInput)
  @IsOptional()
  @Field(() => VendorUpdateManyWithoutUserModelsInput, {
    nullable: true,
  })
  vendorsVendorsCreatedUserIdTousers?: VendorUpdateManyWithoutUserModelsInput;

  @ApiProperty({
    required: false,
    type: () => VendorUpdateManyWithoutUserModelsInput,
  })
  @ValidateNested()
  @Type(() => VendorUpdateManyWithoutUserModelsInput)
  @IsOptional()
  @Field(() => VendorUpdateManyWithoutUserModelsInput, {
    nullable: true,
  })
  vendorsVendorsUpdatedUserIdTousers?: VendorUpdateManyWithoutUserModelsInput;

  @ApiProperty({
    required: false,
    type: () => WarehouseGrantUpdateManyWithoutUserModelsInput,
  })
  @ValidateNested()
  @Type(() => WarehouseGrantUpdateManyWithoutUserModelsInput)
  @IsOptional()
  @Field(() => WarehouseGrantUpdateManyWithoutUserModelsInput, {
    nullable: true,
  })
  warehouseGrants?: WarehouseGrantUpdateManyWithoutUserModelsInput;
}

export { UserModelUpdateInput as UserModelUpdateInput };
