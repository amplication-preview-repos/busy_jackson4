import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { TagModule } from "./tag/tag.module";
import { ArticleModule } from "./article/article.module";
import { CommentModule } from "./comment/comment.module";
import { ArticleToTagModule } from "./articleToTag/articleToTag.module";
import { AccessLevelModule } from "./accessLevel/accessLevel.module";
import { AirtimeRechargeModule } from "./airtimeRecharge/airtimeRecharge.module";
import { AngazaAccountModule } from "./angazaAccount/angazaAccount.module";
import { AngazaApiLogModule } from "./angazaApiLog/angazaApiLog.module";
import { AngazaPaymentModule } from "./angazaPayment/angazaPayment.module";
import { BankReceiptModule } from "./bankReceipt/bankReceipt.module";
import { BillDetailModule } from "./billDetail/billDetail.module";
import { BillingApiLogModule } from "./billingApiLog/billingApiLog.module";
import { BillingCfdiUsModule } from "./billingCfdiUs/billingCfdiUs.module";
import { BillingClassifCodeModule } from "./billingClassifCode/billingClassifCode.module";
import { BillingConceptCodeModule } from "./billingConceptCode/billingConceptCode.module";
import { BillingConceptModule } from "./billingConcept/billingConcept.module";
import { BillingFiscalRegimeModule } from "./billingFiscalRegime/billingFiscalRegime.module";
import { BillingSatKeyModule } from "./billingSatKey/billingSatKey.module";
import { BillingSeryModule } from "./billingSery/billingSery.module";
import { BillingWebhookLogModule } from "./billingWebhookLog/billingWebhookLog.module";
import { BillModule } from "./bill/bill.module";
import { BranchManagerModule } from "./branchManager/branchManager.module";
import { BranchOfficeModule } from "./branchOffice/branchOffice.module";
import { CashCountDetailModule } from "./cashCountDetail/cashCountDetail.module";
import { CashCountModule } from "./cashCount/cashCount.module";
import { CashSaleDetailModule } from "./cashSaleDetail/cashSaleDetail.module";
import { CashSaleModule } from "./cashSale/cashSale.module";
import { CategoryModule } from "./category/category.module";
import { CollaboratorModule } from "./collaborator/collaborator.module";
import { ComunApiLogModule } from "./comunApiLog/comunApiLog.module";
import { ConektaApiLogModule } from "./conektaApiLog/conektaApiLog.module";
import { ConektaPaymentTransacModule } from "./conektaPaymentTransac/conektaPaymentTransac.module";
import { ConektaWebhookLogModule } from "./conektaWebhookLog/conektaWebhookLog.module";
import { ConfigurationModule } from "./configuration/configuration.module";
import { CustomerModule } from "./customer/customer.module";
import { DocumentTypeModule } from "./documentType/documentType.module";
import { DocumentModule } from "./document/document.module";
import { EstimateModule } from "./estimate/estimate.module";
import { FinancedAccessoryModule } from "./financedAccessory/financedAccessory.module";
import { FinancedSaleModule } from "./financedSale/financedSale.module";
import { FinancedSalesLogModule } from "./financedSalesLog/financedSalesLog.module";
import { ItemPriceModule } from "./itemPrice/itemPrice.module";
import { ItemModule } from "./item/item.module";
import { KardexModule } from "./kardex/kardex.module";
import { KardexSeryModule } from "./kardexSery/kardexSery.module";
import { LoanAmountModule } from "./loanAmount/loanAmount.module";
import { LoanedDeviceModule } from "./loanedDevice/loanedDevice.module";
import { LockedDevBadCustomerModule } from "./lockedDevBadCustomer/lockedDevBadCustomer.module";
import { MandatoryDocumentModule } from "./mandatoryDocument/mandatoryDocument.module";
import { MeasuringUnitModule } from "./measuringUnit/measuringUnit.module";
import { ModifiedPaymentModule } from "./modifiedPayment/modifiedPayment.module";
import { ModifiedPermissionModule } from "./modifiedPermission/modifiedPermission.module";
import { ModifiedSalesclerkModule } from "./modifiedSalesclerk/modifiedSalesclerk.module";
import { NubariumOtherValidationModule } from "./nubariumOtherValidation/nubariumOtherValidation.module";
import { NubariumValidationModule } from "./nubariumValidation/nubariumValidation.module";
import { NubariumValidationsLogModule } from "./nubariumValidationsLog/nubariumValidationsLog.module";
import { NuovoApiLogModule } from "./nuovoApiLog/nuovoApiLog.module";
import { NuovoHistoricalModule } from "./nuovoHistorical/nuovoHistorical.module";
import { OtherCompaniesPaymentModule } from "./otherCompaniesPayment/otherCompaniesPayment.module";
import { PaycodeApiLogModule } from "./paycodeApiLog/paycodeApiLog.module";
import { PaycodePaymentTransacModule } from "./paycodePaymentTransac/paycodePaymentTransac.module";
import { PaycodeWebhookLogModule } from "./paycodeWebhookLog/paycodeWebhookLog.module";
import { PaymentInterestModule } from "./paymentInterest/paymentInterest.module";
import { PaymentPeriodModule } from "./paymentPeriod/paymentPeriod.module";
import { PaymentWayModule } from "./paymentWay/paymentWay.module";
import { PaymentModule } from "./payment/payment.module";
import { PermissionModule } from "./permission/permission.module";
import { PersonalLoanModule } from "./personalLoan/personalLoan.module";
import { PromotionModule } from "./promotion/promotion.module";
import { ProtectionCertActivationModule } from "./protectionCertActivation/protectionCertActivation.module";
import { ProtectionCertStatusModule } from "./protectionCertStatus/protectionCertStatus.module";
import { ProtectionCertModule } from "./protectionCert/protectionCert.module";
import { PurchaseModule } from "./purchase/purchase.module";
import { RecurringPaymentModule } from "./recurringPayment/recurringPayment.module";
import { RoleModule } from "./role/role.module";
import { ScheduledTasksLogModule } from "./scheduledTasksLog/scheduledTasksLog.module";
import { SepomexCodeModule } from "./sepomexCode/sepomexCode.module";
import { SimPlanModule } from "./simPlan/simPlan.module";
import { SmsMasivosApiLogModule } from "./smsMasivosApiLog/smsMasivosApiLog.module";
import { StockModule } from "./stock/stock.module";
import { StockSeryModule } from "./stockSery/stockSery.module";
import { StripeApiLogModule } from "./stripeApiLog/stripeApiLog.module";
import { StripePaymentTransacModule } from "./stripePaymentTransac/stripePaymentTransac.module";
import { StripeWebhookLogModule } from "./stripeWebhookLog/stripeWebhookLog.module";
import { SupportTicketModule } from "./supportTicket/supportTicket.module";
import { TimelyPayDiscountModule } from "./timelyPayDiscount/timelyPayDiscount.module";
import { TransacErrorModule } from "./transacError/transacError.module";
import { TransactionModule } from "./transaction/transaction.module";
import { TransitTransferModule } from "./transitTransfer/transitTransfer.module";
import { TrustonicApiLogModule } from "./trustonicApiLog/trustonicApiLog.module";
import { TrustonicHistoricalModule } from "./trustonicHistorical/trustonicHistorical.module";
import { UserPermissionModule } from "./userPermission/userPermission.module";
import { UserQualityHistoryModule } from "./userQualityHistory/userQualityHistory.module";
import { UserModelModule } from "./userModel/userModel.module";
import { VendorModule } from "./vendor/vendor.module";
import { WarehouseGrantModule } from "./warehouseGrant/warehouseGrant.module";
import { WarehouseLoanAmountModule } from "./warehouseLoanAmount/warehouseLoanAmount.module";
import { WarehouseMandatoryDocModule } from "./warehouseMandatoryDoc/warehouseMandatoryDoc.module";
import { WarehouseModule } from "./warehouse/warehouse.module";
import { WimotelecomApiLogModule } from "./wimotelecomApiLog/wimotelecomApiLog.module";
import { HealthModule } from "./health/health.module";
import { PrismaModule } from "./prisma/prisma.module";
import { SecretsManagerModule } from "./providers/secrets/secretsManager.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ServeStaticOptionsService } from "./serveStaticOptions.service";
import { ConfigModule } from "@nestjs/config";

