import { TransactionData } from "../types";

interface TransactionListProps {
  transactions: TransactionData[];
}

const TransactionList = ({ transactions }: TransactionListProps) => {
  return (
    <div className="transactions">
      <h1>Transactions</h1>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <h4>{transaction.description}</h4>
            <p>
              ${transaction.amount}{" "}
              <label
                style={{
                  color: transaction.type === "expense" ? "red" : "green",
                }}
              >
                {transaction.type}
              </label>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
