import $ from "npm-zepto"
import React from "react"

import {linkTo} from "utils"
import {Loading} from "loading.jsx"
import {Money} from "money.jsx"

import "pages/metrics.scss"

class Metrics extends React.Component {

    state = {
        metrics: null,
    }

    componentDidMount() {
        this.loadMetrics()
    }

    loadMetrics() {
        $.get(linkTo("/api/metrics"), (response) => {
            this.setState({
                metrics: response,
            })
        })
    }

    render() {
        let m = this.state.metrics

        return <div id="metrics">
            <Loading isLoading={m === null}>
                <p>
                    <span>Balance:</span>
                    <span><Money>{m && m.balance}</Money></span>
                </p>
                <p>
                    <span>Days left:</span>
                    <span>{m && m.days_left}</span>
                </p>
            </Loading>
        </div>
    }

}

export {Metrics}
