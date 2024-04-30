import { TestValidator } from "@nestia/e2e";
import api from "@samchon/calculator-api/lib/index";
import { IListener } from "@samchon/calculator-api/lib/structures/IListener";

export const test_api_calculate_start = async (
  connection: api.IConnection,
): Promise<void> => {
  const stack: IListener.IEvent[] = [];
  const listener: IListener = {
    on: (event) => stack.push(event),
  };
  const { connector, driver } = await api.functional.calculate.start(
    connection,
    listener,
  );
  try {
    TestValidator.equals("plus")(await driver.plus(4, 2))(6);
    TestValidator.equals("minus")(await driver.minus(4, 2))(2);
    TestValidator.equals("multiply")(await driver.multiply(4, 2))(8);
    TestValidator.equals("divide")(await driver.divide(4, 2))(2);
    TestValidator.equals("events")(stack)([
      { type: "plus", x: 4, y: 2, z: 6 },
      { type: "minus", x: 4, y: 2, z: 2 },
      { type: "multiply", x: 4, y: 2, z: 8 },
      { type: "divide", x: 4, y: 2, z: 2 },
    ]);
  } catch (exp) {
    throw exp;
  } finally {
    await connector.close();
  }
};
