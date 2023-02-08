const gameBoard = (()=>{
    let board = new Array(9)
    const setsign = (index,sign)=>{
        board[index] = sign

    }
    return{
        board,
        setsign
    }
})();
const player = (sign,turn)=>{
    
    return{sign,turn}

}
const gameloop = (()=>{
    let winner
const setWinner = (_winner)=>{
     winner = _winner
}
const getWinner = ()=>{
    return winner;
}
 const checkforwin =(board)=>{
        console.log("hi")
        if(checkrow(board)||checkdiag(board)||checkcol(board)){
            return true
        }
        
 }
 const checkrow = (board)=>{
    for (let i = 0; i < 3; i++) {
        let row = []
        for (let j = i * 3; j < i * 3 + 3; j++) {
            row.push(board[j]);
        }

        if (row.every(field => field == 'X') || row.every(field => field == 'O')) {
            setWinner(row[0])
            return true;
        }
    }
    return false;
        
 }
 const checkcol = (board) => {
    for (let i = 0; i < 3; i++) {
        let column = []
        for (let j = 0; j < 3; j++) {
            column.push(board[i + 3 * j]);
        }

        if (column.every(field => field == 'X') || column.every(field => field == 'O')) {
            setWinner(column[0])
            return true;

        }
    }
    return false;
}

const checkdiag = (board) => {
    const diagonal1 = [board[0], board[4], board[8]];
    const diagonal2 = [board[6], board[4], board[2]];
    if (diagonal1.every(field => field == 'X') || diagonal1.every(field => field == 'O')) {
        setWinner(diagonal1[0])
        return true;
    }
    else if (diagonal2.every(field => field == 'X') || diagonal2.every(field => field == 'O')) {
        setWinner(diagonal2[0])
        return true;
    }
}
const endgame = (winner)=>{

    const text = document.getElementById("text")
    text.innerHTML = winner + "is the winner"
}
return{checkforwin,winner,endgame,getWinner}

})();
const render = (()=>{
    const fieldNotOccupied = (field) =>{
        if( typeof field==="undefined"){
           
            return true
        }
        else{
            console.log("kiy")
            console.log(field)
        return false}
    }
    const iniitialize = (()=>{
        const player1 = player("X",true)
        const player2 = player("O",true)        
        var board = document.querySelectorAll(".item")
        for(let i=0;i<board.length;i++){
            board[i].addEventListener("click",()=>{
                if(fieldNotOccupied(gameBoard.board[i])){
                board[i].innerHTML = playerController.getturn(player1,player2)
                gameBoard.setsign(i,board[i].innerHTML)
                if(gameloop.checkforwin(gameBoard.board)){
                        gameloop.endgame(gameloop.getWinner())
                }
                console.log(gameBoard.board)}
            })
        }
    })()
})()
const playerController =(()=>{
    const getturn = (player1,player2)=>{
        if(player1.turn == true){
            player1.turn = false
            player2.turn = true
            return player1.sign
        }
        if(player2.turn == true){
            player2.sign
            player1.turn = true
            player2.turn = false
            return player2.sign
        }
    }
    return{getturn}
})();
