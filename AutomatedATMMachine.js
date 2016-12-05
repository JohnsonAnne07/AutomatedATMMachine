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
let cardNumber, pin, userChoice, temp, whichAccount;
let accounts = []; //card number, pin, last, first, number of accounts, balance of checking, balance of savings
let currentUser = []; //the SD array that is created when you enter the card number

const CARD_NUMBER = 0, PIN = 1, LAST_NAME = 2, FIRST_NAME = 3, NUMBER_OF_ACCOUNTS = 4, BALANCE_OF_CHECKING = 5, BALANCE_OF_SAVINGS = 6;
const VIEW = 1, WITHDRAWL = 2, DEPOSIT = 3, TRANSFER = 4, CHECKING = 0, SAVINGS = 1, ONE_ACCOUNT = 1;

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
            displayBalance();
        } else if (userChoice === WITHDRAWL) {
            setWithdraw();
        } else if (userChoice === DEPOSIT) {
            setDeposit();
        } else {
            setTransfer();
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
    for (let i = 0; i < lines.length; i++) {
        accounts.push(lines[i].toString().split(/,/));
    }
}
function setCardNumber() {
    let found = false;
    while (typeof cardNumber === 'undefined' || !/[0-9]{4}/.test(cardNumber) || cardNumber === -1) {
        cardNumber = PROMPT.question('\nPlease enter your card number: ');
    }
    for (let i = 0; i < accounts.length; i++) {
        if (cardNumber === accounts [i][CARD_NUMBER]) {
            console.log('if card number is real');
            found = true;
            break;
        }
    }
    if (found === false) {
        console.log('WRONG!™');
        cardNumber = -1;
        return setCardNumber();
    }
}

function setPIN() {
    const WRONG_PIN = -1;
    while (typeof pin === 'undefined' || !/[0-9]{3}/.test(pin) || pin === WRONG_PIN) {
        pin = PROMPT.question('\nPlease enter your Personal PIN Number: ');
    }
    if (pin !== currentUser [PIN]) {
        console.log('WRONG!™');
        pin = WRONG_PIN;
        return setPIN();
    }
}

function setCurrentUser() {
    for (let i = 0; i < accounts.length; i++) {
        if (cardNumber == accounts[i][CARD_NUMBER]) {
            currentUser = accounts[i];
            //return accounts[i];
        }
    }
}

function displayUserMenu() {
    if (currentUser[NUMBER_OF_ACCOUNTS] === ONE_ACCOUNT) {
        console.log('\n1: View account balance\n2: Withdraw money\n3: Deposit money');
    } else {
        console.log('\n1: View account balance\n2: Withdraw money\n3: Deposit money\n4: Transfer money');
    }
}

function setUserChoice() {
    while (typeof userChoice === 'undefined' || !/[0-4]{1}/.test(userChoice))
        userChoice = PROMPT.question('\nPlease enter the number of your choice: ');
}

function setWithdraw() {
    if (currentUser[NUMBER_OF_ACCOUNTS] === ONE_ACCOUNT) {
        temp = PROMPT.question('Withdraw amount: ');
        currentUser[BALANCE_OF_CHECKING] = currentUser[BALANCE_OF_CHECKING] - temp;
    } else {
        whichAccount = PROMPT.question('Would you like to withdraw from checkings 0) or savings 1)')
        if (whichAccount === CHECKING) {
            temp = PROMPT.question('Withdraw amount from checking: ');
            currentUser[BALANCE_OF_CHECKING] = currentUser[BALANCE_OF_CHECKING] - temp;
        } else {
            temp = PROMPT.question('Withdraw amount savings: ');
            currentUser[BALANCE_OF_SAVINGS] = currentUser[BALANCE_OF_SAVINGS] - temp;
        }
    }
}

function setDeposit() {
    if (currentUser[NUMBER_OF_ACCOUNTS] === ONE_ACCOUNT) {
        console.log('Please insert money into machine');
        temp = PROMPT.question('Deposit amount: ');
        currentUser[BALANCE_OF_CHECKING] = Number(currentUser[BALANCE_OF_CHECKING] + temp);
    } else {
        whichAccount = PROMPT.question('Would you like to withdraw from checkings 0) or savings 1)')
        if (whichAccount === CHECKING) {
            console.log('Please insert money into machine');
            temp = PROMPT.question('Deposit amount to checking: ');
            currentUser[BALANCE_OF_CHECKING] = Number(currentUser[BALANCE_OF_CHECKING] + temp);
        } else {
            console.log('Please insert money into machine');
            temp = PROMPT.question('Withdraw amount savings: ');
            currentUser[BALANCE_OF_SAVINGS] = Number(currentUser[BALANCE_OF_SAVINGS] + temp);
        }
    }
}

function displayBalance() {
    if (currentUser[NUMBER_OF_ACCOUNTS] = ONE_ACCOUNT) {
        console.log('You have $' + currentUser[BALANCE_OF_CHECKING] + ' in your checking account');
    } else {
        whichAccount = PROMPT.question('Would you like to view the balance of your checking 0) or savings 1) account');
        if (whichAccount = CHECKING) {
            console.log('You have $' + currentUser[BALANCE_OF_CHECKING] + ' in your checking account.')
        } else {
            console.log('You have $' + currentUser[BALANCE_OF_SAVINGS] + ' in your savings account.')
        }
    }
}

function setTransfer() {
    let outputAccount, inputAccount;
    outputAccount = PROMPT.question('Would you like to transfer money FROM your checking 0) or savings 1) account');
    if (outputAccount = CHECKING) {
        inputAccount = SAVINGS;
    } else {
        inputAccount = CHECKING;
    }
    temp = PROMPT.question('Enter amount to transfer: ');
    currentUser[outputAccount] = Number(currentUser[outputAccount] - temp);
    currentUser[inputAccount] = Number(currentUser[inputAccount] + temp);
}