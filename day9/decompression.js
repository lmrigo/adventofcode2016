
var input = [
  'ADVENT',
  'A(1x5)BC',
  '(3x3)XYZ',
  'A(2x2)BCD(2x2)EFG',
  '(6x1)(1x3)A',
  'X(8x2)(3x3)ABCY',
  '(27x12)(20x12)(13x14)(7x10)(1x12)A',
  '(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN',
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

var expandSection = function (section) {
  var length = 0
  for (var i = 0; i < section.length; i++) {
    var ch = section.charAt(i)
    if (ch != '(') {
      length++
    } else {
      var copyLength = ''
      var nextCh = section.charAt(++i)
      do {
        copyLength += nextCh
        nextCh = section.charAt(++i)
      } while (nextCh != 'x')

      var copyTimes = ''
      nextCh = section.charAt(++i)
      do {
        copyTimes += nextCh
        nextCh = section.charAt(++i)
      } while (nextCh != ')')

      // count decompression
      copyLength = Number(copyLength)
      copyTimes = Number(copyTimes)

      var subSection = section.substr(++i, copyLength)
      // console.log(section, subSection)
      length += expandSection(subSection) * copyTimes

      i += copyLength-1
    }
  }
  return length
}

var day9part2 = function() {

  for (var i = 0; i < input.length; i++) {

    var compressed = input[i].replace(/\s/g, '')
    var length = expandSection(compressed)

    $('#day9part2').append(input[i])
      .append('<br>&emsp;')
      .append(length)
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