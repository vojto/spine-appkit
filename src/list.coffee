Controller = require('./controller')
Views = require('./views')

# List displays contents of a model in a HTML list
# =============================================================================

class List extends Controller
  tag: 'ul'
  className: 'list'

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
    
  render: ->
    @el.empty()
    inside = $("<div class='inside' />")
    @el.append(inside)
    for item in @items
      itemView = $(Views.list_item({list: @, item: item}))
      inside.append(itemView)
  # Touch events
  
  didClick: (e) =>
    target = $(e.target)
    li = if target.get(0).tagName == "LI" then target else target.parent()
    index = @$("> .inside > li").index(li)
    item = @items[index]    
    if target.hasClass("accessory")
      @delegate.didSelectAccessory(item)
    else
      @delegate.didSelect(item)
  
  touchstart: (e) ->
    $(e.target).addClass('touch')
  
  touchend: (e) ->
    $(e.target).removeClass('touch')

module.exports = List