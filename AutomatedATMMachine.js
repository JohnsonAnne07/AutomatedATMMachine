/**
 *   @author Meyerson, Gabe (gabemeyerson@gmail.com)
 *   @version 0.0.2
 *   @summary An ATM || created: 11.16.16
 *   @todo
 */

"use strict";
const PROMPT = require('readline-sync');
const IO = require(`fs`); 

let continueResponse;
let cardNumber, pin;
let accounts = []; //card number, pin, last, first, number of accounts, balance of checking, balance of savings


function main(){
    setContinueResponse();
    while (continueResponse === 1) {
        populateAccounts();
        setCardNumber();
        setPIN();
    }
}

main();

function setContinueResponse() {
    if(typeof continueResponse !== 'undefined') {
        continueResponse = -1;
        while(continueResponse !== 0 && continueResponse !== 1){
            continueResponse = Number(PROMPT.question('\nDo you want to continue? [0=No, 1=Yes]'));
        }
    } else {
        continueResponse = 1
    }
}

function populateAccounts() {
    let fileContents = IO.readFileSync('data.csv' , 'utf8');
    let lines = fileContents.toString().split(/\r?\n/);
    for (let i = 0; i < accounts.length; i++){
        accounts.push(lines[i].toString().split(/,/));
    }
}
function setCardNumber(){
    const CARD_NUMBER = 0;
    while (typeof cardNumber === 'undefined' || !/[0-9]{4}/.test(cardNumber)) {
        cardNumber = PROMPT.question('\nPlease enter your card number: ');
    }
    for (let i = 0; i < accounts.length; i++){
        if (cardNumber  === accounts[i][CARD_NUMBER]){
            break;
        } 
        return setCardNumber();
    }
}

function setPIN() {
    const PIN = 1;
    while (typeof pin === 'undefined' || !/[0-9]{3}/.test(pin)){
        pin = PROMPT.question('\nPlease enter your personal PIN Number:')
    }
    for (let i = 0; i < accounts.length; i++){
        if(pin === accounts [i][PIN]){
            break;
        } 
        return setPIN;
    }
    
}