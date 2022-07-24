import CreateTransaction from "../src/application/CreateTransaction";
import GetTransaction from "../src/application/GetTransaction";

// given, when, then -- arrange, act, assert
test("deve criar uma transação", async function () {
  const code = `${Math.floor(Math.random() * 10000)}`;
  const createTransaction = new CreateTransaction()
  const input = {
    code,
    amount: 1000,
    numberInstallments: 12,
    paymentMethod: "credit-card"
  }
  await createTransaction.execute(input);

  const getTransaction = new GetTransaction();
  const transaction = await getTransaction.execute(code);
  expect(transaction.code).toBe(code);
  expect(transaction.amount).toBe(1000);
  expect(transaction.paymentMethod).toBe("credit-card");
  expect(transaction.installments).toHaveLength(12);
  expect(transaction.installments[0].amount).toBe(83.33);
  expect(transaction.installments[11].amount).toBe(83.37);
});
