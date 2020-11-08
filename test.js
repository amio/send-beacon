const sendBeacon = require('./')

sendBeacon('https://timeout.now.sh/3001')

// takes 3 seconds to finish
// require('https').get('https://timeout.now.sh/3002')
