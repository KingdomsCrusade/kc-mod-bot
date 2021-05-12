const path = require('path')
const fs = require('fs')

module.exports = (client) => {
  const readScripts = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file))
      if (stat.isDirectory()) {
        readScripts(path.join(dir, file))
      } else if (file !== 'load-scripts.js') {
        const feature = require(path.join(__dirname, dir, file))
        console.log(`Enabling script "${file}"`)
        feature(client)
      }
    }
  }

  readScripts('.')
}