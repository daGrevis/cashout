import zepto from "npm-zepto"
import React from "react"
import ReactDOM from "react-dom"
import {Router, Route, IndexRoute, hashHistory} from "react-router"

import {Root} from "./root"
import {Index} from "./index"
import {Payment} from "./payment"

import "./base.scss"
import "./index.scss"

// Useless call on purpose. This silences the linter.
// I'm importing React, but not using it. Not importing it breaks the app, not sure why.
typeof React

let router = (
    <Router history={hashHistory}>
        <Route path="/" component={Root}>
            <IndexRoute component={Index}/>
            <Route path="payment/:id" component={Payment} />
        </Route>
    </Router>
)

function onReady() {
    let mountNode = document.getElementById("react")
    ReactDOM.render(router, mountNode)
}

// Look at it go!
zepto(onReady)
