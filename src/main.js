import './style.css'


const STORAGE_KEY = 'expenses'
const Categories = ['Food', 'Transport', 'Bills', 'Entertainment', 'Other']

function save_expenses(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
}

function loadExpenses(){
  const saved = localStorage.getItem(STORAGE_KEY)

  if (saved === null) return []

  try {
      return JSON.parse(saved)
  } catch {
    return []
  }
}

let expenses = loadExpenses()
let nextId = expenses.reduce ((max, expense)  => Math.max(max, expense.id), 0) + 1

const listEl = document.querySelector('#expense-list')
const form = document.querySelector('#expense-form')
const descriptionInput = document.querySelector('#description')
const category = document.querySelector('#category')
const grandTotal = document.querySelector('#grand-total')
const amount = document.querySelector('#amount')
const categoryTotal = document.querySelector('#category-totals')

function getGrandTotal(){
  let sum = 0
  for(const expense of expenses) {
    sum = sum + expense.amount
  }

  return sum
}

function getCategoryTotals() {
  const totals = {}

  for (const expense of expenses) {
    if (totals[expense.category] === undefined) {
      totals[expense.category] = 0
    }
    totals[expense.category] += expense.amount
  }

  return totals
}

function formatMoney(value){
  return value.toFixed(2)
}

function renderList(){
  if (expenses.length === 0) {
    listEl.innerHTML = '<li class="py-3 text-sm text-slate-500">Henüz harcama yok</li>'
    return
  }
  
  let html = ''

  for (const expense of expenses){
    html += `
    <li class="flex items-center justify-between py-3">
      <div>
        <p class="font-medium">${expense.description}</p>
        <p class="text-sm text-slate-500">${expense.category}</p>
      </div> 
      <div class="flex items-center gap-3">
      <span class="font-semibold">${formatMoney(expense.amount)}</span>
      <button data-id="${expense.id}" class="cursor-pointer text-sm text-red-500 hover:underline">delete</button>
      </div>

    </li>
    `
  }
  listEl.innerHTML = html
}


function renderTotals(){
  grandTotal.textContent = formatMoney(getGrandTotal())

  const totals = getCategoryTotals()
  const entries = Object.entries(totals)

  

  if(entries.length === 0){
    categoryTotal.innerHTML = '<li class="text-slate-500">-</li>'
    return
  }

  categoryTotal.innerHTML = entries
  .map(
    ([category,amount]) => `
    <li class="flex justify-between">
      <span>${category}</span>
      <span class="font-medium">${formatMoney(amount)}</span>
    </li>  
      `
  )
  .join('')
}

function render(){
  renderList()
  renderTotals()
}

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const description = descriptionInput.value.trim()
  const amountInput = Number(amount.value)
  const categoryInput = category.value

  if(description === '') {
    alert('description empty')
    descriptionInput.focus()
    return
  }

  if (!Number.isFinite(amountInput) || amountInput <= 0) {
  alert('Tutar pozitif bir sayı olmalı.')
  amount.focus()
  return
}

  if(!Categories.includes(categoryInput)) {
    alert('invalid')
    return
  }

  expenses.push({ id: nextId++, description, amount:amountInput, category:categoryInput})
  save_expenses()

  form.reset()
  descriptionInput.focus()
  render()
})

listEl.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-id]')
  if(!button) return

  const id = Number(button.dataset.id)
  expenses = expenses.filter((expense) => expense.id !== id)
  save_expenses()
  render()
})

render()