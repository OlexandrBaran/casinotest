import { MdPersonPin } from "react-icons/md";
import { FaTimes } from 'react-icons/fa';
import React, {useState} from 'react'


function App() {

  
  const [balance, setBalance] = useState(99)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [userName, setUserName] = useState('guest')
  const [slotNumbers, setSlotNumbers] = useState([ , , ])
  const [answerMessage, setAnswerMessage] = useState('click start')
  const [dynamicTable, setDynamicTable] = useState([])
  
  let tableData = []
  tableData = dynamicTable

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDynamicTable(tableData)
  };

  const openGame = () => {
    setIsGameOpen(true);
  };

  const closeGame = () => {
    setIsGameOpen(false);
  };

  const resetUserName = () => {
    setUserName(document.getElementById('userName').value)
  };

  const playGame = () => {
    setBalance(balance - 1);

    let firstSlotNumber = Math.floor(Math.random() * 10); 
    let secondSlotNumber = Math.floor(Math.random() * 10);
    let thirdSlotNumber = Math.floor(Math.random() * 10);

    setSlotNumbers([firstSlotNumber, secondSlotNumber, thirdSlotNumber])

    if (firstSlotNumber === secondSlotNumber && secondSlotNumber === thirdSlotNumber) {
      setAnswerMessage('you win + 5$');
      setBalance(balance + 5);
      if (firstSlotNumber === 7 && secondSlotNumber === 7 && thirdSlotNumber === 7 ) {
        setBalance(balance + 5);
      }
      
    } else if (firstSlotNumber === secondSlotNumber || secondSlotNumber === thirdSlotNumber || firstSlotNumber === thirdSlotNumber) {
      setAnswerMessage('you have coincidence + 0.5$');
      setBalance(balance + 0.5);
    } else {
      setAnswerMessage('you lose');
    }

    let element = []
    element.push(firstSlotNumber);
    element.push(secondSlotNumber);
    element.push(thirdSlotNumber);
    let d = new Date();
    element.push(`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`)

    tableData.push(element)

  };

  const fake777 = () => {
      setSlotNumbers([7,7,7])
      setBalance(balance + 10)
      setAnswerMessage('WOW 777 !!!')
  };

  const createTable = () => {
    let table = []
    table.push(
      <tr className="table-row-header">
        <td>ID</td>
        <td>Slot 1</td>
        <td>Slot 2</td>
        <td>Slot 3</td>
        <td>Time</td>
      </tr>)

    // Outer loop to create parent
    for (let i = 0; i < tableData.length; i++) {
      let children = []
      
      children.push(<td>{i + 1}</td>)
      //Inner loop to create children
      for (let j = 0; j < 4; j++) {
        children.push(<td>{tableData[i][j]}</td>)
      }
      //Create the parent and add the children
      table.push(<tr>{children}</tr>)
    }
    return table
  }


  return (
    <>
      <header className="header">
        <div className='header-logo'>
          <h3>casino logo</h3>
        </div>

        <div className="header-container">
          <span>$ {balance}</span>
          <button className="header-container__btn" onClick={openModal} >
          <MdPersonPin />
          </button>
        </div>

        <div className={`${
        isModalOpen ? 'modal-overlay show-modal' : 'modal-overlay'
      }`}
          >
          <div className="modal-container">
          <h3>Enter your name:</h3>
          <input type="text" size="40" id="userName"></input>
          <button className="modal-container_btn__ok"  onClick={resetUserName} >Ok!</button>
        <button className='close-modal-btn' onClick={closeModal}>
          <FaTimes></FaTimes>
        </button>
          </div>
        </div>
      </header>
      
      <main className="content">
          
        <h1>Hello {userName}</h1>
        <button className="btn-startgame" onClick={openGame}> START Game!</button>

        <table className="game-table" id="table">
         {createTable()}
        </table>


        <div className={`${
        isGameOpen ? 'modal-overlay show-modal' : 'modal-overlay'
      }`}>
        <div className="modal-container game-container">
          <div className="casino-continer">
            <span className="slot">{slotNumbers[0]}</span>
            <span className="slot">{slotNumbers[1]}</span>
            <span className="slot">{slotNumbers[2]}</span>
          </div>
          
          <div className="section-btn">
            <button className="btn-start" onClick={playGame}> START!</button>
            <button className="btn-777" onClick={fake777}> 777!</button>
            <button className="btn-close" onClick={closeGame}> CLOSE!</button>
          </div>
          
          <div className="casino-message">{answerMessage}</div>
        </div>
      </div>
      </main>
      <footer className="footer">
        <p> © 2021 Alex Baran. All rights reserved</p>
      </footer>
    </>
  );
}

export default App;
