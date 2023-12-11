import { FormEvent, useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import { useHandleBalance } from "../../hooks/useHandleBalance";

const ExpenseTracker = () => {
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");
  const navigate = useNavigate();
  const { addTransaction } = useAddTransaction();
  const { transactions } = useGetTransactions();
  const { name, profilePicture } = useGetUserInfo();
  const { balance, income, expenses } = useHandleBalance();

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

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="expenses-page">
      <div className="user-info">
        {profilePicture && <img src={profilePicture} />}
        <h4>{name}</h4>
        <button onClick={signUserOut}>Sign out</button>
        <div className="balance">
          <h4>{name}'s balance:</h4>
          {balance >= 0 ? <p>${balance}</p> : <p>-${balance * -1}</p>}
        </div>
      </div>
      <div className="expense-tracker">
        <div className="container">
          <h1> Expense Tracker</h1>
          <div className="summary">
            <div className="income">
              <h4>Income ${income}</h4>
            </div>
            <div className="expenses">
              <h4>Expenses ${expenses}</h4>
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
              min="0"
              step="0.01"
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
                Income{" "}
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
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              <h4>{transaction.description}</h4>
              <p>
                ${transaction.transactionAmount}{" "}
                <label
                  style={{
                    color:
                      transaction.transactionType === "expense"
                        ? "red"
                        : "green",
                  }}
                >
                  {transaction.transactionType}
                </label>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseTracker;
