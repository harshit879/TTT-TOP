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
const player = (sign,turn,ishuman)=>{
    
    return{sign,turn,ishuman}

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
            endgame(getWinner())
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
    const setplayertwo = ()=>{
        const ele = document.querySelectorAll("input[type='radio']")
        return new Promise((resolve, reject) => {
            ele.forEach(element => {
                element.addEventListener("click",()=>{
                   
                        if(element.value == "human"){
                            resolve(true)
                        }
                        else{
                            resolve(false)
                        }
                    
                })            
            });
        })
        
    }
    const iniitialize = (async()=>{
        const secondplayer = await setplayertwo();
        const player1 = player("X",true,true)
        const player2 = player("O",false,secondplayer)        
        var board = document.querySelectorAll(".item")
        for(let i=0;i<board.length;i++){
            board[i].addEventListener("click",()=>{
                if(fieldNotOccupied(gameBoard.board[i]))
                    {
                        playerController.playturn(player1,player2,board,i)
                        gameloop.checkforwin(gameBoard.board)      
                    }
            })
        }
    })()
    return {fieldNotOccupied}
})()
const playerController =(()=>{
    const getfield = (board)=>{
        var empty =[]
        for(let i=0;i<board.length;i++){
            if(render.fieldNotOccupied(board[i])){
                empty.push(i)
            }
        }
        return empty[Math.floor(Math.random()*empty.length)];
    }
    const playturn = (player1,player2,htmlboard,index)=>{
        
        if(player1.turn == true){
            player1.turn = false
            player2.turn = true
            htmlboard[index].innerHTML = player1.sign
            gameBoard.setsign(index,htmlboard[index].innerHTML)
            if(player2.turn == true && player2.ishuman == false){
                player1.turn = true
                player2.turn = false
                var AImove = getfield(gameBoard.board)
                htmlboard[AImove].innerHTML = player2.sign
                gameBoard.setsign(AImove,player2.sign)
            }
        }
        //for two players
        else if(player2.turn == true && player2.ishuman == true){
            player2.sign
            player1.turn = true
            player2.turn = false
            htmlboard[index].innerHTML = player2.sign
            gameBoard.setsign(index,player2.sign)
        }
        
    }
    return{playturn}
})();
