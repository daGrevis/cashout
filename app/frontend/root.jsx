import React from "react"
import {linkTo} from "./utils"

class Header extends React.Component {

    render() {
        return <header id="header">
            <h1>Cashout</h1>
        </header>
    }

}

class Root extends React.Component {

    render() {
        return <div>
            <Header />

            {this.props.children}
        </div>
    }

}

export {Root}
