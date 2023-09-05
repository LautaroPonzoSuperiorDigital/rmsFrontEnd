import { isAxiosError } from 'axios'
import PropTypes from 'prop-types'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'

import { api } from '../../services/api'
import { formatPrice } from '../../services/price'
import { formatDate } from '../../services/date'

import { Edit, Trash } from '../icons'
import { Modal } from '../modal'
import { ExpenseForm } from '../expense-form'
import { DeleteExpense } from '../delete-expense'

import { ListingExpenseHistoryTable } from "./styles"
import { useListingDetails } from '../../hooks/useListingDetails'

const ListingExpenseHistoryWithRef = ({ listingId }, ref) => {
  const [expenses, setExpenses] = useState([])
  const [editingExpense, setEditingExpense] = useState(null)
  const [expenseToDelete, setExpenseToDelete] = useState(null)

  const deleteExpenseModalRef = useRef(null)
  const expenseFormModalRef = useRef(null)
  const expenseFormRef = useRef(null)

  const { loadProfitAndLoss } = useListingDetails()

  const onExpenseAdded = useCallback((newExpense) => {
    const _expenses = [...expenses, newExpense]
    _expenses.sort((a, b) => new Date(b.date) - new Date(a.date))

    setExpenses(_expenses)

    loadProfitAndLoss()
  }, [expenses, loadProfitAndLoss])

  const onExpenseChanged = useCallback((updatedExpense) => {
    const _expenses = [...expenses]

    const expenseIndex = _expenses.findIndex(expense => expense.id === updatedExpense.id)

    if (expenseIndex === -1) {
      return
    }

    _expenses.splice(expenseIndex, 1, updatedExpense)
    _expenses.sort((a, b) => new Date(b.date) - new Date(a.date))

    setExpenses(_expenses)

    loadProfitAndLoss()
  }, [expenses, loadProfitAndLoss])

  const onExpenseDeleted = useCallback((expenseId) => {
    setExpenses(oldState => oldState.filter(expense => expense.id !== expenseId))

    loadProfitAndLoss()
  }, [loadProfitAndLoss])

  const handleOpenExpenseFormModal = () => {
    expenseFormModalRef.current?.open()
  }

  const handleCancelAddExpense = () => {
    expenseFormModalRef.current?.close()
    setEditingExpense(false)
  }

  const handleOpenRemoveExpenseModal = (expense) => {
    deleteExpenseModalRef.current?.open()
    setExpenseToDelete(expense)
  }

  const handleCloseRemoveExpenseModal = () => {
    deleteExpenseModalRef.current.close()
    setExpenseToDelete(null)
  }

  const handleDeleteExpense = async () => {
    if (!expenseToDelete) {
      return
    }
    
    try {
      await api.delete(`/listing-expenses/${expenseToDelete.id}`)

      onExpenseDeleted(expenseToDelete.id)
      handleCloseRemoveExpenseModal()
    } catch (err) {
      alert('Error deleting expense')
    }
  }

  const handleSaveExpense = async () => {
    const expenseData = expenseFormRef.current?.getData()

    const needToFill = Object.keys(expenseData).some(key => !expenseData[key])

    if (needToFill) {
      alert('Please fill all the fields.')
      return
    }

    try {
      if (editingExpense) {
        console.log(expenseData)
        const { data: updatedExpense } = await api.put(`/listing-expenses/${editingExpense.id}`, {
          name: expenseData.name,
          value: expenseData.amount,
          date: expenseData.date,
        })

        onExpenseChanged(updatedExpense)
      } else {
        const { data: newExpense } = await api.post(`/listing/${listingId}/expenses`, {
          name: expenseData.name,
          value: expenseData.amount,
          date: expenseData.date,
        })
  
        onExpenseAdded(newExpense)
      }

      expenseFormModalRef.current.close()
    } catch (err) {
      if (isAxiosError(err)) {
        if (err.response.data.response?.response?.message) {
          const errorMessages = err.response.data.response.response.message
          const alertMessage = errorMessages.map(message => Object.keys(message.constraints).map(key => message.constraints[key])).join(', ')

          alert(alertMessage)
          return
        }
      }

      alert('Error saving expense.')
    }
  }

  const handleEditExpense = (expense) => {
    handleOpenExpenseFormModal()
    setEditingExpense(expense)
  }

  useImperativeHandle(ref, () => ({
    openForm: handleOpenExpenseFormModal,
  }))

  useEffect(() => {
    async function loadExpenses() {
      try {
        const { data } = await api.get(`/listing/${listingId}/expenses`)
        setExpenses(data)
      } catch (err) {
        alert('Error loading listing expenses.')
      }
    }

    loadExpenses()
  }, [listingId])

  return (
    <>
    <ListingExpenseHistoryTable>
      <thead>
        <tr>
          <th>Expense Name</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {expenses.map(expense => (
          <tr key={expense.id}>
            <td>{expense.name}</td>
            <td>{formatPrice(expense.value)}</td>
            <td>{formatDate({ date: expense.date })}</td>
            <td>
              <button type="button" onClick={() => handleEditExpense(expense)}>
                <Edit />
              </button>
              <button type="button" onClick={() => handleOpenRemoveExpenseModal(expense)}>
                <Trash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </ListingExpenseHistoryTable>
    
    <Modal.Root ref={expenseFormModalRef} onModalClosed={() => setEditingExpense(null)}>
      <Modal.Body width="50%">
        <Modal.Header showCloseIcon />

        <Modal.Content>
          <ExpenseForm ref={expenseFormRef} expense={editingExpense} />
        </Modal.Content>

        <Modal.Footer>
          <Modal.Action outline text="Cancel" action={handleCancelAddExpense} />
          <Modal.Action text="Save" action={handleSaveExpense} />
        </Modal.Footer>
      </Modal.Body>
    </Modal.Root>

    <Modal.Root ref={deleteExpenseModalRef} onModalClosed={() => setExpenseToDelete(null)}>
      <Modal.Body>
        <Modal.Header showCloseIcon />

        <Modal.Content>
          <DeleteExpense expense={expenseToDelete} />
        </Modal.Content>

        <Modal.Footer>
          <Modal.Action text="Cancel" action={handleCloseRemoveExpenseModal} outline />
          <Modal.Action text="Delete" action={handleDeleteExpense} danger />
        </Modal.Footer>
      </Modal.Body>
    </Modal.Root>
    </>
  )
}

ListingExpenseHistoryWithRef.propTypes = {
  listingId: PropTypes.number.isRequired,
}

export const ListingExpenseHistory = forwardRef(ListingExpenseHistoryWithRef)