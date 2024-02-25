import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import { useHandleBalance } from "../../hooks/useHandleBalance";
import UserInfo from "../../components/UserInfo";
import ExpenseSummary from "../../components/ExpenseSummary";
import { Transaction } from "../../utils/types";
import ExpenseTrackerForm from "../../components/ExpenseTrackerForm";
import TransactionList from "../../components/TransactionList";

const ExpenseTracker = () => {
  const navigate = useNavigate();
  const { addTransaction } = useAddTransaction();
  const { transactions } = useGetTransactions();
  const { name, profilePicture } = useGetUserInfo();
  const { balance, income, expenses } = useHandleBalance();

  const onSubmit = async (transaction: Transaction) => {
    await addTransaction(transaction);
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
      <UserInfo
        name={name}
        profilePicture={profilePicture}
        balance={balance}
        signUserOut={signUserOut}
      />
      <div className="expense-tracker">
        <div className="container">
          <h1> Expense Tracker</h1>
          <ExpenseSummary income={income} expenses={expenses} />
          <ExpenseTrackerForm onSubmit={onSubmit} />
        </div>
      </div>
      <TransactionList transactions={transactions}/>
    </div>
  );
};

export default ExpenseTracker;
