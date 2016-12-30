
var input = [
  'ADVENT',
  'A(1x5)BC',
  '(3x3)XYZ',
  'A(2x2)BCD(2x2)EFG',
  '(6x1)(1x3)A',
  'X(8x2)(3x3)ABCY',
  puzzleInput
 ]

 var day9 = function() {

  for (var i = 0; i < input.length; i++) {

    var compressed = input[i].replace(/\s/g, '')
    var decompressed = ''
    for (var j = 0; j < compressed.length; j++) {
      var ch = compressed.charAt(j)
      if (ch != '(') {
        decompressed += ch
      } else {
        var copyLength = ''
        var nextCh = compressed.charAt(++j)
        do {
          copyLength += nextCh
          nextCh = compressed.charAt(++j)
        } while (nextCh != 'x')

        var copyTimes = ''
        nextCh = compressed.charAt(++j)
        do {
          copyTimes += nextCh
          nextCh = compressed.charAt(++j)
        } while (nextCh != ')')
        // apply decompression
        copyLength = Number(copyLength)
        var buffer = ''
        while (copyLength--) buffer += compressed.charAt(++j)
        copyTimes = Number(copyTimes)
        while (copyTimes--) decompressed += buffer
      }
    }
    // console.log(decompressed)

    var length = decompressed.length
    $('#day9').append(input[i])
      .append('<br>&emsp;')
      .append(length)
      .append('<br>')
  }
}

var day9part2 = function() {

  for (var i = 0; i < input.length; i++) {
    $('#day9part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day9"><h2>day #9</h2></div>')
  day9()
  $('#main').append('<br><div id="day9part2"><h2>day #9 part 2</h2></div>')
  day9part2()
  $('#main').append('<br>')
})