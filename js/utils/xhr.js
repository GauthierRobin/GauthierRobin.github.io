export const getApiData = (url, xhrOptions = {}, callback) => {
    let xhr = preparedXhr(url, xhrOptions)

    xhr.onload = () => {
        callback(xhr.status, xhr.response)
    }

    xhr.onerror = () => {
        console.log("Network Error");
    }

    return xhrSend(xhr, xhrOptions.data)
}

const preparedXhr = (url, xhrOptions = {}) => {
    const options = verifyOptions(xhrOptions)

    let xhr = new XMLHttpRequest()
    xhr.withCredentials = true
    xhr.open(options.type, url, options.async)

    const headers = options.headers
    for (const key in headers) {
        xhr.setRequestHeader(key, headers[key])
    }

    xhr.responseType = options.dataType

    return xhr
}

const verifyOptions = (xhrOptions) => {
    let options = xhrOptions

    if (typeof options.type !== "string") {
        options.type = "POST"
    }

    if (typeof options.async !== "boolean") {
        options.async = true
    }

    if (typeof options.headers !== "object") {
        options.headers = {}
    }

    if (typeof options.dataType !== "string") {
        options.dataType = "json"
    }

    if (typeof options.data === "undefined") {
        options.data = null
    }

    return options
}

const xhrSend = (xhr, data) => {
    if (data !== null && typeof data === "object") {
        xhr.send(JSON.stringify(data))
    }

    else {
        xhr.send()
    }

    return xhr
}