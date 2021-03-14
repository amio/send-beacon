const assert = require('assert')
const { createServer } = require('comets')
const sendBeacon = require('.')

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

async function testSimpleGet () {
  let accessedUrl

  const requestHandler = async (req, res) => {
    accessedUrl = req.url
    await sleep(1000)
    res.end()
  }

  const address = await createServer(requestHandler)
  sendBeacon(address + '/eiyo')

  await sleep(100)
  assert.strictEqual(accessedUrl, '/eiyo')
}

testSimpleGet()

// sendBeacon('https://timeout.now.sh/3001', Buffer.from('adf'))

// takes 3 seconds to finish
// require('https').get('https://timeout.now.sh/3002')
