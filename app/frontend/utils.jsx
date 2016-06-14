import $ from "npm-zepto"
import _ from "lodash"

function linkTo(where) {
    return window.APPROOT + where
}

function formatMoney(x) {
    x = _.round(x, 2)

    // When positive, show an explicit +.
    if (x > 0) {
        return "+" + x
    }

    return x
}

function parseMoney(x) {
    let money = parseFloat(x)

    // When starts with +, it's meant to be positive.
    if (_.startsWith(x, "+")) {
        return money
    }

    // When positive, but doesn't start with +, we assume it's a negative number.
    if (money > 0) {
        money *= -1
    }

    // Otherwise just pass through.
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
