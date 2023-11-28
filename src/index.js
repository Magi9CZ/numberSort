import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

function Question_numberSort() {

    let playable = true;
    let initialLine;
    let numbers = {};
    let savedNumbers = {}

    Question_numberSort.prototype.init = function (questionKey, location, config) {
        this.questionKey = questionKey;
        this.location = location;
        this.config = config;

        var self = this;



        //init save & cancel answer handlers pro tlačítka
        const root = ReactDOM.createRoot(document.getElementById('root'));
        console.log(config);
        root.render(
            <React.StrictMode>
                <App data={config} odpoved={saveAnswer} readOnly={playable} checkState={stavHry}/>
            </React.StrictMode>
        );
    };

    function stavHry(e) {
        numbers = e.userNumbers;
        initialLine = e.initial;
    }


    Question_numberSort.prototype.onlyShowInit = function (questionKey, location, config) {
        this.questionKey = questionKey;
        this.location = location;
        this.config = config;
        playable = false;

        var self = this;

        //init save & cancel answer handlers pro tlačítka
        const root = ReactDOM.createRoot(document.getElementById('root'));
        console.log(config);
        console.log(numbers);
        root.render(
            <React.StrictMode>
                <App data={config} readOnly={playable} saved={numbers} checkState={stavHry}/>
            </React.StrictMode>
        );
    };


    function saveAnswer(odp) {
        numbers = odp;
        checkAnswer();
    }

    function checkAnswer() {
        console.log("finalni: " + numbers);
    }

    Question_numberSort.prototype.answer = function () {
        savedNumbers = numbers;
        const odpoved = {numbers};
        return odpoved;

    };

    /**
     * Returns data for recovery
     * @returns {string}
     */
    Question_numberSort.prototype.recoveryData = function () {
        const stav = {initialLine, numbers}
        return stav;
    };

    /**
     * Restore application and disable moving
     * @param data
     */
    Question_numberSort.prototype.restore = function (data) {
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(
            <React.StrictMode>
                <App data={data} readOnly={playable} saved={savedNumbers} checkState={stavHry}/>
            </React.StrictMode>
        );
    };
}
export default Question_numberSort;