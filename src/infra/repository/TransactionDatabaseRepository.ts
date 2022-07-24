import pgp from "pg-promise";
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

  get(code: string): Promise<Transaction> {
    throw new Error("Method not implemented.");
  }
}