import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function Question_numberSort() {

    let playable = true;

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
                <App data={config} odpoved={Question_numberSort.prototype.answer} readOnly={playable}/>
            </React.StrictMode>
        );
    };


    Question_numberSort.prototype.onlyShowInit = function (questionKey, location, config) {
        this.questionKey = questionKey;
        this.location = location;
        this.config = config;
        playable = false;

        var self = this;



        //init save & cancel answer handlers pro tlačítka
        const root = ReactDOM.createRoot(document.getElementById('root'));
        console.log(config);
        root.render(
            <React.StrictMode>
                <App data={config} readOnly={playable} saved={numbersAnswer}/>
            </React.StrictMode>
        );
    };

    let numbersAnswer = {};

    Question_numberSort.prototype.answer = function (odp) {
        numbersAnswer = odp;
        console.log(numbersAnswer);
    };

    /**
     * Returns data for recovery
     * @returns {string}
     */
    Question_numberSort.prototype.recoveryData = function () {

    };

    /**
     * Restore application and disable moving
     * @param data
     */
    Question_numberSort.prototype.restore = function (data) {

    };
}
export default Question_numberSort;