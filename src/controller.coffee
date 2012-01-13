Spine = require('spine')

class Controller extends Spine.Controller
  render: =>
    @html @template(@)

module.exports = Controller