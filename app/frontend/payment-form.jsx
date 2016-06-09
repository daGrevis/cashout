import React from "react"

import {parseMoney} from "./utils"

class PaymentForm extends React.Component {

    state = {
        id: "",
        created: "",
        name: "",
        price: "",
    }

    constructor(props) {
        super(props)

        if (props.payment) {
            this.state = this.props.payment
        }
    }

    onClick = (ev) => {
        ev.preventDefault()

        let payment = this.state
        payment.price = parseMoney(payment.price)

        this.props.onSubmit(payment)
    }

    onChange(ev, fieldName) {
        let stateUpdate = {}
        stateUpdate[fieldName] = ev.target.value

        this.setState(stateUpdate)
    }

    render() {
        return <div className="payment-form">
            <form>
                <label htmlFor="price">Price</label>
                <input
                    id="price"
                    placeholder="EUR"
                    value={this.state.price}
                    onChange={(ev) => this.onChange(ev, "price")}
                />

                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    value={this.state.name}
                    onChange={(ev) => this.onChange(ev, "name")}
                />

                <button onClick={this.onClick}>Save</button>
            </form>
        </div>
    }

}

export {PaymentForm}
