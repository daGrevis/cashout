import collections
from os import environ as env
from datetime import date, datetime
from decimal import Decimal as D

import simplejson
from flask import Flask, request, make_response, redirect, render_template
from flask_restful import Api, Resource
from peewee import SqliteDatabase, Model, DateTimeField, CharField, DecimalField, fn


DBPATH = env.get("CASHOUT_DBPATH", "default.db")
APPROOT = env.get("CASHOUT_APPROOT", "")

db = SqliteDatabase(DBPATH)

app = Flask(__name__)


@app.context_processor
def template_context():
    return {
        "APPROOT": APPROOT,
    }


api = Api(app, prefix="/api")


def json_encoder(obj):
    if type(obj) is date:
        return obj.isoformat()

    if type(obj) is datetime:
        return obj.isoformat()

    if isinstance(obj, collections.Iterable) and not isinstance(obj, (list, set)):
        return list(obj)

    raise TypeError(repr(obj) + " is not JSON serializable")


@api.representation("application/json")
def output_json(data, code, headers=None):
    response = make_response(simplejson.dumps(data, default=json_encoder), code)
    response.headers.extend(headers or {})

    return response


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

    def to_dict(self):
        return {
            "id": self.id,
            "created": self.created,
            "name": self.name,
            "price": self.price,
        }


@app.route("/", methods=["GET"])
def index():
    # if request.method == "POST":
    #     payment = Payment()

    #     payment.name = request.form["name"]
    #     payment.price = D(request.form["price"])

    #     if request.form["is_expense"] == "1":
    #         payment.price *= -1

    #     payment.save()

    #     return redirect("/")

    # balance = Payment.select(fn.Sum(Payment.price)).scalar() or 0
    # payments = Payment.select().order_by(-Payment.created)

    return render_template("base.html")


@app.route("/test")
def test():
    return "OK"



class PaymentsResource(Resource):

    def get(self):
        today = date.today()
        payments = Payment.select().where(Payment.created >= date(today.year, today.month, 1)).order_by(-Payment.created)

        return {
            "payments": [x.to_dict() for x in payments],
        }


class PaymentResource(Resource):

    pass



api.add_resource(PaymentsResource, "/payments")
api.add_resource(PaymentResource, "/payment")


db.connect()
db.create_tables([Payment], safe=True)

app.debug = True
