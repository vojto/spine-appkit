module.exports =
  indexOfEql: (haystack, needle) ->
    index = -1
    for item, i in haystack
      if item.eql(needle)
        index = i; break
    index