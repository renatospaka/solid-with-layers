import express, {Request, Response} from "express";
import pgp from "pg-promise";

const app = express();
app.use(express.json())
app.post("/transactions", async function (req: Request, res: Response) {
  const connection = pgp()("postgres://postgres:123456@db:5432/app");
  await connection.query("insert into app.transaction(code, amount, number_installments, payment_method) values ($1, $2, $3, $4)", [req.body.code, req.body.amount, req.body.number_installments, req.body.payment_method]);
  const transactions = await connection.query("select * from app.transaction where code = $1", [req.body.code]);
  console.log(transactions);

  await connection.$pool.end();
  console.log(req.body);
  res.end();
});
app.listen(3000);
