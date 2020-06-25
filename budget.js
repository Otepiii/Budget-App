// Html Elements
const balanceEl = document.querySelector(".balance .value");
const incomeTotal = document.querySelector(".income-total");
const outcomeTotal = document.querySelector(".outcome-total");
const income = document.querySelector("#income");
const expense = document.querySelector("#expense");
const all = document.querySelector("#all");
const incomeList = document.querySelector("#income .list");
const expenseList = document.querySelector("#expense .list");
const allList = document.querySelector("#all .list");

// Toggle Buttons
const expenseBtn = document.querySelector(".tab1")
const incomeBtn = document.querySelector(".tab2")
const allBtn = document.querySelector(".tab3")

// Expense Input Buttons
const addExpense = document.querySelector(".add-expense");
const expenseTitle = document.querySelector(".expense-title-input");
const expenseAmount = document.querySelector(".expense-amount-input");

// Income Input Buttons
const addIncome = document.querySelector(".add-income");
const incomeTitle = document.querySelector(".income-title-input");
const incomeAmount = document.querySelector(".income-amount-input");

// All Input Buttons
const addAll = document.querySelector(".add-all");
const allTitle = document.querySelector(".all-title-input");
const allAmount = document.querySelector(".all-amount-input");

// Variables
let ENTRY_LIST = []
let balance = 0, income = 0, outcome = 0;

const DELETE = "delete", EDIT = "edit";

// 


