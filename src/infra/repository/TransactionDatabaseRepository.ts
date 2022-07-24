import pgp from "pg-promise";
import Installment from "../../domain/entity/Installment";
import Transaction from "../../domain/entity/Transaction";
import TransactionRepository from "../../domain/repository/TransactionRepository";

export default class TransactionDatabaseRepository implements TransactionRepository {
  async save(transaction: Transaction): Promise<void> {
    const connection = pgp()("postgres://postgres:123456@db:5432/app");
    await connection.query("insert into app.transaction(code, amount, number_installments, payment_method) values ($1, $2, $3, $4)", [transaction.code, transaction.amount, transaction.numberInstallments, transaction.paymentMethod]);
    for (const installment of transaction.installments) {
      await connection.query("insert into app.installment (code, number, amount) values ($1, $2, $3)", [transaction.code, installment.number, installment.amount]);
    }
    await connection.$pool.end();
  }

  async get(code: string): Promise<Transaction> {
    const connection = pgp()("postgres://postgres:123456@db:5432/app");
    const transactionData = await connection.one("select * from app.transaction where code = $1", [code]);
    const transaction = new Transaction(transactionData.code, parseFloat(transactionData.amount), transactionData.number_installments, transactionData.payment_method)
    const installmentsData = await connection.query("select * from app.installment where code = $1", [code]);
    for (const installmentData of installmentsData) {
      const installment = new Installment(installmentData.number, parseFloat(installmentData.amount));
      transaction.installments.push(installment);
    }
    await connection.$pool.end();
    return transaction;
  }
}