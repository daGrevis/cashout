import $ from "npm-zepto"
import React from "react"

import {linkTo, ajaxPut} from "./utils"
import {Loading} from "./loading.jsx"
import {PaymentForm} from "./payment-form"

class Payment extends React.Component {

    state = {
        payment: null,
    }

    componentDidMount() {
        let id = this.props.params.id

        let link = linkTo("/api/payment/" + id)
        $.get(link, (response) => {
            this.setState({
                payment: response.payment,
            })
        })
    }

    onSubmit(payment) {
        let link = linkTo("/api/payment/" + payment.id)
        ajaxPut(link, payment, () => {
            location.reload()
        })
    }

    render() {
        if (this.state.payment === null) {
            return <Loading id="payment" />
        }

        return <div id="payment">
            <PaymentForm payment={this.state.payment} onSubmit={this.onSubmit} />
        </div>
    }

}

export {Payment}
