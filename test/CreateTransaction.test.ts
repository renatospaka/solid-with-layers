import CreateTransaction from "../src/application/CreateTransaction";
import GetTransaction from "../src/application/GetTransaction";
import TransactionDatabaseRepository from "../src/infra/repository/TransactionDatabaseRepository";

// given, when, then -- arrange, act, assert
test("deve criar uma transação", async function () {
  const transactionRepository = new TransactionDatabaseRepository();
  const code = `${Math.floor(Math.random() * 10000)}`;
  const input = {
    code,
    amount: 1000,
    numberInstallments: 12,
    paymentMethod: "credit-card"
  }
  const createTransaction = new CreateTransaction(transactionRepository);
  await createTransaction.execute(input);

  const getTransaction = new GetTransaction(transactionRepository);
  const transaction = await getTransaction.execute(code);
  expect(transaction.code).toBe(code);
  expect(transaction.amount).toBe(1000);
  expect(transaction.paymentMethod).toBe("credit-card");
  expect(transaction.installments).toHaveLength(12);
  expect(transaction.installments[0].amount).toBe(83.33);
  expect(transaction.installments[11].amount).toBe(83.37);
});