import { ACLModule } from "./auth/acl.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  controllers: [],
  imports: [
    ACLModule,
    AuthModule,
    UserModule,
    TagModule,
    ArticleModule,
    CommentModule,
    ArticleToTagModule,
    AccessLevelModule,
    AirtimeRechargeModule,
    AngazaAccountModule,
    AngazaApiLogModule,
    AngazaPaymentModule,
    BankReceiptModule,
    BillDetailModule,
    BillingApiLogModule,
    BillingCfdiUsModule,
    BillingClassifCodeModule,
    BillingConceptCodeModule,
    BillingConceptModule,
    BillingFiscalRegimeModule,
    BillingSatKeyModule,
    BillingSeryModule,
    BillingWebhookLogModule,
    BillModule,
    BranchManagerModule,
    BranchOfficeModule,
    CashCountDetailModule,
    CashCountModule,
    CashSaleDetailModule,
    CashSaleModule,
    CategoryModule,
    CollaboratorModule,
    ComunApiLogModule,
    ConektaApiLogModule,
    ConektaPaymentTransacModule,
    ConektaWebhookLogModule,
    ConfigurationModule,
    CustomerModule,
    DocumentTypeModule,
    DocumentModule,
    EstimateModule,
    FinancedAccessoryModule,
    FinancedSaleModule,
    FinancedSalesLogModule,
    ItemPriceModule,
    ItemModule,
    KardexModule,
    KardexSeryModule,
    LoanAmountModule,
    LoanedDeviceModule,
    LockedDevBadCustomerModule,
    MandatoryDocumentModule,
    MeasuringUnitModule,
    ModifiedPaymentModule,
    ModifiedPermissionModule,
    ModifiedSalesclerkModule,
    NubariumOtherValidationModule,
    NubariumValidationModule,
    NubariumValidationsLogModule,
    NuovoApiLogModule,
    NuovoHistoricalModule,
    OtherCompaniesPaymentModule,
    PaycodeApiLogModule,
    PaycodePaymentTransacModule,
    PaycodeWebhookLogModule,
    PaymentInterestModule,
    PaymentPeriodModule,
    PaymentWayModule,
    PaymentModule,
    PermissionModule,
    PersonalLoanModule,
    PromotionModule,
    ProtectionCertActivationModule,
    ProtectionCertStatusModule,
    ProtectionCertModule,
    PurchaseModule,
    RecurringPaymentModule,
    RoleModule,
    ScheduledTasksLogModule,
    SepomexCodeModule,
    SimPlanModule,
    SmsMasivosApiLogModule,
    StockModule,
    StockSeryModule,
    StripeApiLogModule,
    StripePaymentTransacModule,
    StripeWebhookLogModule,
    SupportTicketModule,
    TimelyPayDiscountModule,
    TransacErrorModule,
    TransactionModule,
    TransitTransferModule,
    TrustonicApiLogModule,
    TrustonicHistoricalModule,
    UserPermissionModule,
    UserQualityHistoryModule,
    UserModelModule,
    VendorModule,
    WarehouseGrantModule,
    WarehouseLoanAmountModule,
    WarehouseMandatoryDocModule,
    WarehouseModule,
    WimotelecomApiLogModule,
    HealthModule,
    PrismaModule,
    SecretsManagerModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRootAsync({
      useClass: ServeStaticOptionsService,
    }),
  ],
  providers: [],
})
export class AppModule {}
