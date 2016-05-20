import _ from "lodash"
import $ from "npm-zepto"
import moment from "moment"
import React from "react"

import {linkTo} from "./utils"
import {Loading} from "./loading.jsx"
import {Money} from "./money.jsx"
import {PaymentForm} from "./payment-form"

class Metrics extends React.Component {

    render() {
        let m = this.props.metrics

        if (m === null) {
            return <Loading className="metrics" />
        }

        return <div className="metrics">
            <p>
                <span>Balance:</span>
                <span><Money>{m.balance}</Money></span>
            </p>
            <p>
                <span>Days left:</span>
                <span>{m.days_left}</span>
            </p>
        </div>
    }

}

class Payment extends React.Component {

    getName(payment) {
        return payment.name || "Untitled"
    }

    render() {
        let payment = this.props.payment
        let created = moment(payment.created)

        return <div className="payment">
            <h3>{this.getName(payment)}</h3>

            <span className="price">
                <Money>{payment.price}</Money>
            </span>
            <span className="created-time">
                at {created.format("HH:mm")}
            </span>
        </div>
    }

}

class PaymentsToday extends React.Component {

    render() {
        return <div className="payments-today">
            <h2>
                {this.props.created.format("MM/")}
                <span className="day">
                    {this.props.created.format("DD")}
                </span>
                <span className="price-sum">
                    <Money>{this.props.priceSum}</Money>
                </span>
            </h2>

            {_.map(this.props.payments, (payment) => {
                return <Payment key={payment.id} payment={payment} />
            })}
        </div>
    }

}

class PaymentsMonth extends React.Component {

    groupPayments(payments) {
        return _
            .chain(payments)
            .groupBy((x) => moment(x.created).date())
            .values()
            .reverse()
            .value()
    }

    render() {
        if (this.props.payments === null) {
            return <Loading />
        }

        return <div>
            {_.map(this.groupPayments(this.props.payments), (payments) => {
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

class Index extends React.Component {

    state = {
        payments: null,
        metrics: null,
    }

    onSubmit(data) {
        $.post(linkTo("/api/payment"), data, () => {
            location.reload()
        })
    }

    loadPayments() {
        $.get(linkTo("/api/payments"), (response) => {
            this.setState({
                payments: response.payments,
            })
        })
    }

    loadMetrics() {
        $.get(linkTo("/api/metrics"), (response) => {
            this.setState({
                metrics: response,
            })
        })
    }

    componentDidMount() {
        this.loadPayments()
        this.loadMetrics()
    }

    render() {
        return <div id="index">
            <Metrics metrics={this.state.metrics} />
            <PaymentForm onSubmit={this.onSubmit} />
            <PaymentsMonth payments={this.state.payments} />
        </div>
    }

}

export {Index}
