{print} = require('sys')
{spawn} = require('child_process')
fs      = require('fs')

_intercept = (childProcess) ->
  childProcess.stderr.on 'data', (data) ->
    process.stderr.write data.toString()
  childProcess.stdout.on 'data', (data) ->
    print data.toString()

build = (callback) ->
  coffee = spawn 'coffee', ['-c', '-o', 'lib', 'src']
  _intercept(coffee)
  
  haml = spawn './node_modules/haml-coffee/bin/haml-coffee', ['-i', 'src/views', '-o', 'lib/views.js', '-b', 'src/views']
  _intercept(haml)
  haml.on 'exit', ->
    content = fs.readFileSync 'lib/views.js', 'utf-8'
    content += "\nmodule.exports = window.HAML;"
    fs.writeFileSync 'lib/views.js', content, 'utf-8'
    console.log "Patched lib/views.js"    

task 'build', 'Build lib/ from src/', ->
  build()