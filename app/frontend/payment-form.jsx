import React from "react"

import {parseMoney} from "./utils"

class PaymentForm extends React.Component {

    state = {
        price: "",
        name: "",
    }

    onClick = (ev) => {
        ev.preventDefault()

        let {price, name} = this.state
        price = parseMoney(price)
        this.props.onSubmit({
            price,
            name,
        })
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
