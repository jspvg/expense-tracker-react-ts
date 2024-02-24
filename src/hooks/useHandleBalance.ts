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
        if (transaction.type === "income") {
          totalIncome += transaction.amount;
        } else if (transaction.type === "expense") {
          totalExpenses += transaction.amount;
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
