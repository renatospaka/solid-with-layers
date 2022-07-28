import Transaction from "../src/domain/entity/Transaction";

test("Deve criar uma transacion", function () {
  const transacion = new Transaction("334", 1000, 12, "credit-card");
  transacion.generateInstallments();
  expect(transacion.installments).toHaveLength(12);
  expect(transacion.installments[0].amount).toBe(83.33);
  expect(transacion.installments[11].amount).toBe(83.37);
});
