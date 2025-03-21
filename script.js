
'use strict';

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
