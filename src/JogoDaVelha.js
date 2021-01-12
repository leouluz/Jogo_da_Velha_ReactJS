import React, {useState, useEffect} from 'react';
import './JogoDaVelha.css'

function JogoDaVelha() {
  //Criação do array com 9 espaços
  const emptyBoard = Array(9).fill("") 

  const [board, setBoard] = useState(emptyBoard);  
  const [currentPlayer, setCurrentPlayer] = useState("O"); //Seta o jogador inicial
  const [winner, setWinner] = useState(null); // Seta vencedor como null

  //Verifica se existe um vencedor e define o proximo jogador caso não exista vencedor
  const handleCellClick = (index) =>{
    if (winner){
      return null;
    }
    if (board[index] !== "" ){
      return null;
    }

    setBoard(board.map(
      (item, itemIndex) => itemIndex === index ? currentPlayer : item));
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X"); 
  } 

  //Checa as possibilidades de vitoria/empate
  const  checkWinner = () => {
    const possibleWaysToWin = [
      [board[0],board[1],board[2]],
      [board[3],board[4],board[5]],
      [board[6],board[7],board[8]],

      [board[0],board[3],board[6]],
      [board[1],board[4],board[7]],
      [board[2],board[5],board[8]],
      
      [board[0],board[4],board[8]],
      [board[2],board[4],board[6]],
    ];
    
    checkDraw();

    possibleWaysToWin.forEach(cells =>{
      if (cells.every(cell => cell === "O")) setWinner("O Venceu!");
      if (cells.every(cell => cell === "X")) setWinner("X Venceu!");
    })
  }

  //Verifica se todos já foram selecionados e se existe um vencedor, caso não tenha empata
  const checkDraw = () =>{
    if (winner == null){
      if (board.every(item => item !== "")) setWinner("Empatou")
    }
  }
  
  //Seta todos os valores com os valores iniciais
  const handleReset = () =>{
    setCurrentPlayer("O")
    setBoard(emptyBoard);
    setWinner(null);
  }

  useEffect(checkWinner,[board]);
  return (
    <main>
      <h1 className="title">Jogo da Velha</h1>
      <div className={`board ${winner ? 'game-over' : ''}`}>
        {board.map((item, index) =>(
          <div 
          key={index}
          className={`cell ${item}`}
          onClick={() => handleCellClick(index)}
          >{item ? item : index}
            </div>
        ))}
      </div>
        {
          winner &&
          <footer>
            <div className="winnerNotification">
              <h2> {winner}</h2>
              <button
              onClick={handleReset}>Recomeçar</button>
            </div>
        </footer>
        }
    </main>
  );
}

export default JogoDaVelha;
