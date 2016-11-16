/**
 *   @author Meyerson, Gabe (gabemeyerson@gmail.com)
 *   @version 0.0.2
 *   @summary An ATM || created: 11.16.16
 *   @todo
 */

"use strict";
const PROMPT = require('readline-sync');

let continueResponse;
let cardNumber;

function main(){
    setContinueResponse();
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

function insertCardNumber(){
    while(typeof cardNumber === 'undefined' || cardNumber !== /[0-9]{4}/) {
        cardNumber = PROMPT.question('\nPlease enter your card number: ');
    }
    for (let i = 0; i < accounts.length; i++){

    }
}