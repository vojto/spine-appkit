Controller = require('./controller')
Views = require('./views')

# List displays contents of a model in a HTML list
# =============================================================================

class List extends Controller
  tag: 'ul'
  className: 'list'
  
  template: Views.list
  events:
    'touchstart li': 'touchstart'
    'touchend li': 'touchend'
    'tap li': 'tap'
  
  constructor: ->
    super
    @items = []
    @model.bind('refresh', @refresh)
    @el.addClass(@type) if @type?
    @render()
  
  refresh: =>
    @items = @model.all()
    @render()
    
  # Touch events
  
  tap: (e) ->
    index = $(e.target).attr("data-index")
    item = @items[index]
    @delegate.didSelect(item)
  
  touchstart: (e) ->
    $(e.target).addClass('touch')
  
  touchend: (e) ->
    $(e.target).removeClass('touch')

module.exports = List