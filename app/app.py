from collections import Iterable
from os import environ as env
from datetime import date, datetime
from decimal import Decimal as D
from calendar import monthrange

import simplejson
import status
from flask import Flask, request, make_response, render_template
from flask_restful import Api, Resource
from peewee import SqliteDatabase, Model, DateTimeField, CharField, DecimalField, fn


def get_first_day_of_month(dt):
    # Zero based. Monday is 0.
    return monthrange(dt.year, dt.month)[0]


def get_days_month(dt):
    return monthrange(dt.year, dt.month)[1]


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
    if type(obj) is D:  # Decimal
        obj_str = str(obj)

        # Prevents crash when parsing JSON.
        if obj_str in ("NaN", "-NaN", "Infinity", "-Infinity"):
            return obj_str

        return float(obj_str)

    if type(obj) is date:
        return obj.isoformat()

    if type(obj) is datetime:
        return obj.isoformat()

    if isinstance(obj, Iterable) and not isinstance(obj, (list, set)):
        return list(obj)

    raise TypeError(repr(obj) + " is not JSON serializable")


@api.representation("application/json")
def output_json(data, code, headers=None):
    encoded_json = simplejson.dumps(data, default=json_encoder, use_decimal=False)
    response = make_response(encoded_json, code)
    response.headers.extend(headers or {})

    return response


class Payment(Model):
    created = DateTimeField()
    name = CharField()
    price = DecimalField()

    class Meta:
        database = db

    @staticmethod
    def get_by_id(payment_id):
        return Payment.select().where(Payment.id == payment_id).get()

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


def get_balance():
    return D(Payment.select(fn.Sum(Payment.price)).scalar() or 0)


def get_days_left(now=None):
    if now is None:
        now = datetime.now()

    return (get_days_month(now) - now.day) + 1


@app.route("/")
def index():
    return render_template("base.html")


@app.route("/test")
def test():
    return "OK"



class PaymentsResource(Resource):

    def get(self):
        today = date.today()
        payments = Payment.select().where(
            Payment.created >= date(today.year, today.month, 1)
        ).order_by(-Payment.created)

        return {
            "payments": [x.to_dict() for x in payments],
        }

    def post(self):
        payment = Payment()

        payment.name = request.form["name"]
        payment.price = request.form["price"]

        payment.save()

        return "", status.HTTP_201_CREATED


class PaymentResource(Resource):

    def get(self, payment_id):
        payment = Payment.get_by_id(payment_id)

        return {
            "payment": payment.to_dict(),
        }

    def put(self, payment_id):
        payment = Payment.get_by_id(payment_id)

        payment.name = request.form["name"]
        payment.price = request.form["price"]

        payment.save()


class MetricsResource(Resource):

    def get(self):
        return {
            "balance": get_balance(),
            "days_left": get_days_left(),
        }

api.add_resource(PaymentsResource, "/payments")
api.add_resource(PaymentResource, "/payment/<int:payment_id>")
api.add_resource(MetricsResource, "/metrics")


db.connect()
db.create_tables([Payment], safe=True)
