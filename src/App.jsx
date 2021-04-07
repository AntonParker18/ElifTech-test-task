import React, {useState, useEffect} from 'react'
import Calendar from 'react-calendar'

import './App.scss'
import 'react-calendar/dist/Calendar.css';

import { AddExpense } from './components/add-expense/add-expense'
import { ExpensesList } from './components/exprenses-list/expenses-list'

const App = () => {
  const [expenses, setExpenses] = useState([])
  const [expensesForDisplay, setExpensesForDisplay] = useState([])
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const expensesFromLS = JSON.parse(localStorage.getItem('expenses'))
    if (expensesFromLS) {
      setExpenses(expensesFromLS)
      setExpensesForDisplay(expensesFromLS)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  useEffect(() => {
    const expensesByDate = expenses.filter(item => ( new Date(item.date).getFullYear() === date.getFullYear() &&
    new Date(item.date).getMonth() === date.getMonth() && new Date(item.date).getDate() === date.getDate()
      )
    )
    setExpensesForDisplay(expensesByDate)
  }, [date, expenses])

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      date
    }
    setExpenses([...expenses, newExpense])
  }

  const saveChanges = (newExpenseData) => {
    const newExpenses = expenses.map(item => {
      if (item._id === newExpenseData._id) {
        return newExpenseData
      }
      return item
    })

    setExpenses(newExpenses)
  }

  const deleteExpense = (id) => {
    setExpenses(
      expenses.filter(item => item._id !== id)
    )
  }

  return (
    <div className="wrapper">

      <Calendar onChange={setDate} value={date} />

      <AddExpense addExpense={addExpense} />

      <ExpensesList deleteExpense={deleteExpense} saveChanges={saveChanges} expenses={expensesForDisplay} />

    </div>
  )
}

export default App