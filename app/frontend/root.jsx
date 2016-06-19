import Slideout from "slideout"
import React from "react"

class Header extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    onClick = () => {
        this.context.router.push("/")
    }

    render() {
        return <header id="header">
            <h1 onClick={this.onClick}>
                Cashout
            </h1>
        </header>
    }

}

class Hamburger extends React.Component {

    onClick = () => {
        this.props.toggleSlidout()
    }

    render() {
        return <span
            id="hamburger"
            onClick={this.onClick}
        >
            ☰
        </span>
    }

}

class Root extends React.Component {

    slideout = null

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    componentDidMount() {
        this.slideout = new Slideout({
            "panel": this.panel,
            "menu": this.menu,
            "padding": 200,
            "tolerance": 70,
            "side": "right",
        })
    }

    toggleSlidout = () => {
        this.slideout.toggle()
    }

    onMenuItemClick(ev, link) {
        ev.preventDefault()

        this.slideout.close()

        this.context.router.push(link)
    }

    render() {
        return <div>
            <nav id="menu" ref={(el) => this.menu = el}>
                <header>
                    <ul>
                        <li>
                            <a href="#" onClick={(ev) => this.onMenuItemClick(ev, "/")}>
                                New Transaction
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={(ev) => this.onMenuItemClick(ev, "/transactions")}>
                                Transactions
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={(ev) => this.onMenuItemClick(ev, "/metrics")}>
                                Metrics
                            </a>
                        </li>
                    </ul>
                </header>
            </nav>

            <div id="panel" ref={(el) => this.panel = el}>
                <Header />
                <Hamburger toggleSlidout={this.toggleSlidout} />

                {this.props.children}
            </div>
        </div>
    }

}

export {Root}
