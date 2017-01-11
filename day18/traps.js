var puzzleInput = '^.^^^..^^...^.^..^^^^^.....^...^^^..^^^^.^^.^^^^^^^^.^^.^^^^...^^...^^^^.^.^..^^..^..^.^^.^.^.......'
var input = [
  ['..^^.', 3],
  ['.^^.^.^^^^', 10],
  [puzzleInput, 40]
]
// ^ trap
// . safe

var generateTile = function (left, center, right) {
  if ( (left == '^' && center == '^' && right == '.')
      || (left == '.' && center == '^' && right == '^')
      || (left == '^' && center == '.' && right == '.')
      || (left == '.' && center == '.' && right == '^')
      ) {
    return '^'
  } else {
    return '.'
  }
}

var day18 = function() {

  for (var i = 0; i < input.length; i++) {

    var rows = [input[i][0]]
    var r = 0
    var totalRows = input[i][1]
    while (--totalRows) {
      var row = rows[r]
      var newRow = ''
      for (var t = 0; t < row.length; t++) {
        var left = t-1 < 0 ? '.' : row[t-1]
        var center = row[t]
        var right = t+1 >= row.length ? '.' : row[t+1]
        newRow += generateTile(left, center, right)
      }
      rows[++r] = newRow
    }
    // console.log(rows)
    var safeTiles = rows.reduce(function(accum, val) {
      return accum + val.replace(/\^/g, '').length
    }, 0)

    $('#day18').append(input[i])
      .append('<br>&emsp;')
      .append(safeTiles)
      .append('<br>')
  }
}

var day18part2 = function() {
  for (var i = 0; i < input.length; i++) {

    var rows = [input[i][0]]
    var r = 0
    var totalRows = 400000 // part 2 specific
    while (--totalRows) {
      var row = rows[r]
      var newRow = ''
      for (var t = 0; t < row.length; t++) {
        var left = t-1 < 0 ? '.' : row[t-1]
        var center = row[t]
        var right = t+1 >= row.length ? '.' : row[t+1]
        newRow += generateTile(left, center, right)
      }
      rows[++r] = newRow
    }
    // console.log(rows)
    var safeTiles = rows.reduce(function(accum, val) {
      return accum + val.replace(/\^/g, '').length
    }, 0)

    $('#day18part2').append(input[i][0]).append(400000)
      .append('<br>&emsp;')
      .append(safeTiles)
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day18"><h2>day #18</h2></div>')
  day18()
  $('#main').append('<br><div id="day18part2"><h2>day #18 part 2</h2></div>')
  day18part2()
  $('#main').append('<br>')
})

