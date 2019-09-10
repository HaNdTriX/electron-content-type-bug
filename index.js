const { app, protocol, BrowserWindow } = require('electron')
const { PassThrough } = require('stream')

function createStream (text) {
  const rv = new PassThrough() // PassThrough is also a Readable stream
  rv.push(text)
  rv.push(null)
  return rv
}

app.on('ready', () => {
  protocol.registerStreamProtocol('atom', (request, callback) => {
    callback({
      statusCode: 200,
      headers: {
        'content-type': 'text/html; charset=UTF-8'
        // 'content-type': 'text/html' -> is working
      },
      data: createStream('<h5>Response</h5>')
    })
  })

  let win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL('atom://app')
})
