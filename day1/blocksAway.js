
function day1() {
  var input = [
    'R2, L3',
    'R2, R2, R2',
    'R5, L5, R5, R3',
    'R3, L5, R1, R2, L5, R2, R3, L2, L5, R5, L4, L3, R5, L1, R3, R4, R1, L3, R3, L2, L5, L2, R4, R5, R5, L4, L3, L3, R4, R4, R5, L5, L3, R2, R2, L3, L4, L5, R1, R3, L3, R2, L3, R5, L194, L2, L5, R2, R1, R1, L1, L5, L4, R4, R2, R2, L4, L1, R2, R53, R3, L5, R72, R2, L5, R3, L4, R187, L4, L5, L2, R1, R3, R5, L4, L4, R2, R5, L5, L4, L3, R5, L2, R1, R1, R4, L1, R2, L3, R5, L4, R2, L3, R1, L4, R4, L1, L2, R3, L1, L1, R4, R3, L4, R2, R5, L2, L3, L3, L1, R3, R5, R2, R3, R1, R2, L1, L4, L5, L2, R4, R5, L2, R4, R4, L3, R2, R1, L4, R3, L3, L4, L3, L1, R3, L2, R2, L4, L4, L5, R3, R5, R3, L2, R5, L2, L1, L5, L1, R2, R4, L5, R2, L4, L5, L4, L5, L2, L5, L4, R5, R3, R2, R2, L3, R3, L2, L5'
  ]

  for (var i = 0; i < input.length; i++) {
    var x = 0
    var y = 0
    var distance = 0
    var direction = 'N'

    var path = input[i].split(/,\s/)
    //console.log(path)
    for (var j = 0; j < path.length; j++) {
      var turn = path[j].charAt(0)
      if (turn === 'R') {
        switch (direction) {
          case 'N': direction = 'E'; break;
          case 'E': direction = 'S'; break;
          case 'S': direction = 'W'; break;
          case 'W': direction = 'N'; break;
        }
      } else {
        switch (direction) {
          case 'N': direction = 'W'; break;
          case 'W': direction = 'S'; break;
          case 'S': direction = 'E'; break;
          case 'E': direction = 'N'; break;
        }
      }
      var steps = Number(path[j].substr(1))
      switch (direction) {
          case 'N': y += steps; break;
          case 'W': x -= steps; break;
          case 'S': y -= steps; break;
          case 'E': x += steps; break;
      }
    }

    distance = Math.abs(x + y)
    //console.log(distance)
    $('#day1').append(input[i])
      .append('<br>&emsp;')
      .append(distance)
      .append('<br>')
  }
}

$(function() {
  $('#main').append('<div id="day1"><h2>day #1</h2></div>')
  day1()
  $('#main').append()
})