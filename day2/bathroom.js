
var input = [
  'ULL\n'+
  'RRDDD\n'+
  'LURDL\n'+
  'UUUUD',
  'LLULLLRLDLLLRLUURDDLRDLDURULRLUULUDDUDDLLLURRLDRRLDRRRLDUDLRDLRRDLLDUDUDUDRLUDUUDLLLRDURUDUULUDLRDUUUDUUDURLDUULLRDLULDUURUDRDDLDRLURLRURRDUURLRLUURURUUULLRLLULRUURLULURDLLRRUDLUDULDRDRLRULUURRDRULLRUUUDLRLDLUURRRURDLUDDRRUDRLUDRDLLLLLRULLDUDRLRRDDULDLRUURRRRRLDLDLRDURDRUUURDLRDDDDULURRRRDUURLULLLDLRULRDULRUDLRRLRDLLRLLLUDDLRDRURDDLLLLDUDRDLRURRDLRDDDLDULDRLRULUUDRRRUUULLLURRDDUULURULDURRLLULLDRURUUULRLRDRRUDRDRRDURRUUUULDRDDDUDLDDURLLRR\n' +
  'LDLRRRUURDLDDRLRRDLLULRULLLUDUUDUDLRULLDRUDRULLDULURDRDDLRURDDULLLLDLRDRDRDDURLURLURLUDRDDRDULULUDDRURRDLLDUURDRDDLRLLURRDLRDDULDLULURDRDLUDRRUUDULLULURRDUDRUUUDRULDLDURLRRUDURLDLRRUURRRURDLUDRLDUDRRUDUURURUDDUUDRDULRDLUDRRRLDRURLLRDDDLUDRDUDURDDDRRDDRRRLLRRDDLDDLRUURRURDLLDRLRRDLLUDRRRURURLRDRLLRLRLRULLRURLDLRRULLRRRDULUUULDRDLLURDDLDLRDRLUUDLLUDDLDRRLDLRUDRUDLLUURLLULURUDUDRLULLUDRURDDLDLDDUDLRDDRRURLRLLUDDUDRUURRURRULDRLDDRLLRRLDDURRDLDULLLURULLLRUURLRRRRUUULRLLLURRLRLRUDRDUUUDUUUDDLULLDLLLLDLDRULDRUUULDDDLURLDLRLULRUDDDDURDDLU\n' +
  'RURLURRDLDULLULDDDLRUULLUURLRUDRUDRRUDDLDDDDRRDLRURLRURLDDDUDDUURRDRULDRRRULRDRDDLRUDULRLURDUUDRRLDLRDRURDLDRRRRDRURUUDDDLLRDRDUDUDUDLLULURULRRLRURUULUULDDDDURULRULLRUDUURLURDUDLUDLUDRLLDUUDUULRLRLUUDRDULDULRURDRRRULRUDLRURDDULUDULLRLRURURUULLULDRURLLRRUUDDUUURRDLURUURULRDRRDDUDULRDDLUDLURURUURDRULLRDDLLRDDLDRDUDRRDLUURRLRLUURRULUDURLDDRLLURRDDDLDDRURULLDDRLUDDLRLURDUDULLRDULLLDLLUDDRUDRUDDUUDRDRULRL\n' +
  'RLRDRDULULUDLUDRDRLUDLDLLUDURULDDDUDLRURLLRLRLDLDRLDURDLRRURLULLULURLLDRRDRLUDRLRDLLULRULURRURURUULRDUDLLRDLRRRRRLUURDRRRDLRUDLLDLLDLRUUUDLLLDDDLRDULLRUUDDRLDDURRRDLRLRLDDDDLRDRULLUURUUDRRLLRLLRDDLLRURRRRDRULRRLLRLLLRLDRRLDDDURRURLDURUURRLRLRLDRURULLRLRUDLDUURDLLRLDLURUUUDLLRDRDDDDDDRLDRRRLRRRRURUDLDDRDLLURUDLRRLDDDLUDUDUULRDULULUDDULUUDLLLLRLDDUUULRLRDULURDURRRURRULURRRDRDLDDURDLURUDURRRDDRLRLUDLUDDLUULLDURLURDDUDDLRUUUDRLLDRURL\n' +
  'ULUDLLUDDULRUURDRURDUDUDLUURDDDRRLUDURURDRURRLDRDURLRLLRRDDRRDRRRUULURUDURUDULRRRRDDLDURRLRRDUDDDRLLLULDRLRLURRDUURDURRRURRDLUDUDDRLDLURRRDDRLLRDRDDRDURRRRLURRLUDDURRULRUDUDULDRUDDRULLUUULDURRRLDRULLURULLRUDLDUDDLDULDLUUDRULULDLLDRULLRUULDUDUUDRLRRLDLUULUDLLDDRLRRDDLLURURDULRRDDRURDRLRLULDLDURULLUUUDURURDLDUDDDDUUULUDLUURRULLDLRLURDLURLRLDDURRLDDRRRDUUULLUULDLLDLLDDRLRRUDLULDRLULDULULRRLRULUUURURUUURDUUDDURLLUDDRLRDDLUURRUULRDLDDRLULUULRDRURLUURDRDUURUDLRR'
]
var day2 = function() {

  for (var i = 0; i < input.length; i++) {
    var digits = ''

    var paths = input[i].split(/\s/)
    var digit = 5
    for (var j = 0; j < paths.length; j++) {
      var line = paths[j]
      for (var k = 0; k < line.length; k++) {
        switch (line.charAt(k)) {
          case 'U': digit > 3 ? digit -= 3 : digit; break;
          case 'R': digit % 3 === 0 ? digit : digit += 1; break;
          case 'D': digit < 7 ? digit += 3 : digit; break;
          case 'L': (digit - 1) % 3 === 0 ? digit : digit -= 1; break;
        }
        // console.log(line.charAt(k) + ':' +digit)
      }
      digits += digit
    }
    console.log(digits)
    $('#day2').append(input[i])
      .append('<br>&emsp;')
      .append(digits)
      .append('<br>')
  }
}

