from os import environ as env
from datetime import datetime
from decimal import Decimal as D

from flask import Flask, request, redirect, render_template
from peewee import SqliteDatabase, Model, DateTimeField, CharField, DecimalField, fn


DBPATH = env.get("CASHOUT_DBPATH", "default.db")
APPROOT = env.get("CASHOUT_APPROOT", "/")

db = SqliteDatabase(DBPATH)

app = Flask(__name__)
app.config["APPLICATION_ROOT"] = APPROOT


class Payment(Model):
    created = DateTimeField()
    name = CharField()
    price = DecimalField()

    class Meta:
        database = db

    def save(self, *args, **kwargs):
        if self.id is None:
            self.created = datetime.now()

        super().save(*args, **kwargs)


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        payment = Payment()

        payment.name = request.form["name"]
        payment.price = D(request.form["price"])

        if request.form["is_expense"] == "1":
            payment.price *= -1

        payment.save()

        return redirect("/")

    balance = Payment.select(fn.Sum(Payment.price)).scalar() or 0
    payments = Payment.select().order_by(-Payment.created)

    return render_template(
        "index.html",
        balance=balance,
        payments=payments,
    )


@app.route("/test")
def test():
    return "OK"


db.connect()
db.create_tables([Payment], safe=True)

app.debug = True

app.run(host= "0.0.0.0")
