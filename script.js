
'use strict';


// BANKIST APP

// Data
// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

// console.log('working fine bro');

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];


// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const signUp_box = document.querySelector('.signup-box')
const signUp = document.querySelector('.login__btn1');
const sign_user = document.querySelector('.signUser');
const sign_pin = document.querySelector('.signPin');
const sign_btn = document.querySelector('.signbtn');
const closeSignup=document.querySelector('.noSignbtn');
const movDates=document.querySelector('.movements__date');

// showing login page
function loginPage(){
  signUp_box.classList.remove('hidden');
  containerApp.style.opacity=-100;
}
signUp.addEventListener('click',loginPage);
function remove_loginPage(){
  signUp_box.classList.add('hidden');
}
closeSignup.addEventListener('click',remove_loginPage);

// opening account
function createAccount(){
  const today=new Date().toISOString();
  const newAcc={
    owner: sign_user.value,
    movements: [1000],
    interestRate: 1.2,
    pin: Number(sign_pin.value),
    movementsDates: [today],
  };
  const nameArr=newAcc.owner.toLowerCase().split(' ');
  const name=nameArr.reduce(function(letter , word){
    return letter+word[0];
  },'')
  newAcc.username=name;
  accounts.push(newAcc);
  console.log(accounts);
  sign_user.value='';
  sign_pin.value='';
  signUp_box.classList.add('hidden');
}
sign_btn.addEventListener('click',createAccount);

// create username for each user
function createUserName(accounts){
  accounts.forEach(function (acc){
    const nameArr=acc.owner.toLowerCase().split(' ');
    const name=nameArr.reduce(function(letter , word){
      return letter+word[0];
    },'')
    acc.username=name;
  })
}
createUserName(accounts);

// adding movements
function addMovement(type,mov,movd){
  const newDiv=document.createElement("div");
  newDiv.classList.add("movements_row");

  const newInnerDiv1=document.createElement("div");
  newInnerDiv1.textContent=type;
  newInnerDiv1.classList.add("movements__type");
  newInnerDiv1.classList.add(`movements__type--${type}`);
  newDiv.appendChild(newInnerDiv1);

  const newInnerDiv3=document.createElement("div");
  const now=new Date(movd);
  const day=String(now.getDate()).padStart(2, '0');
  const month=Number(String(now.getMonth()).padStart(2, '0'))+1;
  const year=now.getFullYear();
  const hour=String(now.getHours()).padStart(2, '0');
  const min=String(now.getMinutes()).padStart(2, '0');
  newInnerDiv3.textContent=`${day}/${month}/${year},${hour}:${min}`;
  newInnerDiv3.classList.add("movements__date");
  newDiv.appendChild(newInnerDiv3);

  const newInnerDiv2=document.createElement("div");
  newInnerDiv2.textContent=mov;
  newInnerDiv2.classList.add("movements__value");
  newDiv.appendChild(newInnerDiv2);
  containerMovements.prepend(newDiv);
}

// displaying movements
const displayMovements=function(acc){
    containerMovements.innerHTML='';
    acc.movements.forEach(function(mov,idx){
        let type='deposit';
        if(mov<0){
            type='withdrawal';
        }
        const movd=acc.movementsDates[idx];
        addMovement(type,mov,movd);
    });
}
  
const finalBalance=function(mov){
    const balance=mov.reduce(function(total,val){
      return total+val;
    },0);
    labelBalance.textContent=`${balance} €`;
}

const displayLableDate=function(){
  const now=new Date();
  const day=String(now.getDate()).padStart(2, '0');
  const month=Number(String(now.getMonth()).padStart(2, '0'))+1;
  const year=now.getFullYear();
  const hour=String(now.getHours()).padStart(2, '0');
  const min=String(now.getMinutes()).padStart(2, '0');
  labelDate.textContent=`${day}/${month}/${year},${hour}:${min}`;
  console.log(now);
  console.log(day);
}

const totalDeposit=function(movement){
  const totalIn=movement.filter(mov=>mov>0).reduce(function(depo,val){
    return depo+val;
  },0);
  labelSumIn.textContent=totalIn;
}

