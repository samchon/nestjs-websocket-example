import { CalculateBackend } from "./CalculateBackend";

CalculateBackend.start().catch((exp) => {
  console.error(exp);
  process.exit(-1);
});
