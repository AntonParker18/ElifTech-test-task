import React, {useState} from 'react'
import { v4 as uuidv4 } from 'uuid'

import './add-expense.scss'

export const AddExpense = ({addExpense}) => {
  const [amount, setAmount] = useState('')
  const [categoryName, setCategoryName] = useState('')

  const handleAmountChange = (e) => {
    if (e.target.value > 0) {
      setAmount(e.target.value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    addExpense({_id: uuidv4(), amount, categoryName})

    setAmount('')
    setCategoryName('')
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='add_expense '>
        <input required type="number" onChange={handleAmountChange} placeholder="Spend Amount ($)" value={amount} className="expense_input"/>
        <input required type="text" onChange={e => setCategoryName(e.target.value)} value={categoryName} placeholder="Category" className="expense_input"/>
        <button type="submit" className="expense_button">Create Entry</button>
      </form>
    </>
  )
}