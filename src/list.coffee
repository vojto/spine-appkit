Controller = require('./controller')
Views = require('./views')

# List displays contents of a model in a HTML list
# =============================================================================

class List extends Controller
  template: Views.list
  events:
    'touchstart li': 'touchstart'
    'touchend li': 'touchend'
    'tap li': 'tap'
  
  constructor: (options) ->
    super
    @setModel(options.model) if options.model
    @delegate = options.delegate
  
  setModel: (model) ->
    # TODO: Unbind from previous model
    @model = model
    @model.bind('refresh change', @render) if @model.bind?
    @model.model.bind('refresh change', @render) if @model.model && @model.model.bind?
    @render()
  
  render: =>
    @items = @model.all()
    super
    
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