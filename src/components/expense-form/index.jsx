import PropTypes from "prop-types"
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react"

import { formatPrice } from "../../services/price"

import { Input } from "../input"

import { AddExpenseContainer, Form } from "./styles"
import { DateTime } from "luxon"

function ExpenseFormWithRef({ expense }, ref) {
  const nameRef = useRef(null)
  const amountRef = useRef(null)
  const dateRef = useRef(null)

  const defaultDateValue = expense && DateTime.fromISO(expense.date, { zone: 'utc' }).toFormat('MM/dd/yyyy')

  const handleAmountChange = () => {
    const amount = amountRef.current.value.replace(/\D/g, '')

    amountRef.current.value = formatPrice(amount)
  }

  const handleDateChange = () => {
    let date = dateRef.current.value

    if (date.length > 10) {
      date = date.slice(0, 10)
    } else {
      date = date
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d)/, '$1/$2')
    }

    dateRef.current.value = date
  }

  const getData = () => {
    const name = nameRef.current?.value
    const amount = amountRef.current?.value.replace(/\D/g, '')
    const date = dateRef.current?.value

    return { name, amount, date }
  }

  useEffect(() => {
    const name = nameRef.current
    const amount = amountRef.current
    const date = dateRef.current

    return () => {
      name.value = ''
      amount.value = ''
      date.value = ''
    }
  }, [])

  useImperativeHandle(ref, () => ({
    getData,
  }))

  return (
    <AddExpenseContainer>
      {expense ? (
        <h1>Edit Expense</h1>
      ) : (
        <h1>Add Expense</h1>
      )}

      <Form>
        <Input
          ref={nameRef}
          type="text"
          label="NAME"
          defaultValue={expense?.name}
        />

        <Input
          ref={amountRef}
          type="text"
          label="AMOUNT"
          onChange={handleAmountChange}
          defaultValue={expense && formatPrice(expense.value)}
        />

        <Input
          ref={dateRef}
          type="text"
          label="DATE"
          onChange={handleDateChange}
          defaultValue={defaultDateValue}
        />
      </Form>
    </AddExpenseContainer>
  )
}

ExpenseFormWithRef.propTypes = {
  expense: PropTypes.object
}

export const ExpenseForm = forwardRef(ExpenseFormWithRef)