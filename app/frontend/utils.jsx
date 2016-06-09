import $ from "npm-zepto"
import _ from "lodash"

function linkTo(where) {
    return window.APPROOT + where
}

function formatMoney(x) {
    x = _.round(x, 2)

    if (x > 0) {
        return "+" + x
    }

    return x
}

function parseMoney(x) {
    let money = parseFloat(x)
    if (_.startsWith(x, "+")) {
        return money
    }

    if (money > 0) {
        money *= -1
    }

    return money
}

function ajaxPut(url, data, success) {
    let type = "PUT"
    return $.ajax({type, url, data, success})
}

export {
    linkTo,
    formatMoney,
    parseMoney,
    ajaxPut,
}
