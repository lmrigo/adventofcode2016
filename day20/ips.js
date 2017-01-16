var input = [
  '5-8',
`5-8
0-2
4-7`,
`0-100
50-150
60-120
121-145`,
puzzleInput
]

var minIp = 0
var maxIp = 4294967295

var day20 = function() {

  for (var i = 0; i < input.length; i++) {

    var blackLows = []
    var blackHighs = []

    var inputsIps = input[i].split(/\n/)
    for (var j = 0; j < inputsIps.length; j++) {
      var range = inputsIps[j].split(/-/)
      blackLows.push(Number(range[0]))
      blackHighs.push(Number(range[1]))
    }
    var lowestIp = -1
    var ip = minIp
    var timeout = 1000
    while (lowestIp == -1 && ip <= maxIp && --timeout) {
      if (timeout % 100) {
        // console.log(ip)
      }
      var previousIp = ip
      for (var j = 0; j < blackLows.length; j++) {
        if (blackLows[j] <= ip && ip <= blackHighs[j]) {
          ip = blackHighs[j] +1
        }
      }
      if (previousIp == ip) {
        break
      }
    }
    if (!timeout) {
      console.log('timeout!')
    }
    lowestIp = ip

    $('#day20').append(input[i])
      .append('<br>&emsp;')
      .append(lowestIp)
      .append('<br>')
  }
}

var day20part2 = function() {
  for (var i = 0; i < input.length; i++) {

    $('#day20part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day20"><h2>day #20</h2></div>')
  day20()
  $('#main').append('<br><div id="day20part2"><h2>day #20 part 2</h2></div>')
  day20part2()
  $('#main').append('<br>')
})

