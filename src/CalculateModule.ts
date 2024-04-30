import { Module } from "@nestjs/common";

import { CalculateController } from "./CalculateController";

@Module({
  controllers: [CalculateController],
})
export class CalculateModule {}
