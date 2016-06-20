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
                <div className="row">
                    <div className="column">
                        Balance:
                    </div>
                    <div className="column">
                        <Money>{m && m.balance}</Money>
                    </div>
                </div>

                <div className="row">
                    <div className="column">
                        Days left:
                    </div>
                    <div className="column">
                        {m && m.days_left}
                    </div>
                </div>
            </Loading>
        </div>
    }

}

export {Metrics}
