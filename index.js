const { spawn } = require('child_process')

/**
 * @param {String} url
 * @param {?String} payload
 */
function send(url, payload) {
  const http = url.startsWith('http://') ? require('http') : require('https')

  if (payload === undefined) {
    http.get(url)
  } else {
    http.request(url, { method: 'POST' }).write(payload)
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

  // TODO: support buffer type payload

  const invokeString = payload === undefined
    ? `;send('${url}')`
    : `;send('${url}', '${payload.replace(/'/g, '\\\'')}')`

  const evalString = send.toString() + invokeString

  const subprocess = spawn("node", ['-e', evalString], {
    detached: true,
    stdio: 'ignore'
  })

  subprocess.unref()
}

module.exports = sendBeacon