const totalwithdrawal=function(movement){
  let totalOut=movement.filter(mov=>mov<0).reduce(function(withdrawal,val){
    return withdrawal+val;
  },0);
  totalOut=Math.abs(totalOut);
  labelSumOut.textContent=totalOut;
}
const totalInterest=function(movement,interest_rate){
  const interest=movement.filter(mov=>mov>0)
  .map(function(m){
    return (interest_rate/100)*m;
  })
  .reduce(function(int,val){
    return int+val;
  },0);
  labelSumInterest.textContent=interest;
}
let timer;
const displayTimer=function(){
  let time=30;
  const tick=function (){
    let min=String(Math.trunc(time/60)).padStart(2, '0');
    let sec=String(time%60).padStart(2, '0');
    labelTimer.textContent=`${min}:${sec}`;
    if(time==0){
      clearInterval(timer);
      alert('Time runs out login again');
      labelWelcome.textContent='Login to get started';
      containerApp.style.opacity=0;
    }
    time--;
  }
  tick();
  timer=setInterval(tick,1000);
  return timer;
}

let currentAccount;
function displayAccount(e){
  e.preventDefault();
  currentAccount=accounts.find(function(account){
    return (account.username===inputLoginUsername.value&&account.pin===Number(inputLoginPin.value))
  });
  console.log(currentAccount);
  if(currentAccount){
    containerApp.style.opacity=1;
    displayMovements(currentAccount);
    finalBalance(currentAccount.movements);
    totalDeposit(currentAccount.movements);
    totalwithdrawal(currentAccount.movements);
    totalInterest(currentAccount.movements,currentAccount.interestRate);
    displayLableDate();
    if(timer){
      clearInterval(timer);
    }
    timer=displayTimer();
    labelWelcome.textContent=`Welcome back ${currentAccount.owner.split(' ')[0]}`;
    inputLoginPin.value='';
    inputLoginUsername.value='';
    inputLoginPin.blur();
    signUp_box.classList.add('hidden');
  }
  else{
    alert ("Invalid username or pin!");
    inputLoginPin.value='';
    inputLoginUsername.value='';
    inputLoginPin.blur();
  }
}
btnLogin.addEventListener('click',displayAccount);

// money transfer -
 function transfer(e){
  e.preventDefault();
  const user=inputTransferTo.value;
  const amount=Number(inputTransferAmount.value);

  for(const acc of accounts){
    if(acc.username===user){
      acc.movements.push(amount);
      const date=new Date().toISOString();
      currentAccount.movements.push(amount*-1);
      currentAccount.movementsDates.push(date);
      acc.movementsDates.push(date);
      finalBalance(currentAccount.movements);
      totalDeposit(currentAccount.movements);
      totalwithdrawal(currentAccount.movements);
      totalInterest(currentAccount.movements,currentAccount.interestRate);
      addMovement('withdrawal',amount,date);
      clearInterval(timer);
      timer=displayTimer();
      inputTransferAmount.value='';
      inputTransferTo.value='';
      inputTransferAmount.blur();
    }
  }
 }
 btnTransfer.addEventListener('click',transfer);

 // close account -
 function close(e){
  e.preventDefault();
  if(currentAccount.username===inputCloseUsername.value&&currentAccount.pin===Number(inputClosePin.value)){
    const idx=accounts.findIndex(function(acc){
      return (acc.username===inputCloseUsername.value&&acc.pin===Number(inputClosePin.value))
    })
    let permission=prompt('Confirm to delete your account?');
    if(permission.toLowerCase()==='yes'){
      accounts.splice(idx,1);
      containerApp.style.opacity=0;
      labelWelcome.textContent='Login to get started'
      inputCloseUsername.value='';
      inputClosePin.value='';
      console.log(accounts);
      console.log('yess');
    }
  }
 }
 btnClose.addEventListener('click',close);


