import './style.css'

let expenses = [
  {id: 1, description: 'Coffee', amount: 120, category: 'Food'},
  {id: 2, description: 'Bus Ticket', amount: 40, category: 'Transport'},
  {id: 3, description: 'Electricity, amount: 1500', category: 'Bills'},
]

const Categories = ['Food', 'Transport', 'Bills', 'Entertainment', 'Other']

let nextId = 1

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
  let sum = 0
  for(const expense of expenses) {
    sum += expense.categoryTotal
  }

  return sum
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
        <p class="font-medium">${escapeHtml(expense.description)}</p>
        <p class="text-sm text-slate-500">${expense.category}</p>
      </div> 

      
    </li>
    `
  }
  
}


function render(){

}

render()