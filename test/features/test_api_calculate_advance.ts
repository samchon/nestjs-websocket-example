import { TestValidator } from "@nestia/e2e";
import api from "@samchon/calculator-api/lib/index";
import { IListener } from "@samchon/calculator-api/lib/structures/IListener";
import { IMemo } from "@samchon/calculator-api/lib/structures/IMemo";
import { v4 } from "uuid";

export const test_api_calculate_advance = async (
  connection: api.IConnection,
): Promise<void> => {
  const stack: IListener.IEvent[] = [];
  const listener: IListener = {
    on: (event) => stack.push(event),
  };

  const id: string = v4();
  const memo: IMemo = {
    title: "test",
    description: null,
    time: Date.now(),
  };
  const { connector, driver } = await api.functional.calculate.advance(
    {
      ...connection,
      headers: { precision: 2 },
    },
    id,
    memo,
    listener,
  );
  try {
    TestValidator.equals("id")(await driver.getId())(id);
    TestValidator.equals("memo")(await driver.getMemo())(memo);
    TestValidator.equals("precision")(await driver.getPrecision())(2);
    TestValidator.equals("plus")(await driver.plus(1, 2))(3);
    TestValidator.equals("minus")(await driver.minus(1, 2))(-1);
    TestValidator.equals("multiply")(await driver.multiply(0.01, 0.02))(0);
    TestValidator.equals("divide")(await driver.divide(1, 3))(0.33);
    TestValidator.equals("events")(stack)([
      { type: "plus", x: 1, y: 2, z: 3 },
      { type: "minus", x: 1, y: 2, z: -1 },
      { type: "multiply", x: 0.01, y: 0.02, z: 0 },
      { type: "divide", x: 1, y: 3, z: 0.33 },
    ]);
  } catch (exp) {
    throw exp;
  } finally {
    await connector.close();
  }
};
