import PropTypes from "prop-types"

import { formatPrice } from "../../services/price"

import { DeleteExpenseContainer } from "./styles"

export function DeleteExpense({ expense }) {
  return (
    <DeleteExpenseContainer>
      <h1>Delete Expense</h1>

      <span>
        Are you sure you want to delete the expense 
        {" "}<b>{expense?.name}</b> with an amount of
        {" "}<b>{formatPrice(expense?.value)}</b>?
      </span>
    </DeleteExpenseContainer>
  )
}

DeleteExpense.propTypes = {
  expense: PropTypes.object
}