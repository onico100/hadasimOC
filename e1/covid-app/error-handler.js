const generateError = (validator, error) => {
    const errorMessage = `${validator} Error: ${error.message}`
    error.message = errorMessage
    error.status = error.status || 400

    return Promise.reject(error)
}

module.exports = generateError