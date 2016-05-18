import React from "react"
import {linkTo} from "./utils"

class Header extends React.Component {

    onClick = (ev) => {
        ev.preventDefault()

        window.location = linkTo("/")
    }

    render() {
        return <header id="header" onClick={this.onClick}>
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
