//1.deposit some money
//2. determine the number of lines to bet on
//3. Coolect a bet amount 
//4. SPin the slot machine
//5. Check if the user won
//6. give tthe user their winnings.
//7. play agiain

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C:6,
    D:8,
    
}

const SYMBOLS_VALUE = {
    A: 5,
    B: 4,
    C:3,
    D:2,
    
}






const deposit  = () => {
    while(true){
        const depositAmount =prompt("Enter a deposit amount: ")
        const numberDepositAmount = parseFloat(depositAmount);

        if(isNaN(numberDepositAmount) || numberDepositAmount <=0){
            console.log("Invalid deposit amount, try again.");
        }else {
            return numberDepositAmount;
        }
    }
};

const getNumberofLines = () => {
    while(true){
        const lines =prompt("Enter the numebr of lines to bet on (1-3): ");
        const NumberOflines = parseFloat(lines);

        if(isNaN(NumberOflines) || NumberOflines <=0 || NumberOflines > 3){
            console.log("Invalid lines, try again.");
        }else {
            return NumberOflines;
        }
    }
};

const getBet = (balance, lines) =>{
    while(true){
        const bet =prompt("Enter the bet per line: ")
        const numberBet = parseFloat(bet);

        if(isNaN(numberBet) || numberBet <=0 || numberBet > balance/ lines){
            console.log("Invalid bet, try again.");
        }else {
            return numberBet;
        }
    }
}


const spin = () => {
    const symbols = [];
    for(const[symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0; i < count; i++){
            symbols.push(symbol);
        }
        
    }

    const reels = [];

    for(let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbols =[...symbols];
        for(let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex]
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    //console.log(symbols);

    return reels;
};

const transpose = (reels) => {
    const  rows = [];
    
    for(let i = 0; i < ROWS; i++){
        rows.push([]);
        for(let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

const printrows = (rows) => {
    for (const row of rows){
        let rowString = "";
        for ( const [i, symbol] of row.entries()){
            rowString += symbol
            if (i != row.length -1){
                rowString += " | "
            }
        }
        console.log(rowString)
    }
}

const getWinnings = (rows, bet, Lines) => {
    let winnings = 0;

    for(let row = 0; row < Lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols ){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if(allSame){
            winnings += bet * SYMBOLS_VALUE[symbols[0]]
        }
    }

    return winnings;
};

const game = () => {
    let balance = deposit();

    while(true){
        console.log("You have a balance of $" + balance);
        const NumberOflines = getNumberofLines();
        const bet = getBet(balance, NumberOflines);
        balance -= bet *NumberOflines;
        const reels = spin();
        const rows = transpose(reels);
        printrows(rows);
        const winnings = getNumberofLines(rows, bet, NumberOflines);
        balance += winnings;
        
        console.log("You won, $" + winnings.toString());

        if(balance <= 0){
            console.log("you ran out of the money!");
            break;
        }

        const playAgain = prompt("Do you want to play again(y/n)?");

        if(playAgain != "y")
        break;
    }

};

game();