// request loan-
function loan(e){
  e.preventDefault();
  const amt=Number(inputLoanAmount.value);
  if(amt>0&&currentAccount.movements.some(function(mov){
    return mov>amt*0.1;
  })){
    currentAccount.movements.push(amt);
    const date=new Date().toISOString()
    currentAccount.movementsDates.push(date);
    finalBalance(currentAccount.movements);
    totalDeposit(currentAccount.movements);
    totalInterest(currentAccount.movements,currentAccount.interestRate);
    addMovement('deposit',amt,date);
    clearInterval(timer);
    timer=displayTimer();
    inputLoanAmount.value='';
    inputLoanAmount.blur();
  }
}
btnLoan.addEventListener('click',loan);








// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // Simple Array Methods
// let arr = ['a', 'b', 'c', 'd', 'e'];

// // SLICE
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -2));
// console.log(arr.slice());
// console.log([...arr]);

// // SPLICE
// // console.log(arr.splice(2));
// arr.splice(-1);
// console.log(arr);
// arr.splice(1, 2);
// console.log(arr);

// // REVERSE
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());
// console.log(arr2);

// // CONCAT
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

// // JOIN
// console.log(letters.join(' - '));

// // The new at Method

// const arr = [23, 11, 64];
// console.log(arr[0]);
// console.log(arr.at(0));

// // getting last array element
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// console.log(arr.at(-1));

// console.log('jonas'.at(0));
// console.log('jonas'.at(-1));

// // Looping Arrays: forEach

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
  
// for (const movement of movements) {
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log('---- FOREACH ----');
// movements.forEach(function (mov, i, arr) {
//   if (mov > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${mov}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
//   }
// });
// // 0: function(200)
// // 1: function(450)
// // 2: function(400)
// // ...

// // forEach With Maps and Sets
// // Map
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// // Set
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// currenciesUnique.forEach(function (value, _, map) {
//   console.log(`${value}: ${value}`);
// });

// The map Method
// const eurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

// const movementsUSD = movements.map(mov => mov * eurToUsd );

// console.log(movements);
// console.log(movementsUSD);

// const movementsUSDfor = [];
// for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
// console.log(movementsUSDfor);

// const movementsDescriptions = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
//       mov
//     )}`
// );
// console.log(movementsDescriptions);

// The map Method
// const eurToUsd = 1.1;

// // const movementsUSD = movements.map(function (mov) {
// //   return mov * eurToUsd;
// // });

// const movementsUSD = movements.map(mov => mov * eurToUsd);

// console.log(movements);
// console.log(movementsUSD);

// const movementsUSDfor = [];
// for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
// console.log(movementsUSDfor);

// const movementsDescriptions = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
//       mov
//     )}`
// );
// console.log(movementsDescriptions);

// ///////////////////////////////////////
// // The filter Method
// const deposits = movements.filter(function (mov, i, arr) {
//   return mov > 0;
// });
// console.log(movements);
// console.log(deposits);

// const depositsFor = [];
// for (const mov of movements) if (mov > 0) depositsFor.push(mov);
// console.log(depositsFor);

// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

// ///////////////////////////////////////
// // The reduce Method
// console.log(movements);

// // accumulator -> SNOWBALL
// // const balance = movements.reduce(function (acc, cur, i, arr) {
// //   console.log(`Iteration ${i}: ${acc}`);
// //   return acc + cur;
// // }, 0);
// const balance = movements.reduce((acc, cur) => acc + cur, 0);
// console.log(balance);

// let balance2 = 0;
// for (const mov of movements) balance2 += mov;
// console.log(balance2);

// // Maximum value
// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) return acc;
//   else return mov;
// }, movements[0]);
// console.log(max);


// ///////////////////////////////////////
// // The Magic of Chaining Methods
// const eurToUsd = 1.1;
// console.log(movements);

// // PIPELINE
// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map((mov, i, arr) => {
//     // console.log(arr);
//     return mov * eurToUsd;
//   })
//   // .map(mov => mov * eurToUsd)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsUSD);

// ///////////////////////////////////////
// // The find Method
// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(movements);
// console.log(firstWithdrawal);

// console.log(accounts);

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);


// ///////////////////////////////////////
// // The New findLast and findLastIndex Methods

// console.log(movements);
// const lastWithdrawal = movements.findLast(mov => mov < 0);
// console.log(lastWithdrawal);