var day2part2 = function() {

  var pad = {
    '1': function(dir) {
      switch (line.charAt(k)) {
        case 'D': return '3'; break;
        default: return '1';
      }
    },
    '2': function(dir) {
      switch (dir) {
        case 'R': return '3'; break;
        case 'D': return '6'; break;
        default: return '2';
      }
    },
    '3': function(dir) {
      switch (dir) {
        case 'U': return '1'; break;
        case 'R': return '4'; break;
        case 'D': return '7'; break;
        case 'L': return '2'; break;
      }
    },
    '4': function(dir) {
      switch (dir) {
        case 'D': return '8'; break;
        case 'L': return '3'; break;
        default: return '4';
      }
    },
    '5': function(dir) {
      switch (dir) {
        case 'R': return '6'; break;
        default: return '5';
      }
    },
    '6': function(dir) {
      switch (dir) {
        case 'U': return '2'; break;
        case 'R': return '7'; break;
        case 'D': return 'A'; break;
        case 'L': return '5'; break;
      }
    },
    '7': function(dir) {
      switch (dir) {
        case 'U': return '3'; break;
        case 'R': return '8'; break;
        case 'D': return 'B'; break;
        case 'L': return '6'; break;
      }
    },
    '8': function(dir) {
      switch (dir) {
        case 'U': return '4'; break;
        case 'R': return '9'; break;
        case 'D': return 'C'; break;
        case 'L': return '7'; break;
      }
    },
    '9': function(dir) {
      switch (dir) {
        case 'L': return '8'; break;
        default: return '9';
      }
    },
    'A': function(dir) {
      switch (dir) {
        case 'U': return '6'; break;
        case 'R': return 'B'; break;
        default: return 'A';
      }
    },
    'B': function(dir) {
      switch (dir) {
        case 'U': return '7'; break;
        case 'R': return 'C'; break;
        case 'D': return 'D'; break;
        case 'L': return 'A'; break;
      }
    },
    'C': function(dir) {
      switch (dir) {
        case 'U': return '8'; break;
        case 'L': return 'B'; break;
        default: return 'C';
      }
    },
    'D': function(dir) {
      switch (dir) {
        case 'U': return 'B'; break;
        default: return 'D';
      }
    }
  }

  for (var i = 0; i < input.length; i++) {
    var digits = ''

    var paths = input[i].split(/\s/)
    var digit = '5'
    for (var j = 0; j < paths.length; j++) {
      var line = paths[j]
      for (var k = 0; k < line.length; k++) {
        digit = pad[digit](line.charAt(k))
        console.log(line.charAt(k) + ':' +digit)
      }
      digits += digit
    }
    console.log(digits)
    $('#day2part2').append(input[i])
      .append('<br>&emsp;')
      .append(digits)
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day2"><h2>day #2</h2></div>')
  day2()
  $('#main').append('<br><div id="day2part2"><h2>day #2 part 2</h2></div>')
  day2part2()
  $('#main').append('<br>')
})