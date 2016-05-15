import $ from "npm-zepto"
import _ from "lodash"
import moment from "moment"
import React from "react"

function formatCurrency(x) {
    x = _.round(x, 2)
    if (x > 0) {
        return "+" + x
    } else {
        return Math.abs(x)
    }
}

class Payment extends React.Component {

    getName(payment) {
        return payment.name
    }

    render() {
        let payment = this.props.payment
        let created = moment(payment.created)

        return <div className="payment">
            <h3>{this.getName(payment)}</h3>
            <span className="price">{formatCurrency(payment.price)} EUR</span>
            <span className="created-time">at {created.format("HH:mm")}</span>
        </div>
    }

}

class PaymentsToday extends React.Component {

    render() {
        return <div className="payments-today">
            <h2>
                {this.props.created.format("MM/")}
                <span className="day">{this.props.created.format("DD")}</span>
                <span className="price-sum">{formatCurrency(this.props.priceSum)} EUR</span>
            </h2>

            {_.map(this.props.payments, (payment) => {
                return <Payment key={payment.id} payment={payment} />
            })}
        </div>
    }

}

class Index extends React.Component {

    state = {
        payments: [],
    }

    groupPayments(payments) {
        return _
            .chain(payments)
            .groupBy((x) => moment(x.created).date())
            .values()
            .reverse()
            .value()
    }

    componentDidMount() {
        $.get("/api/payments", ({payments}) => {
            this.setState({payments})
        })
    }

    render() {
        let paymentsGrouped = this.groupPayments(this.state.payments)

        return <div id="index">
            {_.map(paymentsGrouped, (payments) => {
                let created = moment(_.first(payments).created)
                let priceSum = _.sum(_.map(payments, "price"))

                return <PaymentsToday
                    key={created.unix()}
                    payments={payments}
                    created={created}
                    priceSum={priceSum}
                />
            })}
        </div>
    }

}

export {Index}