// // 'Your latest large movement was X movements ago'

// const latestLargeMovementIndex = movements.findLastIndex(
//   mov => Math.abs(mov) > 1000
// );
// console.log(latestLargeMovementIndex);
// console.log(
//   `Your latest large movement was ${
//     movements.length - latestLargeMovementIndex
//   } movements ago`
// );


// ///////////////////////////////////////
// // some and every
// console.log(movements);

// // EQUALITY
// console.log(movements.includes(-130));

// // SOME: CONDITION
// console.log(movements.some(mov => mov === -130));

// const anyDeposits = movements.some(mov => mov > 0);
// console.log(anyDeposits);

// // EVERY
// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));

// // Separate callback
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));


// ///////////////////////////////////////
// // flat and flatMap
// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat());

// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat(2));

// // flat
// const overalBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance);

// // flatMap
// const overalBalance2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance2);


// ///////////////////////////////////////
// // Sorting Arrays

// // Strings
// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort());
// console.log(owners);

// // Numbers
// console.log(movements);

// // return < 0, A, B (keep order)
// // return > 0, B, A (switch order)

// // Ascending
// // movements.sort((a, b) => {
// //   if (a > b) return 1;
// //   if (a < b) return -1;
// // });
// movements.sort((a, b) => a - b);
// console.log(movements);

// // Descending
// // movements.sort((a, b) => {
// //   if (a > b) return -1;
// //   if (a < b) return 1;
// // });
// movements.sort((a, b) => b - a);
// console.log(movements);


// ///////////////////////////////////////
// // Array Grouping

// console.log(movements);

// const groupedMovements = Object.groupBy(movements, movement =>
//   movement > 0 ? 'deposits' : 'withdrawals'
// );
// console.log(groupedMovements);

// const groupedByActivity = Object.groupBy(accounts, account => {
//   const movementCount = account.movements.length;

//   if (movementCount >= 8) return 'very active';
//   if (movementCount >= 4) return 'active';
//   if (movementCount >= 1) return 'moderate';
//   return 'inactive';
// });
// console.log(groupedByActivity);

// // const groupedAccounts = Object.groupBy(accounts, account => account.type);
// const groupedAccounts = Object.groupBy(accounts, ({ type }) => type);
// console.log(groupedAccounts);


// ///////////////////////////////////////
// // More Ways of Creating and Filling Arrays
// const arr = [1, 2, 3, 4, 5, 6, 7];
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// // Empty arrays + fill method
// const x = new Array(7);
// console.log(x);
// // console.log(x.map(() => 5));
// x.fill(1, 3, 5);
// x.fill(1);
// console.log(x);

// arr.fill(23, 2, 6);
// console.log(arr);

// // Array.from
// const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

// const z = Array.from({ length: 7 }, (_, i) => i + 1);
// console.log(z);

// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//     el => Number(el.textContent.replace('€', ''))
//   );
//   console.log(movementsUI);

//   const movementsUI2 = [...document.querySelectorAll('.movements__value')];
// });


// ///////////////////////////////////////
// // Non-Destructive Alternatives: toReversed, toSorted, toSpliced, with

// console.log(movements);
// const reversedMov = movements.toReversed();
// console.log(reversedMov);

// // toSorted (sort), toSpliced (splice)

// // movements[1] = 2000;
// const newMovements = movements.with(1, 2000);
// console.log(newMovements);

// console.log(movements);


/////////////////////////////////////////////////////////////////////
/////////////////////DATE AND TIME//////////////////////////////////
///////////////////////////////////////
// Converting and Checking Numbers
// console.log(23 === 23.0);

// Base 10 - 0 to 9. 1/10 = 0.1. 3/10 = 3.3333333
// Binary base 2 - 0 1
// console.log(0.1 + 0.2);
// console.log(0.1 + 0.2 === 0.3); // GIVES ERROR BCZ IT IS SIMPLY PROBLEM IN JS

// Conversion
// console.log(Number('23'));
// console.log(+'23');

