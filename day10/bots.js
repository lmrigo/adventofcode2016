
var input = [
  'value 5 goes to bot 2',
  'value 5 goes to bot 2\nbot 2 gives low to bot 1 and high to bot 0',
`value 5 goes to bot 2
bot 2 gives low to bot 1 and high to bot 0
value 3 goes to bot 1
bot 1 gives low to output 1 and high to bot 0
bot 0 gives low to output 2 and high to output 0
value 2 goes to bot 2`,
  // puzzleInput
 ]

 var day10 = function() {

  for (var i = 0; i < input.length; i++) {

    var commands = input[i].split(/\n/)
    // init bots
    var bots = []
    var botCommands = $.grep(commands, function (el) {
      return el.startsWith('value')
    })
    for (var j = 0; j < botCommands.length; j++) {
      var command = botCommands[j].split(/\s/)
      var value = command[1]
      var botNo = command[5]
      bots[botNo] === undefined ? bots[botNo] = [value] : bots[botNo].push(value)
    }
    console.log(bots)
    // move commands
    var moves = $.grep(commands, function (el) {
      return el.startsWith('bot')
    })
    for (var j = 0; j < moves.length; j++) {
      var m = moves[j].split(/\s/)
      var bot = m[1]
      var lowDestType = m[5]
      var lowDest = m[6]
      var highDestType = m[10]
      var highDest = m[11]
    }
    var botNumber = ''
    $('#day10').append(input[i])
      .append('<br>&emsp;')
      .append(botNumber)
      .append('<br>')
  }
}

var day10part2 = function() {

  for (var i = 0; i < input.length; i++) {


    $('#day10part2').append(input[i])
      .append('<br>&emsp;')
      .append()
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