
var input = [
  'value 5 goes to bot 2',
  'value 5 goes to bot 2\nbot 2 gives low to bot 1 and high to bot 0\nvalue 2 goes to bot 2',
`value 5 goes to bot 2
bot 2 gives low to bot 1 and high to bot 0
value 3 goes to bot 1
bot 1 gives low to output 1 and high to bot 0
bot 0 gives low to output 2 and high to output 0
value 2 goes to bot 2`,
  puzzleInput
 ]

 var day10 = function() {

  for (var i = 0; i < input.length; i++) {
    var botNumber = ''

    var commands = input[i].split(/\n/)
    // init bots
    var bots = []
    var outputs = []
    var botCommands = $.grep(commands, function (el) {
      return el.startsWith('value')
    })
    for (var j = 0; j < botCommands.length; j++) {
      var command = botCommands[j].split(/\s/)
      var value = Number(command[1])
      var botNo = Number(command[5])
      bots[botNo] === undefined ? bots[botNo] = [value] : bots[botNo].push(value)
    }
    // console.log(bots)
    // move commands
    var moves = $.grep(commands, function (el) {
      return el.startsWith('bot')
    })
    for (var j = 0; j < moves.length; j++) {
      var m = moves[j].split(/\s/)
      var bot = Number(m[1])
      var lowDestType = m[5]
      var lowDest = Number(m[6])
      var highDestType = m[10]
      var highDest = Number(m[11])
      // console.log(bot,lowDestType,lowDest,highDestType,highDest)
      if (bots[bot] === undefined || bots[bot].length < 2) {
        moves.push(moves[j])
        continue
      }
      var high = bots[bot][0] > bots[bot][1] ? bots[bot][0] : bots[bot][1]
      var low = bots[bot][0] < bots[bot][1] ? bots[bot][0] : bots[bot][1]
      bots[bot].pop()
      bots[bot].pop()
      if (high == 61  && low == 17) {
        botNumber = bot
      }
      if (lowDestType == 'bot') {
        bots[lowDest] === undefined ? bots[lowDest] = [low] : bots[lowDest].push(low)
      } else {
        outputs[lowDest] === undefined ? outputs[lowDest] = [low] : outputs[lowDest].push(low)
      }
      if (highDestType == 'bot') {
        bots[highDest] === undefined ? bots[highDest] = [high] : bots[highDest].push(high)
      } else {
        outputs[highDest] === undefined ? outputs[highDest] = [high] : outputs[highDest].push(high)
      }
    }

    // console.log(bots, outputs)
    $('#day10').append(input[i])
      .append('<br>&emsp;')
      .append(botNumber)
      .append('<br>')
  }
}

var day10part2 = function() {

  for (var i = 0; i < input.length; i++) {

    var commands = input[i].split(/\n/)
    // init bots
    var bots = []
    var outputs = []
    var botCommands = $.grep(commands, function (el) {
      return el.startsWith('value')
    })
    for (var j = 0; j < botCommands.length; j++) {
      var command = botCommands[j].split(/\s/)
      var value = Number(command[1])
      var botNo = Number(command[5])
      bots[botNo] === undefined ? bots[botNo] = [value] : bots[botNo].push(value)
    }
    // console.log(bots)
    // move commands
    var moves = $.grep(commands, function (el) {
      return el.startsWith('bot')
    })
    for (var j = 0; j < moves.length; j++) {
      var m = moves[j].split(/\s/)
      var bot = Number(m[1])
      var lowDestType = m[5]
      var lowDest = Number(m[6])
      var highDestType = m[10]
      var highDest = Number(m[11])
      // console.log(bot,lowDestType,lowDest,highDestType,highDest)
      if (bots[bot] === undefined || bots[bot].length < 2) {
        moves.push(moves[j])
        continue
      }
      var high = bots[bot][0] > bots[bot][1] ? bots[bot][0] : bots[bot][1]
      var low = bots[bot][0] < bots[bot][1] ? bots[bot][0] : bots[bot][1]
      bots[bot].pop()
      bots[bot].pop()
      if (lowDestType == 'bot') {
        bots[lowDest] === undefined ? bots[lowDest] = [low] : bots[lowDest].push(low)
      } else {
        outputs[lowDest] === undefined ? outputs[lowDest] = [low] : outputs[lowDest].push(low)
      }
      if (highDestType == 'bot') {
        bots[highDest] === undefined ? bots[highDest] = [high] : bots[highDest].push(high)
      } else {
        outputs[highDest] === undefined ? outputs[highDest] = [high] : outputs[highDest].push(high)
      }
    }

    // console.log(bots, outputs)
    var multiplication = outputs[0] * outputs[1] * outputs[2]
    $('#day10part2').append(input[i])
      .append('<br>&emsp;')
      .append(multiplication)
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day10"><h2>day #10</h2></div>')
  day10()
  $('#main').append('<br><div id="day10part2"><h2>day #10 part 2</h2></div>')
  day10part2()
  $('#main').append('<br>')
})