"use strict";
exports.__esModule = true;
if (process.argv.length < 3) {
    console.log("Please specify words");
    process.exit(0);
}
var ar = new Array();
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('openthesaurus.txt')
});
lineReader.on('line', function (line) {
    ar.push(line);
});
lineReader.on('close', function (line) {
    var lines = new Array();
    for (var i = 0; i < ar.length; i++) {
        lines = ar[i].split(";");
        ar[i] = lines;
    }
    for (var i = 2; i < process.argv.length; i++) {
        check(process.argv[i]);
    }
    function check(word) {
        var isThere = false;
        for (var i = 0; i < ar.length; i++) {
            for (var j = 0; j < ar[i].length; j++) {
                if (ar[i][j].search(word) != -1) {
                    isThere = true;
                    printOut(word, ar[i]);
                }
            }
        }
        if (isThere == false) {
            console.log(" No matches found");
            process.exit(0);
        }
    }
    function printOut(word, line) {
        console.log(word + ": \n");
        for (var i = 0; i < line.length; i++) {
            if (line[i] != word) {
                console.log(line[i]);
            }
        }
    }
});
