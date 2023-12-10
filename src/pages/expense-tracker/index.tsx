const ExpenseTracker = () => {
  return (
    <div className="expenses-page">
      <div className="expense-tracker">
        <div className="container">
          <h1>Expense Tracker</h1>
          <div className="balance">
            <h3>Your balance</h3>
            <p>$0.00</p>
          </div>
          <div className="summary">
            <div className="income">
              <h4>Income</h4>
              <p>$0.00</p>
            </div>
            <div className="expenses">
              <h4>Expenses</h4>
              <p>$0.00</p>
            </div>
          </div>
          <form action="sumbit" className="add-transaction">
            <input type="text" placeholder="Transaction description" required />
            <input type="number" placeholder="Transaction amount" required />
            <label htmlFor="expense">
              Expense <input type="radio" id="expense" value="expense" />
            </label>

            <label htmlFor="income">
              Income
              <input type="radio" id="income" value="income" />
            </label>

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
