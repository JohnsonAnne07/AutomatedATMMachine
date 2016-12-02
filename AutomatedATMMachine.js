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
let cardNumber, pin, userChoice, temp;
let accounts = []; //card number, pin, last, first, number of accounts, balance of checking, balance of savings
let currentUser = []; //the SD array that is created when you enter the card number

const CARD_NUMBER = 0, PIN = 1, LAST_NAME = 2, FIRST_NAME = 3, NUMBER_OF_ACCOUNTS = 4, BALANCE_OF_CHECKING = 5, BALANCE_OF_SAVINGS = 6;
const VIEW = 1, WITHDRAWL = 2, DEPOSIT = 3, TRANSFER = 4;

function main() {
    setContinueResponse();
    while (continueResponse === 1) {
        populateAccounts();
        setCardNumber();
        setCurrentUser();
        setPIN();
        displayUserMenu();
        setUserChoice();
        if (userChoice === VIEW) {

        } else if (userChoice === WITHDRAWL) {

        } else if (userChoice === DEPOSIT) {

        } else {

        }
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
    const ONE_ACCOUNT = 1;
    if (currentUser[NUMBER_OF_ACCOUNTS] === ONE_ACCOUNT) {
        console.log('1: View account balance\n2: Withdraw money\n3: Deposit money');
    } else {
        console.log('1: View account balance\n2: Withdraw money\n3: Deposit money\n4: Transfer money');
    }
}

function setUserChoice() {
    while (typeof userChoice === 'undefined' || !/[0-4]{1}/.test(userChoice))
        userChoice = PROMPT.question('\nPlease enter the number of your choice: ');
}

function withdraw(){
    const ONE_ACCOUNT = 1;
    if (currentUser[NUMBER_OF_ACCOUNTS] === ONE_ACCOUNT){
        temp = PROMPT.question('Withdraw amount: ');
        currentUser[BALANCE_OF_CHECKING] = currentUser[BALANCE_OF_CHECKING] - temp;
    }
}