import React from "react"

class PaymentForm extends React.Component {

    render() {
        return <div className="payment-form">
            <form>
                <label htmlFor="price">Price</label>
                <input id="price" placeholder="EUR" />

                <label htmlFor="name">Name</label>
                <input id="name" />

                <button>Save</button>
            </form>
        </div>
    }

}

export {PaymentForm}
