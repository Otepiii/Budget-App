// Html Elements
const balanceEl = document.querySelector(".balance .value")
const incomeTotal = document.querySelector(".income-total")
const outcomeTotal = document.querySelector(".outcome-total")
const incomeEl = document.querySelector("#income")
const expenseEl = document.querySelector("#expense")
const allEl = document.querySelector("#all")
const incomeList = document.querySelector("#income .list")
const expenseList = document.querySelector("#expense .list")
const allList = document.querySelector("#all .list")

// Toggle Buttons
const expenseBtn = document.querySelector(".tab1")
const incomeBtn = document.querySelector(".tab2")
const allBtn = document.querySelector(".tab3")

// Expense Input Buttons
const addExpense = document.querySelector(".add-expense")
const expenseTitle = document.querySelector("#expense-title-input")
const expenseAmount = document.querySelector("#expense-amount-input")

// Income Input Buttons
const addIncome = document.querySelector(".add-income")
const incomeTitle = document.querySelector("#income-title-input")
const incomeAmount = document.querySelector("#income-amount-input")

// Variables
let ENTRY_LIST = []
let balance = 0,
  income = 0,
  outcome = 0

const DELETE = "delete",
  EDIT = "edit"

// Look if there is saved data in localstorage
ENTRY_LIST = JSON.parse(localStorage.getItem("entry_list")) || []
updateUI()

// Event listeners
expenseBtn.addEventListener("click", function () {
  show(expenseEl)
  hide([incomeEl, allEl])
  active(expenseBtn)
  inactive([incomeBtn, allBtn])
})

incomeBtn.addEventListener("click", function () {
  show(incomeEl)
  hide([expenseEl, allEl])
  active(incomeBtn)
  inactive([expenseBtn, allBtn])
})

allBtn.addEventListener("click", function () {
  show(allEl)
  hide([incomeEl, expenseEl])
  active(allBtn)
  inactive([incomeBtn, expenseBtn])
})

addExpense.addEventListener("click", function () {
  // if title or amount empty will not run
  if (!expenseTitle.value || !expenseAmount.value) return

  let expense = {
    type: "expense",
    title: expenseTitle.value,
    amount: parseFloat(expenseAmount.value),
  }
  ENTRY_LIST.push(expense)

  updateUI()
  clearInput([expenseTitle, expenseAmount])
})

addIncome.addEventListener("click", function () {
  // if title or amount empty will not run
  if (!incomeTitle.value || !incomeAmount.value) return

  let income = {
    type: "income",
    title: incomeTitle.value,
    amount: parseFloat(incomeAmount.value),
  }
  ENTRY_LIST.push(income)

  updateUI()
  clearInput([incomeTitle, incomeAmount])
})

incomeList.addEventListener("click", deleteOrEdit)
expenseList.addEventListener("click", deleteOrEdit)
allList.addEventListener("click", deleteOrEdit)

// Helpers

function deleteOrEdit(event) {
  const targetBtn = event.target

  const entry = targetBtn.parentNode

  if (targetBtn.id == DELETE) {
    deleteEntry(entry)
  } else if (targetBtn.id == EDIT) {
    editEntry(entry)
  }
}

function deleteEntry(entry) {
  ENTRY_LIST.splice(entry.id, 1)

  updateUI()
}

function editEntry(entry) {
  let ENTRY = ENTRY_LIST[entry.id]

  if (ENTRY.type == "income") {
    incomeAmount.value = ENTRY.amount
    incomeTitle.value = ENTRY.title
  } else if (ENTRY.type == "expense") {
    expenseAmount.value = ENTRY.amount
    expenseTitle.value = ENTRY.title
  }

  deleteEntry(entry)
}

function show(element) {
  element.classList.remove("hide")
}

function hide(elements) {
  elements.forEach((element) => {
    element.classList.add("hide")
  })
}

function active(element) {
  element.classList.add("active")
}

function inactive(elements) {
  elements.forEach((element) => {
    element.classList.remove("active")
  })
}

function updateUI() {
  income = calculateTotal("income", ENTRY_LIST)
  outcome = calculateTotal("expense", ENTRY_LIST)
  balance = Math.abs(calculateBalance(income, outcome))

  // Determine sign of balance
  let sign = income >= outcome ? "$" : "-$"

  // update header elements
  balanceEl.innerHTML = `<small>${sign}</small>${balance}`
  incomeTotal.innerHTML = `<small>$</small>${income}`
  outcomeTotal.innerHTML = `<small>$</small>${outcome}`

  clearElement([expenseList, incomeList, allList])

  ENTRY_LIST.forEach((entry, index) => {
    if (entry.type == "expense") {
      showEntry(expenseList, entry.type, entry.title, entry.amount, index)
    } else if (entry.type == "income") {
      showEntry(incomeList, entry.type, entry.title, entry.amount, index)
    }
    entry.type == "all"
    showEntry(allList, entry.type, entry.title, entry.amount, index)
  })

  updateChart(income, outcome)

  // saves data ti localstorage
  localStorage.setItem("entry_list", JSON.stringify(ENTRY_LIST))
}

function showEntry(list, type, title, amount, id) {
  const entry = `<li id="${id}" class="${type}">
                  <div class="entry"> ${title}:$${amount}</div>
                  <i class="far fa-edit" id="edit"></i>
                  <i class="far fa-trash-alt" id="delete"></i>
  </li>`

  const position = "afterbegin"

  list.insertAdjacentHTML(position, entry)
}

function clearElement(elements) {
  elements.forEach((element) => {
    element.innerHTML = ""
  })
}

function calculateTotal(type, list) {
  let sum = 0

  list.forEach((entry) => {
    if (entry.type == type) {
      sum += entry.amount
    }
  })
  return sum
}

function calculateBalance(income, outcome) {
  return income - outcome
}

function clearInput(inputs) {
  inputs.forEach((input) => {
    input.value = ""
  })
}
