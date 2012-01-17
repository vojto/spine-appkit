Controller = require('./controller')
Views = require('./views')

class GroupedList extends Controller
  tag: 'ul'
  className: 'grouped-list'
  
  # Options:
  # `groups` dictionary with keys as group names and values as 
  # lists to be displayed as groups.
  constructor: ->
    super
    @el.addClass(@type) if @type
    @render()
  
  render: ->
    for name, view of @groups
      item = $("<li />")
      item.append $("<h3 />").text(name)
      view.el.addClass 'group'
      item.append(view.el)
      @append item

module.exports = GroupedList