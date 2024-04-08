import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { SupportTicketModuleBase } from "./base/supportTicket.module.base";
import { SupportTicketService } from "./supportTicket.service";
import { SupportTicketController } from "./supportTicket.controller";

@Module({
  imports: [SupportTicketModuleBase, forwardRef(() => AuthModule)],
  controllers: [SupportTicketController],
  providers: [SupportTicketService],
  exports: [SupportTicketService],
})
export class SupportTicketModule {}
