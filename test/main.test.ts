import axios from "axios";

test("deve criar uma transação", async function () {
  const code = `${Math.floor(Math.random() * 10000)}`;
  axios({
    url: "http://localhost:3000/transactions",
    method: "post",
    data: {
      code,
      amount: 1000,
      numberInstallments: 12,
      paymentMethod: "credit-card"
    }
  });
});