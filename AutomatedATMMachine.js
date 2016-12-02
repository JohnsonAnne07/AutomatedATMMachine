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
let currentUser = []; //the SD array that is created when you enter the card number


function main() {
    setContinueResponse();
    while (continueResponse === 1) {
        populateAccounts();
        setCardNumber();
        setCurrentUser();
        setPIN();
    }
}

main();

function setContinueResponse() {
    if (typeof continueResponse !== 'undefined') {
        continueResponse = -1;
        while (continueResponse !== 0 && continueResponse !== 1) {
            continueResponse = Number(PROMPT.question('\nDo you want to continue? [0=No, 1=Yes]'));
        }
    } else {
        continueResponse = 1
    }
}

function populateAccounts() {
    let fileContents = IO.readFileSync('data.csv', 'utf8');
    let lines = fileContents.toString().split(/\r?\n/);
    for (let i = 0; i < accounts.length; i++) {
        accounts.push(lines[i].toString().split(/,/));
    }
}
function setCardNumber() {
    console.log('top of setcardnumber');
    const CARD_NUMBER = 0;
    let found = 0;
    while (typeof cardNumber === 'undefined' || !/[0-9]{4}/.test(cardNumber)) {
        cardNumber = PROMPT.question('\nPlease enter your card number: ');
    }
    for (let i = 0; i < accounts.length; i++) {
        console.log('for loop');
        if (cardNumber === accounts [i][CARD_NUMBER]) {
            console.log('if card number is real');
            found = 1;
            break;
        }
    }
    if (found === 0) {
        console.log('WRONG!™');
        //return setCardNumber();
    }
}

function setPIN() {
    const PIN = 1;
    let found = 0;
    while (typeof pin === 'undefined' || !/[0-9]{3}/.test(pin)) {
        pin = PROMPT.question('\nPlease enter your Personal PIN Number: ');
    }
    if (pin !== currentUser [PIN]) {
        console.log('WRONG!™');
        return setPIN();
    }
}

function setCurrentUser() {
    currentUser = accounts[cardNumber]; //HOW DOES THIS WORK
}

function displayUserMenu() {
    const NUMBER_OF_ACCOUNTS = 5, ONE_ACCOUNT = 1;
    if(currentUser[NUMBER_OF_ACCOUNTS] === ONE_ACCOUNT){
        console.log('1: View account balance\n2: Withdraw money\n3: Deposit money');
    } else {
        console.log('1: View account balance\n2: Withdraw money\n3: Deposit money\n4: Transfer money');
    }
}