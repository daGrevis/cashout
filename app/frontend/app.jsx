import zepto from "npm-zepto"
import React from "react"
import ReactDOM from "react-dom"
import {Router, Route, IndexRoute, hashHistory} from "react-router"

import {Root} from "root"
import {NewTransaction} from "pages/new-transaction"
import {Transactions} from "pages/transactions"
import {Payment} from "payment"
import {Metrics} from "pages/metrics"

import "base.scss"

// Useless call on purpose. This silences the linter.
// I'm importing React, but not using it. Not importing it breaks the app, not sure why.
typeof React

let router = (
    <Router history={hashHistory}>
        <Route path="/" component={Root}>
            <IndexRoute component={NewTransaction}/>
            <Route path="transactions" component={Transactions}/>
            <Route path="payment/:id" component={Payment} />
            <Route path="metrics" component={Metrics} />
        </Route>
    </Router>
)

function onReady() {
    let mountNode = document.getElementById("react")
    ReactDOM.render(router, mountNode)
}

// Look at it go!
zepto(onReady)
