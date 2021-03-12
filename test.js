const sendBeacon = require('./')

sendBeacon('https://timeout.now.sh/3001', Buffer.from('adf'))

// takes 3 seconds to finish
// require('https').get('https://timeout.now.sh/3002')
