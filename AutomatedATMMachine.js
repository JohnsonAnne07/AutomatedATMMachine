/**
 *   @author Meyerson, Gabe (gabemeyerson@gmail.com)
 *   @version 0.0.2
 *   @summary An ATM || created: 11.16.16
 *   @todo
 */

"use strict";
const PROMPT = require('readline-sync');
const IO = require(`fs`);

let continueResponse = undefined;
let cardNumber, pin, userChoice, temp, whichAccount;
let accounts = []; //card number, pin, last, first, number of accounts, balance of checking, balance of savings
let currentUser = [];

const CARD_NUMBER = 0, PIN = 1, NUMBER_OF_ACCOUNTS = 4, BALANCE_OF_CHECKING = 5, BALANCE_OF_SAVINGS = 6;
const VIEW = 1, WITHDRAWAL = 2, DEPOSIT = 3, TRANSFER = 4, CHECKING = 0, SAVINGS = 1, ONE_ACCOUNT = 1;

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
            setContinueResponse();
        } else if (userChoice === WITHDRAWAL) {
            setWithdraw();
            setContinueResponse();
        } else if (userChoice === DEPOSIT) {
            setDeposit();
            setContinueResponse();
        } else {
            setTransfer();
            setContinueResponse();
        }
        userChoice = -1;
    }
    writeUserData();
}

main();

