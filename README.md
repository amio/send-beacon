# Beacon API for Node.js

> The Beacon API is used to send an asynchronous and non-blocking request to a web server. The request does not expect a response.

## Usage

```js
// This will prevent Node.js process from exit for 3 seconds
const http = require('http')
http.get('https://timeout.now.sh/3000')
```

```js
// Fire and forget, Node.js process exit immediately
const sendBeacon = require('send-beacon')
sendBeacon('https://timeout.now.sh/3000')

```
