import _ from "lodash"
import React from "react"

class Loading extends React.Component {

    state = {
        tick: 0,
    }

    componentDidMount() {
        if (this.props.isLoading) {
            this.interval = setInterval(this.onTick, 200)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isLoading) {
            this.stopTick()
        }
    }

    componentWillUnmount() {
        this.stopTick()
    }

    stopTick() {
        clearInterval(this.interval)
    }

    onTick = () => {
        this.setState({
            tick: this.state.tick + 1,
        })
    }

    render() {
        let dots = _.repeat(".", (this.state.tick % 3) + 1)

        return <div>
            {this.props.isLoading ? dots : this.props.children}
        </div>
    }

}

export {Loading}
