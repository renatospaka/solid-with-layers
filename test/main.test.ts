import axios from "axios";

// given, when, then -- arrange, act, assert
test("deve criar uma transação", async function () {
  const code = `${Math.floor(Math.random() * 10000)}`;
  await axios({
    url: "http://localhost:3000/transactions",
    method: "post",
    data: {
      code,
      amount: 1000,
      numberInstallments: 12,
      paymentMethod: "credit-card"
    }
  });

  const response = await axios({
    url: `http://localhost:3000/transactions/${code}`,
    method: "get"
  });
  const transaction = response.data;
  expect(transaction.code).toBe(code);
  expect(transaction.amount).toBe(1000);
  expect(transaction.paymentMethod).toBe("credit-card");
  expect(transaction.installments).toHaveLength(12);
  expect(transaction.installments[0].amount).toBe(83.33);
  expect(transaction.installments[11].amount).toBe(83.37);
});

