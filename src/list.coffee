Controller = require('./controller')
Views = require('./views')

# List displays contents of a model in a HTML list
# =============================================================================

class List extends Controller
  tag: 'ul'
  className: 'list'
  itemView: Views.list_item

  events:
    'touchstart li': 'touchstart'
    'touchend li': 'touchend'
    'click li': 'didClick'

  constructor: ->
    super
    @items or= []
    @model.bind('refresh', @refresh) if @model
    @model.bind('create', @refresh) if @model
    @el.addClass(@type) if @type?
    @inside = $("<div class='inside' />")
    @el.append(@inside)
    @selectionIndex = -1
    @refresh()
  
  refresh: =>
    @items = @findItems() if @model
    @render()
    if @selectionIndex != -1
      @$('li').removeClass('active')
      @elementAtIndex(@selectionIndex).addClass('active')
  
  findItems: ->
    items = if @predicate then @model.select(@predicate) else @model.all()
    items.sort(@sort) if @sort
    items
    
  render: ->
    @inside.empty()
    for item, index in @items
      item = new ListItem(list: @, item: item, index: index, template: @itemView)
      @inside.append(item.el)
    @trigger('didRender')

  didClick: (e) =>
    target = $(e.target)
    item = @itemForTarget(target)
    if target.hasClass("accessory")
      @delegate.didSelectAccessory(item, @)
    else
      @delegate.didSelect(item, @)
  
  indexForTarget: (target) ->
    target = $(target)
    li = if target.get(0).tagName == "LI" then target else target.parents("li:first")
    @inside.children().index(li)
  
  itemAtIndex: (domIndex) ->
    index = $(@inside.children().get(domIndex)).attr("data-index")
    @items[index]
  
  itemForTarget: (target) ->
    @itemAtIndex(@indexForTarget(target))
  
  elementAtIndex: (index) ->
    @inside.find("li[data-index=#{index}]")
  
  touchstart: (e) ->
    $(e.target).addClass('touch')
  
  touchend: (e) ->
    $(e.target).removeClass('touch')
  
  itemClass: -> ''

class ListItem extends Controller
  tag: 'li'
  
  constructor: ->
    super
    @item.bind('change', @render)
    @render()
  
  render: =>
    @el.addClass(@list.itemClass(@item))
    @el.attr('data-index', @index)
    super

module.exports = List