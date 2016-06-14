import React from "react"

class Header extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    onClick = () => {
        this.context.router.push("/")
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
