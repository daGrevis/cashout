import React from "react"

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
                <label htmlFor="price">Price</label>
                <input
                    id="price"
                    placeholder="EUR"
                    value={payment.price}
                    onChange={(ev) => this.onChange(ev, "price")}
                />

                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    value={payment.name}
                    onChange={(ev) => this.onChange(ev, "name")}
                />

                <button onClick={this.onSubmit}>Save</button>
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
