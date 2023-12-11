import { useEffect, useState } from "react";
import { useGetTransactions } from "./useGetTransactions";

export const useHandleBalance = () => {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const { transactions } = useGetTransactions();

  useEffect(() => {
    const calculateIncomeExpenses = () => {
      let totalIncome = 0;
      let totalExpenses = 0;

      transactions.forEach((transaction) => {
        if (transaction.transactionType === "income") {
          totalIncome += transaction.transactionAmount;
        } else if (transaction.transactionType === "expense") {
          totalExpenses += transaction.transactionAmount;
        }
      });

      setIncome(totalIncome);
      setExpenses(totalExpenses);
    };

    const calculateBalance = () => {
      setBalance(income - expenses);
    };

    calculateIncomeExpenses();
    calculateBalance();
  }, [expenses, income, transactions]);

  return { balance, income, expenses };
};
