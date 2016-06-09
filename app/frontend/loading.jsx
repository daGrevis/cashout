import _ from "lodash"
import React from "react"

class Loading extends React.Component {

    state = {
        tick: 0,
    }

    onTick = () => {
        this.setState({
            tick: this.state.tick + 1,
        })
    }

    componentDidMount() {
        this.interval = setInterval(this.onTick, 200)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        let dots = (this.state.tick % 3) + 1

        return <div id={this.props.id} className={this.props.className}>
            {_.repeat(".", dots)}
        </div>
    }

}

export {Loading}
