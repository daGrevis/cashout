import React from "react"

class Header extends React.Component {

    render() {
        return <header>
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
