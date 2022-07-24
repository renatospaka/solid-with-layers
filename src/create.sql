
drop table app.installment;
drop table app.transaction;

create table app.transaction (
  code text primary key,
  amount numeric,
  number_installments integer,
  payment_method text,
  date timestamp default now()
);

create table app.installment (
  code text references app.transaction (code),
  number integer,
  amount numeric,
  primary key (code, number)
);
