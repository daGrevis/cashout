import $ from "npm-zepto"
import React from "react"

import {linkTo, ajaxPut, parseMoney} from "./utils"
import {Loading} from "./loading.jsx"
import {PaymentForm} from "./payment-form"

class Payment extends React.Component {

    state = {
        payment: null,
    }

    componentDidMount() {
        this.loadPayment()
    }

    loadPayment() {
        let id = this.props.params.id
        let link = linkTo("/api/payment/" + id)

        this.setState({payment: null})
        $.get(link, (response) => {
            this.setState({
                payment: response.payment,
            })
        })
    }

    onChange = (k, v) => {
        let payment = this.state.payment
        payment[k] = v

        this.setState({payment: payment})
    }

    onSubmit = () => {
        let payment = this.state.payment

        payment.price = parseMoney(payment.price)

        let link = linkTo("/api/payment/" + payment.id)
        ajaxPut(link, payment, () => {
            this.loadPayment()
        })
    }

    render() {
        return <Loading isLoading={this.state.payment === null}>
            <div id="payment">
                <PaymentForm payment={this.state.payment} change={this.onChange} submit={this.onSubmit} />
            </div>
        </Loading>
    }

}

export {Payment}
