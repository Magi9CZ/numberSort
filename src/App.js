import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const DraggableNumber = ({ number, index, moveNumber }) => {
  const [, drag] = useDrag({
    type: 'NUMBER',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'NUMBER',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveNumber(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
      <div
          ref={(node) => drag(drop(node))}
          style={{
            margin: '5px',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            cursor: 'move',
            textAlign: 'center',
          }}
      >
        {number}
      </div>
  );
};

const NumberSequence = (props) => {
  const initialNumbers = props.data.numbers;
  const [numbers, setNumbers] = useState([]);
  const [isSequenceCorrect, setIsSequenceCorrect] = useState(false);

  useEffect(() => {
    // Při prvním renderu přiřaďte náhodné zpřeházení čísel
    setNumbers([...initialNumbers].sort(() => Math.random() - 0.5));
  }, [initialNumbers]);

  useEffect(() => {
      handleState();
  }, [numbers, 1]);

  const moveNumber = (fromIndex, toIndex) => {
    const updatedNumbers = [...numbers];
    const [movedNumber] = updatedNumbers.splice(fromIndex, 1);
    updatedNumbers.splice(toIndex, 0, movedNumber);
    setNumbers(updatedNumbers);
  };

  const checkSequence = () => {
    const isCorrect = JSON.stringify(numbers) === JSON.stringify(initialNumbers);
    setIsSequenceCorrect(isCorrect);
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '10px',
  };

  function answer(){
      console.log("funkce answer app: " + numbers);
      props.odpoved(numbers);
  }

  function handleState() {
      console.log("změna");
      props.onChange({initial: initialNumbers, userNumbers: numbers});
  }

  if (props.play == true) {

      return (
          <div style={{padding: '20px'}}>
              <h2>Upravujte číselnou řadu</h2>
              <div style={containerStyle}>
                  {numbers.map((number, index) => (
                      <DraggableNumber key={index} number={number} index={index} moveNumber={moveNumber}/>
                  ))}
              </div>
              <button onClick={answer}>Uložit odpověď</button>
              {isSequenceCorrect && <p>Číselná řada je správná!</p>}
              {!isSequenceCorrect && <p>Číselná řada není správná. Opravte ji a zkuste znovu.</p>}
          </div>
      );
  } else if (props.play == false){
      return (
          <div style={{padding: '20px'}}>
              <h3>Vaše odpověď</h3>
              <div style={containerStyle}>
                  {props.restoreData.map((number, index) => (
                      <DraggableNumber key={index} number={number} index={index}/>
                  ))}
              </div>
          </div>
      );
  }
};

const App = (props) => {

    function appAnswer(numbers) {
        props.odpoved(numbers);
    }

    function handleState(e) {
        props.checkState(e);
        console.log("mezistav init: " + e.initial);
        console.log("mezistav current: " + e.userNumbers);
    }

  return (
      <DndProvider backend={HTML5Backend}>
        <NumberSequence data={props.data} restoreData={props.saved} odpoved={appAnswer} play={props.readOnly} onChange={handleState}/>
      </DndProvider>
  );
};

export default App;
