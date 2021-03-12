const { spawn } = require('child_process')

/**
 * @param {String} url
 * @param {?String} payload
 */
function send(url, payload) {
  const http = url.startsWith('http://') ? require('http') : require('https')

  if (payload === undefined) {
    return http.get(url)
  }

  if (typeof payload === 'string'){
    return http.request(url, { method: 'POST' }).write(payload)
  }

  if (typeof payload === 'object'){
    const { encode, text } = payload
    const bufferPayload = Buffer.from(text, encode)
    return http.request(url, { method: 'POST' }).write(bufferPayload)
  }
}

/**
 *
 * @param {String} url
 * @param {String|Buffer} payload
 */
function sendBeacon(url, payload) {
  if (!url.match(/^https?:\/\//)) {
    throw new Error(`Invalid url (${url})`)
  }

  const invokeString = payload === undefined
    ? `;send('${url}')`
    : `;send('${url}', ${stringifyPayload(payload)})`

  const evalString = send.toString() + invokeString

  const subprocess = spawn(process.argv[0], ['-e', evalString], {
    detached: true,
    stdio: 'ignore'
  })

  subprocess.unref()
}

/**
 * @param {string|Buffer} payload
 * @returns {string} 'xxxx' | '{ "encode": "base64", }'
 */
function stringifyPayload (payload) {
  if (typeof payload === 'string') {
    return `'${payload.replace(/'/g, '\\\'')}'`
  }

  if (Buffer.isBuffer(payload)) {
    const encode = 'base64'
    return JSON.stringify({
      text: payload.toString(encode),
      encode,
    })
  }

  throw new TypeError('payload should be string or buffer')
}

module.exports = sendBeacon
