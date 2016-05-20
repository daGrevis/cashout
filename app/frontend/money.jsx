import React from "react"

import {formatMoney} from "./utils"

class Money extends React.Component {

    render() {
        let money = this.props.children
        return <span className="money">
            {formatMoney(money)} EUR
        </span>
    }

}

export {Money}
