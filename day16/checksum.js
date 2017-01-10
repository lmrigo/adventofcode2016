var puzzleInput = ['10010000000110000', 272]
var input = [
  ['1', 3],
  ['0', 3],
  ['11111', 11],
  ['111100001010', 25],
  ['110010110100', 12],
  ['10000', 20],
  puzzleInput
]

var reverse = function (s) {
  for (var i = s.length - 1, o = ''; i >= 0; o += s[i--]) { }
  return o
}

var reverseNegate = function (s) {
  for (var i = s.length - 1, o = ''; i >= 0; o += (s[i--] == '1' ? '0' : '1') ) { }
  return o
}

var day16 = function() {

  for (var i = 0; i < input.length; i++) {

    // generate data
    var a = input[i][0]
    var diskSize = input[i][1]
    while (a.length < diskSize) {
      var b = reverseNegate(a)
      a = a + '0' + b
    }
    //console.log(a)
    // truncate to disk size
    a = a.substr(0, diskSize)

    // generate checskum
    var checksum = a
    do {
      var newChecksum = ''
      for (var j = 0; j < checksum.length; j=j+2) {
        var pair = checksum.charAt(j) + checksum.charAt(j+1)
        if (pair == '11' || pair == '00') {
          newChecksum += '1'
        } else {
          newChecksum += '0'
        }
      }
      checksum = newChecksum
    } while (checksum.length % 2 == 0)

    $('#day16').append(input[i])
      .append('<br>&emsp;')
      .append(checksum)
      .append('<br>')
  }
}

var day16part2 = function() {

  for (var i = 0; i < input.length; i++) {

    $('#day16part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day16"><h2>day #16</h2></div>')
  day16()
  $('#main').append('<br><div id="day16part2"><h2>day #16 part 2</h2></div>')
  day16part2()
  $('#main').append('<br>')
})

