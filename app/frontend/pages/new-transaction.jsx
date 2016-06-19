import $ from "npm-zepto"
import React from "react"

import {linkTo, parseMoney} from "utils"
import {PaymentForm, getEmptyPayment} from "payment-form"

class NewTransaction extends React.Component {

    state = {
        payment: getEmptyPayment(),
    }

    onPaymentFormChange = (k, v) => {
        let payment = this.state.payment
        payment[k] = v

        this.setState({payment: payment})
    }

    onPaymentFormSubmit = () => {
        let payment = this.state.payment

        payment.price = parseMoney(payment.price)

        let link = linkTo("/api/payments")
        $.post(link, payment, () => {
            let payment = getEmptyPayment()

            this.setState({payment})
        })
    }

    render() {
        return <div id="new-transaction">
            <PaymentForm
                payment={this.state.payment}
                change={this.onPaymentFormChange}
                submit={this.onPaymentFormSubmit}
            />
        </div>
    }

}

export {NewTransaction}
