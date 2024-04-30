import { WebSocketAdaptor } from "@nestia/core";
import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { CalculateModule } from "./CalculateModule";

export namespace CalculateBackend {
  export const start = async (): Promise<INestApplication> => {
    const app: INestApplication = await NestFactory.create(CalculateModule);
    await WebSocketAdaptor.upgrade(app);
    await app.listen(3_000, "0.0.0.0");
    return app;
  };
}
