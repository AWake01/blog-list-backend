const info  = (...params) => {
    console.log(...params)
}

const error  = (...params) => {
    console.ERROR(...params)
}

module.exports = {info, error}