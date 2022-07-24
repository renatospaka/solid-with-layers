import express, {Request, Response} from "express";
import pgp from "pg-promise";
import CreateTransaction from "./application/CreateTransaction";

const app = express();
app.use(express.json());
app.post("/transactions", async function (req: Request, res: Response) {
  const createTransaction = new CreateTransaction();
  await createTransaction.execute(req.body);
  res.end();
});
app.get("/transactions/:code", async function (req: Request, res: Response) {
  console.log("req.params.code => ", req.params.code);
  const connection = pgp()("postgres://postgres:123456@db:5432/app");
  const transaction = await connection.one("select * from app.transaction where code = $1", [req.params.code]);
  transaction.amount = parseFloat(transaction.amount);
  transaction.paymentMethod = transaction.payment_method;
  const installments = await connection.query("select * from app.installment where code = $1", [req.params.code]);
  for (const installment of installments) {
    installment.amount = parseFloat(installment.amount);
  }
  transaction.installments = installments;
  await connection.$pool.end();
  res.json(transaction);
})
app.listen(3000);
