import _ from "lodash"
import $ from "npm-zepto"
import moment from "moment"
import React from "react"

import {linkTo} from "utils"
import {Loading} from "loading.jsx"
import {Money} from "money.jsx"

import "pages/transactions.scss"

class Payment extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    onClick(ev, id) {
        let link = "/payment/" + id
        this.context.router.push(link)
    }

    getName(payment) {
        return payment.name || "Untitled"
    }

    render() {
        let payment = this.props.payment
        let created = moment(payment.created)

        return <div className="payment" onClick={(ev) => this.onClick(ev, payment.id)}>
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
        return <Loading isLoading={this.props.payments === null}>
            <div>
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
        </Loading>
    }

}

class Transactions extends React.Component {

    state = {
        payments: null,
    }

    componentDidMount() {
        this.loadPayments()
    }

    loadPayments() {
        this.setState({payments: []})
        $.get(linkTo("/api/payments"), (response) => {
            this.setState({
                payments: response.payments,
            })
        })
    }

    render() {
        return <div id="transactions">
            <PaymentsMonth payments={this.state.payments} />
        </div>
    }

}

export {Transactions}
