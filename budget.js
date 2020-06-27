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
  clearInput([incomeTitle.value, incomeAmount.value]);
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

function clearInput(inputs) {
  inputs.forEach((input) => {
    input.value = "";
  });
}
