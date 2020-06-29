// Html Elements
const balanceEl = document.querySelector(".balance .value");
const incomeTotal = document.querySelector(".income-total");
const outcomeTotal = document.querySelector(".outcome-total");
const incomeEl = document.querySelector("#income");
const expenseEl = document.querySelector("#expense");
const allEl = document.querySelector("#all");
const incomeList = document.querySelector("#income .list");
const expenseList = document.querySelector("#expense .list");
const allList = document.querySelector("#all .list");

// Toggle Buttons
const expenseBtn = document.querySelector(".tab1");
const incomeBtn = document.querySelector(".tab2");
const allBtn = document.querySelector(".tab3");

// Expense Input Buttons
const addExpense = document.querySelector(".add-expense");
const expenseTitle = document.querySelector("#expense-title-input");
const expenseAmount = document.querySelector("#expense-amount-input");

// Income Input Buttons
const addIncome = document.querySelector(".add-income");
const incomeTitle = document.querySelector("#income-title-input");
const incomeAmount = document.querySelector("#income-amount-input");

// Variables
let ENTRY_LIST = [];
let balance = 0,
  income = 0,
  outcome = 0;

const DELETE = "delete",
  EDIT = "edit";

// Event listeners
expenseBtn.addEventListener("click", function () {
  show(expenseEl);
  hide([incomeEl, allEl]);
  active(expenseBtn);
  inactive([incomeBtn, allBtn]);
});

incomeBtn.addEventListener("click", function () {
  show(incomeEl);
  hide([expenseEl, allEl]);
  active(incomeBtn);
  inactive([expenseBtn, allBtn]);
});

allBtn.addEventListener("click", function () {
  show(allEl);
  hide([incomeEl, expenseEl]);
  active(allBtn);
  inactive([incomeBtn, expenseBtn]);
});

addExpense.addEventListener("click", function () {
  // if title or amount empty will not run
  if (!expenseTitle.value || !expenseAmount.value) return;

  let expense = {
    type: "expense",
    title: expenseTitle.value,
    amount: expenseAmount.value,
  };
  ENTRY_LIST.push(expense);

  updateUI();
  clearInput([expenseTitle, expenseAmount]);
});

addIncome.addEventListener("click", function () {
  // if title or amount empty will not run
  if (!incomeTitle.value || !incomeAmount.value) return;

  let income = {
    type: "income",
    title: incomeTitle.value,
    amount: incomeAmount.value,
  };
  ENTRY_LIST.push(income);

  updateUI();
  clearInput([incomeTitle, incomeAmount]);
});

// Helpers
function show(element) {
  element.classList.remove("hide");
}

function hide(elements) {
  elements.forEach((element) => {
    element.classList.add("hide");
  });
}

function active(element) {
  element.classList.add("active");
}

function inactive(elements) {
  elements.forEach((element) => {
    element.classList.remove("active");
  });
}

function updateUI() {
  income = calculateTotal("income", ENTRY_LIST);
  outcome = calculateTotal("outcome", ENTRY_LIST);
  balance = calculateBalance(income, outcome);

  clearElement([expenseList,incomeList,allList]);

  // Determine sign of balance
  let sign = (income >= outcome)? "$" : "-$";

  ENTRY_LIST.forEach((entry,index) => {
    if(entry.type == "expense"){
      showEntry(expenseList,entry.type, entry.title, entry.amount, index)
    }else if (entry.type == "income"){
      showEntry(incomeList,entry.type, entry.title, entry.amount, index)
    } (entry.type == "all")
      showEntry(allList,entry.type, entry.title, entry.amount, index)
  })
}

function showEntry(list,type,title,amount,id){
  const entry = `<li id="${id}" class="${type}">
                  <div class="entry"> ${title}:$${amount}</div>
                  <div id="edit"><i class="far fa-edit"></i></div>
                  <div id="delete"><i class="far fa-trash-alt"></i></div>
  </li>`

  const position = "afterbegin";

  list.insertAdjacentHTML(position,entry)
}

function clearElement(elements){
  elements.forEach(element => {
    element.innerHTML = "";
  })
}

function calculateTotal(type, list) {
  let sum = 0;

  list.forEach((entry) => {
    if (entry.type == type) {
      sum += entry.amount;
    }
  });
  return sum;
}

function calculateBalance(income, outcome) {
  return income - outcome;
}

function clearInput(inputs) {
  inputs.forEach((input) => {
    input.value = "";
  });
}
