import React, {useState} from 'react'

export const ExpensesList = ({expenses, saveChanges, deleteExpense}) => {
  return (
    <div className="expenses_list">
      <h3>Day Spandings</h3>
      <ul className="list">
        {expenses.map(expense => (
          <ExpenseView saveChanges={saveChanges} deleteExpense={deleteExpense} expense={expense} />
        ))}
      </ul>
      <div>
        <span className="total">
          Total: {expenses.reduce((acc, cur) => acc + + cur.amount, 0)}
        </span>
      </div>
    </div>
  )
}

const ExpenseView = ({expense, saveChanges, deleteExpense}) => {
  const [editedExpense, setEditedExpense] = useState(expense)
  const [editMode, setEditMode] = useState(false)

  const handleEditModeChange = () => {
    if (!editMode) {
      setEditMode(true)
    } else {
      if ( editedExpense.categoryName !== expense.categoryName ||
          editedExpense.amount !== expense.amount ) {
            saveChanges(editedExpense)
          }
      setEditMode(false)
    }
  }

  return (
    <li>
      <div className="category">
        <span>Category:
          {editMode ? (
            <input defaultValue={editedExpense.categoryName} onChange={e => setEditedExpense({...editedExpense, categoryName: e.target.value})} />
          ) : (
            expense.categoryName
          )}
        </span>
      </div>

      <div className="amount">
        <span>Amount:
          {editMode ? (
              <input type="number" defaultValue={editedExpense.amount} onChange={e => setEditedExpense({...editedExpense, amount: e.target.value})} />
            ) : (
              expense.amount
            )}
        </span>
      </div>
      <div>
      <button className="edit" onClick={handleEditModeChange}>
        {editMode ? 'Save' : 'Edit'}
      </button>
      <button className="delate" onClick={() => deleteExpense(expense._id)}>Delete</button>
      </div>
    </li>
  )
}