import { DynamicExecutor } from "@nestia/e2e";
import { INestApplication } from "@nestjs/common";
import api from "@samchon/calculator-api";

import { CalculateBackend } from "../src/CalculateBackend";

async function main(): Promise<void> {
  const app: INestApplication = await CalculateBackend.start();
  const connection: api.IConnection = {
    host: "http://127.0.0.1:3000",
  };
  const report: DynamicExecutor.IReport = await DynamicExecutor.validate({
    prefix: "test",
    parameters: () => [
      {
        host: connection.host,
      },
    ],
  })(__dirname + "/features");
  await app.close();

  const failures: DynamicExecutor.IReport.IExecution[] =
    report.executions.filter((exec) => exec.error !== null);
  if (failures.length === 0) {
    console.log("Success");
    console.log("Elapsed time", report.time.toLocaleString(), `ms`);
  } else {
    for (const f of failures) console.log(f.error);
    process.exit(-1);
  }

  console.log(
    [
      `All: #${report.executions.length}`,
      `Success: #${report.executions.length - failures.length}`,
      `Failed: #${failures.length}`,
    ].join("\n"),
  );
}
main().catch((exp) => {
  console.log(exp);
  process.exit(-1);
});
