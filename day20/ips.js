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

var printRange = function(range) {
  var str = ''
  for (var r = 0; r < range.length; r++) {
    if (range[r][1] === '<') {
      str += range[r][1]+'('+range[r][0]+')'
    } else {
      str += '('+range[r][0]+')'+range[r][1]
    }
  }
  console.log(str)
}

var day20part2 = function() {
  for (var i = 0; i < input.length; i++) {
    var intervals = []

    var inputsIps = input[i].split(/\n/)
    for (var j = 0; j < inputsIps.length; j++) {
      var range = inputsIps[j].split(/-/)
      intervals.push({
        'low': Number(range[0]),
        'high': Number(range[1])
      })
    }

    var range = [ [minIp-1 ,'>'], [maxIp+1, '<']]
    $.each(intervals, function (idx, interval) {
      var low = -1
      var high = -1
      for (var j = 0; j < range.length-1; j++) {
        if (range[j][0] <= interval.low && interval.low < range[j+1][0]) {
          low = j+1
          for (var k = j+1; k < range.length; k++) {
            if (interval.high < range[k][0]) {
              high = k
              break
            }
          }
          break
        }
      }
      range.splice(high, 0, [interval.high, '>'])
      range.splice(low, 0, [interval.low, '<'])
    })
    // printRange(range)

    var whiteIps = 0
    var closings = 1
    for (var j = 0; j < range.length-1; j++) {
      if (range[j][1] === '>') {
        closings--
        if (!closings && range[j+1][1] === '<') {
          whiteIps += range[j+1][0] - (range[j][0] + 1)
        }
      } else if (range[j][1] === '<') {
        closings++
      }
    }

    $('#day20part2').append(input[i])
      .append('<br>&emsp;')
      .append(whiteIps)
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

