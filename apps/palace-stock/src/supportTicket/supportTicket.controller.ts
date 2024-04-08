import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { SupportTicketService } from "./supportTicket.service";
import { SupportTicketControllerBase } from "./base/supportTicket.controller.base";

@swagger.ApiTags("supportTickets")
@common.Controller("supportTickets")
export class SupportTicketController extends SupportTicketControllerBase {
  constructor(
    protected readonly service: SupportTicketService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
