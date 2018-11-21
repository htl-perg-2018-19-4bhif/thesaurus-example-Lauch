import { exists } from "fs";

if(process.argv.length < 3){
    console.log("Please specify words");
    process.exit(0);
}

let ar = new Array();
let lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('openthesaurus.txt')
});

lineReader.on('line', function (line) {
    ar.push(line);
});

lineReader.on('close', function (line) {
    let lines = new Array();
    for (let i = 0; i < ar.length; i++) {
        lines = ar[i].split(";");
        ar[i] = lines;
    }
    for(let i = 2; i < process.argv.length; i++){
        check(process.argv[i]);
    }

    function check(word){
        let isThere = false;
        for(let i = 0; i < ar.length; i++){
            for(let j = 0; j < ar[i].length;j++){
                if(ar[i][j].search(word) != -1){
                    isThere = true;
                    printOut(word, ar[i]);
                }
            }
        }
        if(isThere == false){
            console.log(" No matches found");
            process.exit(0);
        }
    }
    function printOut(word, line){
        console.log(word+ ": \n");
        for(let i = 0; i < line.length; i++){
            if(line[i] != word){
                console.log(line[i]);
            }
        }
    }
});