// // Parsing-  gives number part of string but the string must start from number. the second argument in parsing in base ...eg 10 for decimal and 2 for binary
// console.log(Number.parseInt('30px', 10)); 
// console.log(Number.parseInt('e23', 10));

// console.log(Number.parseInt('  2.5rem  ')); // output=2 i.e integer part of string
// console.log(Number.parseFloat('  2.5rem  '));

// // console.log(parseFloat('  2.5rem  ')); // same as number.parsefloat method

// // Check if value is NaN
// console.log(Number.isNaN(20));
// console.log(Number.isNaN('20'));
// console.log(Number.isNaN(+'20X'));
// console.log(Number.isNaN(23 / 0));

// // Checking if value is number
// console.log(Number.isFinite(20));
// console.log(Number.isFinite('20'));
// console.log(Number.isFinite(+'20X'));
// console.log(Number.isFinite(23 / 0));

// check for integer.
// console.log(Number.isInteger(23));
// console.log(Number.isInteger(23.0)); // in js number in decimal and without decimal both are equal so it also give true for this
// console.log(Number.isInteger(23 / 0));

// Math and Rounding

// console.log(Math.sqrt(25)); // give sqrt of a no.
// console.log(25 ** (1 / 2)); // give sqrt of a no.
// console.log(8 ** (1 / 3)); // give cuberoot of a no.

// console.log(Math.max(5, 18, 23, 11, 2)); //return max of all value
// console.log(Math.max(5, 18, '23', 11, 2)); //return max of all value by automatic type conversion
// console.log(Math.max(5, 18, '23px', 11, 2)); // return nan bcz it has no parsing

// console.log(Math.min(5, 18, 23, 11, 2)); //return min of all value

// console.log(Math.PI * Number.parseFloat('10px') ** 2); // Math.PI gives value of pi


// // how to create random no.
// console.log(Math.trunc(Math.random() * 6) + 1);

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1)) + min;

// console.log(randomInt(10, 20));
// console.log(randomInt(0, 3));

// Rounding integers
// console.log(Math.round(23.3));
// console.log(Math.round(23.9));

// console.log(Math.ceil(23.3));
// console.log(Math.ceil(23.9));

// console.log(Math.floor(23.3));
// console.log(Math.floor('23.9'));

// console.log(Math.trunc(23.3));

// console.log(Math.trunc(-23.3));
// console.log(Math.floor(-23.3));

// // Rounding decimals
// console.log((2.7).toFixed(0));
// console.log((2.7).toFixed(3));
// console.log((2.345).toFixed(2));
// console.log(+(2.345).toFixed(2));

// The Remainder Operator gives remainder
// console.log(5 % 2);

// Numeric Separators- to easily real very long numbers
// 287,460,000,000
// const diameter = 287_460_000_000; // ignores underscore in between but underscore should always be in between
// console.log(diameter);

// const price = 345_99;
// console.log(price);
// const PI = 3.14_15; // underscore should not be just before and after decimal point
// console.log(PI);

// console.log(Number('230_000')); // output nan i.e it doesnt work
// console.log(parseInt('230_000')); // output 230 as when it do parsing it take underscore as start of string.

// note- math operators like math.sqrt doesnt work with bigint
// Working with BigInt
// console.log(Number.MAX_SAFE_INTEGER); // just like Integer.MAX_VALUE in java i.e gives max safe integer in js

// console.log(4838430248342043823408394839483204n); // convert number to bigint
// console.log(BigInt(48384302));

// // Operations
// console.log(10000n + 10000n);
// console.log(36286372637263726376237263726372632n * 10000000n);
// // console.log(Math.sqrt(16n));

// // cant perform operators like add, div, etc with bigint and number type directly.. first convert number to bigint
// const huge = 20289830237283728378237n;
// const num = 23;
// console.log(huge * BigInt(num));

// // Exceptions
// console.log(20n > 15); //output- true
// console.log(20n === 20); //output- false
// console.log(typeof 20n);
// console.log(20n == '20');//output- true

// console.log(huge + ' is REALLY big!!!');

// // Divisions
// console.log(11n / 3n); // gives only integer part not the decimal part.
// console.log(10 / 3);