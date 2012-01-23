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
    @items or= []
    @model.bind('refresh', @refresh) if @model
    @el.addClass(@type) if @type?
    @refresh()
  
  refresh: =>
    @items = @model.all() if @model
    @render()
    
  # Touch events
  
  tap: (e) ->
    index = @$("> li").index($(e.target))
    item = @items[index]    
    @delegate.didSelect(item)
  
  touchstart: (e) ->
    $(e.target).addClass('touch')
  
  touchend: (e) ->
    $(e.target).removeClass('touch')

module.exports = List