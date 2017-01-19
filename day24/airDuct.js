var input = [
`###########
#0.1.....2#
#.#######.#
#4.......3#
###########`,
  // puzzleInput
]

var day24 = function() {
  for (var i = 0; i < input.length; i++) {

    // build the grid
    var grid = []
    var lines = input[i].split(/\n/)
    for (var x = 0; x < lines.length; x++) {
      var line = lines[x].split('')
      grid[x] = []
      for (var y = 0; y < line.length; y++) {
        grid[x][y] = line[y]
      }
    }
    // printGrid(grid)

    // find (map) the numbers
    var numbers = {}

    for (var gi = 0; gi < grid.length; gi++) {
      for (var gj = 0; gj < grid[gi].length; gj++) {
        if (grid[gi][gj] !== '#' && grid[gi][gj] !== '.') {
          numbers[grid[gi][gj]] = [gi,gj]
        }
      }
    }
    // console.log(numbers)


    var minSteps = Number.MAX_SAFE_INTEGER
    // 1st try: loop -> always find the nearest
    // 2nd try: loop -> find the nearest, if there's more than one, try both
    // 3rd try: loop -> find the nearer ~3

    $('#day24').append(input[i])
      .append('<br>&emsp;')
      .append(minSteps)
      .append('<br>')
  }
}

var printGrid = function (grid) {
  var cols = grid[0].length
  var rows = grid.length
  var str = ''
  for (var r = 0; r < rows; r++) {
    for (var c = 0; c < cols; c++) {
      str += grid[r][c]
    }
    str += '\n'
  }
  console.log(str)
}

var day24part2 = function() {

  for (var i = 0; i < input.length; i++) {


    $('#day24part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }
}

$(function (){
  $('#main').append('<div id="day24"><h2>day #24</h2></div>')
  day24()
  $('#main').append('<br><div id="day24part2"><h2>day #24 part 2</h2></div>')
  day24part2()
  $('#main').append('<br>')
})