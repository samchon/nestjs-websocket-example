import { WebSocketRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { Driver, WebAcceptor } from "tgrid";
import { tags } from "typia";

import { IAdvancedCalculator } from "./api/structures/IAdvancedCalculator";
import { ICalculator } from "./api/structures/ICalculator";
import { IHeader } from "./api/structures/IHeader";
import { IListener } from "./api/structures/IListener";
import { IMemo } from "./api/structures/IMemo";
import { AdvancedCalculator } from "./providers/AdvancedCalculator";
import { Calculator } from "./providers/Calculator";

@Controller("calculate")
export class CalculateController {
  /**
   * Start simple calculator.
   *
   * Start simple calculator through WebSocket.
   */
  @WebSocketRoute("start")
  public async start(
    @WebSocketRoute.Acceptor()
    acceptor: WebAcceptor<any, ICalculator, IListener>,
    @WebSocketRoute.Driver() driver: Driver<IListener>,
  ): Promise<void> {
    await acceptor.accept(new Calculator(driver));
  }

  /**
   * Start advanced calculator.
   *
   * Start advanced calculator through WebSocket with additional informations.
   *
   * @param id ID to assign
   * @param header Header information
   * @param memo Memo to archive
   */
  @WebSocketRoute(":id/advance")
  public async advance(
    @WebSocketRoute.Param("id") id: string & tags.Format<"uuid">,
    @WebSocketRoute.Header() header: undefined | Partial<IHeader>,
    @WebSocketRoute.Query() memo: IMemo,
    @WebSocketRoute.Acceptor()
    acceptor: WebAcceptor<undefined, IAdvancedCalculator, IListener>,
  ): Promise<void> {
    if (header?.precision !== undefined && header.precision < 0)
      await acceptor.reject(1008, "Invalid precision value");
    else
      await acceptor.accept(
        new AdvancedCalculator(
          id,
          { precision: header?.precision ?? 2 },
          memo,
          acceptor.getDriver(),
        ),
      );
  }
}
