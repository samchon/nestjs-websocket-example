import { INestiaConfig } from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";

import { CalculateModule } from "./src/CalculateModule";

export const NESTIA_CONFIG: INestiaConfig = {
  input: () => NestFactory.create(CalculateModule),
  output: "src/api",
  distribute: "packages/api",
};
export default NESTIA_CONFIG;
