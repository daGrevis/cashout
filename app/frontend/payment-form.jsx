import React from "react"

import "payment-form.scss"

class DeleteLink extends React.Component {

    onClick = (ev) => {
        ev.preventDefault()

        console.log("onClick")
    }

    render() {
        return <a href="#" onClick={this.onClick}>
            Delete
        </a>
    }

}

class PaymentForm extends React.Component {

    onSubmit = (ev) => {
        ev.preventDefault()

        this.props.submit()
    }

    onChange(ev, k) {
        ev.preventDefault()

        this.props.change(k, ev.target.value)
    }

    render() {
        let payment = this.props.payment

        return <div className="payment-form">
            <form>
                <div className="row">
                    <div>
                        <label className="label" htmlFor="price">
                            Price
                        </label>
                    </div>
                    <input
                        id="price"
                        type="text"
                        placeholder="EUR"
                        value={payment.price}
                        onChange={(ev) => this.onChange(ev, "price")}
                    />
                </div>

                <div className="row">
                    <div>
                        <label className="label" htmlFor="name">
                            Name
                        </label>
                    </div>
                    <input
                        type="text"
                        id="name"
                        value={payment.name}
                        onChange={(ev) => this.onChange(ev, "name")}
                    />
                </div>

                {/*
                <div className="row">
                    <div>
                        <label className="label" htmlFor="category">
                            Category
                        </label>
                    </div>
                    <div className="select">
                        <div />
                        <select id="category">
                            <option>Food</option>
                            <option>Junk</option>
                        </select>
                    </div>
                </div>

                <div className="row transaction-type">
                    <div className="radio">
                        <input name="rcp_gateway" value="paypal" id="paypal" defaultChecked="true" type="radio" />
                        <label htmlFor="paypal">Withdrawal</label>
                    </div>
                    <div className="radio">
                        <input name="rcp_gateway" value="stripe" id="stripe" type="radio" />
                        <label htmlFor="stripe">Deposit</label>
                    </div>
                </div>
                */}

                <div className="row submit-button">
                    <button onClick={this.onSubmit}>Save</button>
                </div>
            </form>
        </div>
    }

}

function getEmptyPayment() {
    return {
        id: "",
        created: "",
        name: "",
        price: "",
    }
}

export {
    PaymentForm,
    getEmptyPayment,
}
