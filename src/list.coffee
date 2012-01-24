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
    'click li': 'didClick'
  
  constructor: ->
    super
    @items or= []
    @model.bind('refresh', @refresh) if @model
    @model.bind('change', @refresh) if @model
    @el.addClass(@type) if @type?
    @refresh()
  
  refresh: =>
    if @model
      @items = if @predicate then @model.select(@predicate) else @model.all()
    if @sort
      @items = @items.sort(@sort)
    @render()
    
  # Touch events
  
  didClick: (e) ->
    li = $(e.target)
    li = li.parent() if li.get(0).tagName == "DIV"
    index = @$("> .inside > li").index(li)
    item = @items[index]    
    @delegate.didSelect(item)
  
  touchstart: (e) ->
    $(e.target).addClass('touch')
  
  touchend: (e) ->
    $(e.target).removeClass('touch')

module.exports = List