function setContinueResponse() {
    if (typeof continueResponse !== 'undefined') {
        continueResponse = -1;
        while (continueResponse !== 0 && continueResponse !== 1) {
            continueResponse = Number(PROMPT.question(`\nDo you want to continue? [0=no, 1=yes]: `));
        }
    } else {
        continueResponse = 1;
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
    const WRONG_CARDNUMBER = -1;
    let found = false;
    while (typeof cardNumber === 'undefined' || !/[0-9]{4}/.test(cardNumber) || cardNumber === WRONG_CARDNUMBER) {
        cardNumber = PROMPT.question('\nPlease enter your card number: ');
    }
    for (let i = 0; i < accounts.length; i++) {
        if (cardNumber === accounts [i][CARD_NUMBER]) {
            found = true;
            break;
        }
    }
    if (found === false) {
        console.log('WRONG!™ ');
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
        console.log('WRONG!™ ');
        pin = WRONG_PIN;
        return setPIN();
    }
}

function setCurrentUser() {
    for (let i = 0; i < accounts.length; i++) {
        if (cardNumber == accounts[i][CARD_NUMBER]) {
            currentUser = accounts[i];
        }
    }
}

function displayUserMenu() {
    if (currentUser[NUMBER_OF_ACCOUNTS] == ONE_ACCOUNT) {
        console.log('\n1: View account balance\n2: Withdraw money\n3: Deposit money');
    } else {
        console.log('\n1: View account balance\n2: Withdraw money\n3: Deposit money\n4: Transfer money');
    }
}

function setUserChoice() {
    const LOWEST = 1, HIGHEST = 4;
    if (currentUser[NUMBER_OF_ACCOUNTS] == ONE_ACCOUNT) {
        if (typeof userChoice !== 'undefined') {
            userChoice = -1;
            while (userChoice < LOWEST || userChoice > HIGHEST || userChoice == TRANSFER || isNaN(userChoice) || userChoice === -1) {
                userChoice = Number(PROMPT.question('\nPlease enter the number of your choice: '));
            }
        } else {
            while (userChoice < LOWEST || userChoice > HIGHEST || userChoice == TRANSFER || isNaN(userChoice)) {
                userChoice = Number(PROMPT.question('\nPlease enter the number of your choice: '));
            }
        }
    } else {
        if (typeof userChoice !== 'undefined') {
            userChoice = -1;
            while (userChoice < LOWEST || userChoice > HIGHEST || isNaN(userChoice) || userChoice === -1) {
                userChoice = Number(PROMPT.question('\nPlease enter the number of your choice: '));
            }
        } else {
            while (userChoice < LOWEST || userChoice > HIGHEST || isNaN(userChoice)) {
                userChoice = Number(PROMPT.question('\nPlease enter the number of your choice: '));
            }
        }
    }
    return userChoice;
}

function displayBalance() {
    if (currentUser[NUMBER_OF_ACCOUNTS] == ONE_ACCOUNT) {
        console.log('You have $' + currentUser[BALANCE_OF_CHECKING] + ' in your checking account');
    } else {
        if (typeof whichAccount !== 'undefined') {
            whichAccount = -1;
            while (whichAccount == -1 || whichAccount != CHECKING && whichAccount != SAVINGS || isNaN(whichAccount)) {
                whichAccount = PROMPT.question('Would you like to view the balance of your checking 0) or savings 1)' +
                    ' account: ');
            }
        } else {
            while (isNaN(whichAccount) || whichAccount != CHECKING && whichAccount != SAVINGS) {
                whichAccount = Number(PROMPT.question('Would you like to view the balance of your checking 0) or' +
                    ' savings 1) account: '));
            }
        }
        if (whichAccount == CHECKING) {
            console.log('You have $' + currentUser[BALANCE_OF_CHECKING] + ' in your checking account.');
        } else {
            console.log('You have $' + currentUser[BALANCE_OF_SAVINGS] + ' in your savings account.');
        }
    }
}

function setWithdraw() {
    const MIN_WITHDRAWAL = 0;
    if (Number(currentUser[NUMBER_OF_ACCOUNTS]) == ONE_ACCOUNT) {
        if (typeof temp !== 'undefined') {
            temp = -1;
            while (temp < MIN_WITHDRAWAL || temp > Number(currentUser[BALANCE_OF_CHECKING]) || isNaN(temp) || temp == -1) {
                temp = PROMPT.question('Withdraw amount(Limit of ' + currentUser[BALANCE_OF_CHECKING] + '): ');
            }
        } else {
            while (temp < MIN_WITHDRAWAL || temp > Number(currentUser[BALANCE_OF_CHECKING]) || isNaN(temp)) {
                temp = PROMPT.question('Withdraw amount(Limit of ' + currentUser[BALANCE_OF_CHECKING] + '): ');
            }
        }
        currentUser[BALANCE_OF_CHECKING] = Number(Number(currentUser[BALANCE_OF_CHECKING]) - Number(temp));
    } else {
        if (typeof whichAccount !== 'undefined') {
            whichAccount = -1;
            while (whichAccount == -1 || whichAccount != CHECKING && whichAccount != SAVINGS || isNaN(whichAccount)) {
                whichAccount = Number(PROMPT.question('Would you like to withdraw from checkings 0) or savings 1)' +
                    ' account: '));
            }
        } else {
            while (isNaN(whichAccount) || whichAccount != CHECKING && whichAccount != SAVINGS) {
                whichAccount = Number(PROMPT.question('Would you like to withdraw from checkings 0) or savings 1)' +
                    ' account: '));
            }
        }
        if (whichAccount === CHECKING) {
            if (typeof temp !== 'undefined') {
                temp = -1;
                while (temp < MIN_WITHDRAWAL || temp > Number(currentUser[BALANCE_OF_CHECKING]) || isNaN(temp) || temp == -1) {
                    temp = PROMPT.question('Withdraw amount from checking(Limit of' + currentUser[BALANCE_OF_CHECKING] + '): ');
                }
            } else {
                while (temp < MIN_WITHDRAWAL || temp > Number(currentUser[BALANCE_OF_CHECKING]) || isNaN(temp)) {
                    temp = PROMPT.question('Withdraw amount from checking(Limit of' + currentUser[BALANCE_OF_CHECKING] + '): ');
                }
            }
            currentUser[BALANCE_OF_CHECKING] = Number(Number(currentUser[BALANCE_OF_CHECKING]) - Number(temp));
        } else {
            if (typeof temp !== 'undefined') {
                temp = -1;
                while (temp < MIN_WITHDRAWAL || temp > Number(currentUser[BALANCE_OF_SAVINGS]) || isNaN(temp) || temp == -1) {
                    temp = PROMPT.question('Withdraw amount from checking(Limit of' + currentUser[BALANCE_OF_SAVINGS] + '): ');
                }
            } else {
                while (temp < MIN_WITHDRAWAL || temp > Number(currentUser[BALANCE_OF_SAVINGS]) || isNaN(temp)) {
                    temp = PROMPT.question('Withdraw amount from checking(Limit of' + currentUser[BALANCE_OF_SAVINGS] + '): ');
                }
            }
            currentUser[BALANCE_OF_SAVINGS] = Number(Number(currentUser[BALANCE_OF_SAVINGS]) - Number(temp));
        }
    }
}

function setDeposit() {
    const MAX_DEPOSIT_CHECKING = Number(currentUser[BALANCE_OF_CHECKING] / 2), MAX_DEPOSIT_SAVINGS = Number(currentUser[BALANCE_OF_SAVINGS] / 2), MIN_DEPOSIT = 1;
    if (Number(currentUser[NUMBER_OF_ACCOUNTS]) === ONE_ACCOUNT) {
        console.log('Please insert money into machine');
        if (typeof temp !== 'undefined') {
            temp = -1;
            while (temp < MIN_DEPOSIT || temp > MAX_DEPOSIT_CHECKING || isNaN(temp) || temp == -1) {
                temp = PROMPT.question('Deposit amount(Limit of ' + MAX_DEPOSIT_CHECKING + '): ');
            }
        } else {
            while (temp < MIN_DEPOSIT || temp > MAX_DEPOSIT_CHECKING || isNaN(temp)) {
                temp = PROMPT.question('Deposit amount(Limit of ' + MAX_DEPOSIT_CHECKING + '): ');
            }
        }
        currentUser[BALANCE_OF_CHECKING] = Number(Number(currentUser[BALANCE_OF_CHECKING]) + Number(temp));
    } else {
        if (typeof whichAccount !== 'undefined') {
            whichAccount = -1;
            while (whichAccount == -1 || whichAccount != CHECKING && whichAccount != SAVINGS || isNaN(whichAccount)) {
                whichAccount = Number(PROMPT.question('Would you like to deposit from checkings 0) or savings 1)' +
                    ' account: '));
            }
        } else {
            while (isNaN(whichAccount) || whichAccount != CHECKING && whichAccount != SAVINGS) {
                whichAccount = Number(PROMPT.question('Would you like to deposit from checkings 0) or savings 1)' +
                    ' account: '));
            }
        }
        if (whichAccount === CHECKING) {
            console.log('Please insert money into machine');
            if (typeof temp !== 'undefined') {
                temp = -1;
                while (temp < MIN_DEPOSIT || temp > MAX_DEPOSIT_CHECKING || isNaN(temp) || temp == -1) {
                    temp = Number(PROMPT.question('Deposit amount into checking (Limit of ' + MAX_DEPOSIT_CHECKING + '): '));
                }
            } else {
                while (temp < MIN_DEPOSIT || temp > MAX_DEPOSIT_CHECKING || isNaN(temp)) {
                    temp = Number(PROMPT.question('Deposit amount into checking (Limit of ' + MAX_DEPOSIT_CHECKING + '): '));
                }
            }
            currentUser[BALANCE_OF_CHECKING] = Number(Number(currentUser[BALANCE_OF_CHECKING]) + Number(temp));
        } else {
            console.log('Please insert money into machine');
            if (typeof temp !== 'undefined') {
                temp = -1;
                while (temp < MIN_DEPOSIT || temp > MAX_DEPOSIT_CHECKING || isNaN(temp) || temp == -1) {
                    temp = Number(PROMPT.question('Deposit amount into savings(Limit of ' + MAX_DEPOSIT_SAVINGS + '): '));
                }
            } else {
                while (temp < MIN_DEPOSIT || temp > MAX_DEPOSIT_CHECKING || isNaN(temp)) {
                    temp = Number(PROMPT.question('Deposit amount into savings(Limit of ' + MAX_DEPOSIT_SAVINGS + '): '));
                }
            }
            currentUser[BALANCE_OF_SAVINGS] = Number(Number(currentUser[BALANCE_OF_SAVINGS]) + Number(temp));
        }
    }
}

function setTransfer() {
    let outputAccount, inputAccount, maxTransfer;
    const MAKES_THE_LOOP_WORK = 12, MIN_TRANSFER_SUM = 1;
    if (typeof outputAccount !== 'undefined') {
        outputAccount = -1;
        while (outputAccount == -1 || outputAccount != CHECKING && outputAccount != SAVINGS || isNaN(outputAccount)) {
            outputAccount = Number(PROMPT.question('Would you like to transfer money FROM your checking 0) or savings 1)' +
                ' account: '));
        }
    } else {
        outputAccount = MAKES_THE_LOOP_WORK;
        while (isNaN(outputAccount) || outputAccount != CHECKING && outputAccount != SAVINGS) {
            outputAccount = Number(PROMPT.question('Would you like to transfer money FROM your checking 0) or savings 1)' +
                ' account: '));
        }
    }
    if (outputAccount === CHECKING) {
        inputAccount = SAVINGS;
        maxTransfer = Number(currentUser[BALANCE_OF_CHECKING]);
    } else {
        inputAccount = CHECKING;
        maxTransfer = Number(currentUser[BALANCE_OF_SAVINGS]);
    }
    if (typeof temp !== 'undefined') {
        temp = -1;
        while (temp < MIN_TRANSFER_SUM || temp > maxTransfer || isNaN(temp) || temp == -1) {
            temp = Number(PROMPT.question('Enter amount to transfer (Limit of ' + maxTransfer + '): '));
        }
    } else {
        while (temp < MIN_TRANSFER_SUM || temp > maxTransfer || isNaN(temp)) {
            temp = Number(PROMPT.question('Enter amount to transfer (Limit of ' + maxTransfer + '): '));
        }
    }
    currentUser[inputAccount] = Number(Number(currentUser[inputAccount]) + Number(temp));
    currentUser[outputAccount] = Number(Number(currentUser[outputAccount]) - Number(temp));
}

function writeUserData() {
    let userData = "";
    for (let i = 0; i < currentUser.length; i++) {
        if (i < currentUser.length - 1) {
            userData += currentUser[i] + ",";
        } else {
            userData += currentUser[i];
        }
    }

    console.log(userData);
    let data = IO.readFileSync('data.csv', 'utf8');
    let result = data.replace(new RegExp('^' + userData.slice(0, 4) + '.*'), userData);
    IO.writeFileSync('data.csv', result, 'utf8');
}