const incomeSection = document.querySelector('.income-area')
const expenseSection = document.querySelector('.expenses-area')
const availableMoney = document.querySelector('.available-money')
const addTransactionPanel = document.querySelector('.add-transaction-panel')

const nameInput = document.querySelector('#name')
const amountInput = document.querySelector('#amount')
const categorySelect = document.querySelector('#category')

const addTransactionBtn = document.querySelector('.add-transaction')
const deleteAllBtn = document.querySelector('.delete-all')
const deleteItemBtn = document.querySelector('.delete')
const lightColor = document.querySelector('.light')
const darkColor = document.querySelector('.dark')

const saveBtn = document.querySelector('.save')
const cancelBtn = document.querySelector('.cancel')

let root = document.documentElement
let ID = 0
let categoryIcon
let selectedCategory
let moneyArr = [0]

const showPanel = () => {
	addTransactionPanel.style.display = 'flex'
}

const closePanel = () => {
	addTransactionPanel.style.display = 'none'
	clearInputs()
}

const checkForm = () => {
	if (nameInput.value !== '' && amountInput.value !== '' && categorySelect.value !== 'none') {
		createNewTransaction()
	} else {
		alert('Wypełnij wszystkie pola')
	}
}
const clearInputs = () => {
	nameInput.value = ''
	amountInput.value = ''
	categorySelect.value = 'none'
}

const createNewTransaction = () => {
	const newTransaction = document.createElement('div')
	newTransaction.classList.add('transaction')
	newTransaction.setAttribute('id', ID)
	checkCategory(selectedCategory)
	newTransaction.innerHTML = `<p class="transaction-name">
            ${categoryIcon} ${nameInput.value}
            </p>
        <p class="transaction-amount">${amountInput.value}zł 
        <button class="delete" onclick="deleteTransaction(${ID})">
            <i class="fa-solid fa-xmark"></i>
        </button>
        </p>
    `
	amountInput.value > 0
		? incomeSection.appendChild(newTransaction) && newTransaction.classList.add('income')
		: expenseSection.appendChild(newTransaction) && newTransaction.classList.add('expense')

	moneyArr.push(parseFloat(amountInput.value))
	countMoney(moneyArr)
	closePanel()
	ID++
	clearInputs()
}

const checkCategory = transaction => {
	switch (transaction) {
		case '[ + ] Przychód':
			categoryIcon = '<i class="class fa-solid fa-money-bill-wave"></i>'
			break
		case '[ - ] Zakupy':
			categoryIcon = '<i class="class fa-solid fa-cart-arrow-down"></i>'
			break
		case '[ - ] Jedzenie':
			categoryIcon = '<i class="class fa-solid fa-hamburger"></i>'
			break
		case '[ - ] Kino':
			categoryIcon = '<i class="class fa-solid fa-film"></i>'
			break

		default:
			break
	}
}

const selectCategory = () => {
	selectedCategory = categorySelect.options[categorySelect.selectedIndex].text
}

const countMoney = money => {
	const newMoney = money.reduce((a, b) => a + b)
	availableMoney.textContent = `${newMoney}zł`
}
const deleteTransaction = id => {
	const transactionToDelete = document.getElementById(id)

	const transactionAmount = parseFloat(transactionToDelete.childNodes[3].innerText)
	const indexOfTransaction = moneyArr.indexOf(transactionAmount)

	moneyArr.splice(indexOfTransaction, 1)
	transactionToDelete.classList.contains('income')
		? incomeSection.removeChild(transactionToDelete)
		: expenseSection.removeChild(transactionToDelete)
	countMoney(moneyArr)
}

const deleteAllTransactions = () => {
	incomeSection.innerHTML = '<h3>Przychód:</h3>'
	expenseSection.innerHTML = '<h3>Wydatki:</h3>'
	availableMoney.textContent = '0 zł'
	moneyArr = [0]
}

const changeStyleToLight = () => {
	root.style.setProperty('--first-color', '#f9f9f9')
	root.style.setProperty('--second-color', '#14161f')
	root.style.setProperty('--border-color', 'rgba(0, 0, 0, .2)')
}
const changeStyleToDark = () => {
	root.style.setProperty('--first-color', '#14161f')
	root.style.setProperty('--second-color', '#f9f9f9')
	root.style.setProperty('--border-color', 'rgba(255, 255, 255, .4)')
}

addTransactionBtn.addEventListener('click', showPanel)
cancelBtn.addEventListener('click', closePanel)
saveBtn.addEventListener('click', checkForm)
deleteAllBtn.addEventListener('click', deleteAllTransactions)
lightColor.addEventListener('click', changeStyleToLight)
darkColor.addEventListener('click', changeStyleToDark)
