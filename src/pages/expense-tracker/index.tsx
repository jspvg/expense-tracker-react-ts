import { FormEvent, useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";

const ExpenseTracker = () => {
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");
  const { addTransaction } = useAddTransaction();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await addTransaction({
      description,
      transactionAmount,
      transactionType,
    });

    setDescription("");
    setTransactionAmount(0);
    setTransactionType("expense");
  };

  return (
    <div className="expenses-page">
      <div className="expense-tracker">
        <div className="container">
          <h1>Expense Tracker</h1>
          <div className="balance">
            <h3>Your balance $0.00</h3>
          </div>
          <div className="summary">
            <div className="income">
              <h4>Income $0.00</h4>
            </div>
            <div className="expenses">
              <h4>Expenses $0.00</h4>
            </div>
          </div>
          <form className="add-transaction" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Transaction description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Transaction amount"
              required
              value={transactionAmount === 0 ? "" : transactionAmount}
              onChange={(e) => setTransactionAmount(Number(e.target.value))}
            />
            <div className="radio">
              <label htmlFor="expense">
                Expense{" "}
                <input
                  type="radio"
                  id="expense"
                  value="expense"
                  checked={transactionType === "expense"}
                  onChange={(e) => setTransactionType(e.target.value)}
                />
              </label>
              <label htmlFor="income">
                Income
                <input
                  type="radio"
                  id="income"
                  value="income"
                  checked={transactionType === "income"}
                  onChange={(e) => setTransactionType(e.target.value)}
                />
              </label>
            </div>

            <button type="submit">Add transaction</button>
          </form>
        </div>
      </div>
      <div className="transactions">
        <h1>Transactions</h1>
      </div>
    </div>
  );
};

export default ExpenseTracker;
