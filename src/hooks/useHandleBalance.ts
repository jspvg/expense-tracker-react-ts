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
        const amount = Number(transaction.amount);
        if (transaction.type === "income") {
          totalIncome += amount;
        } else if (transaction.type === "expense") {
          totalExpenses += amount;
        }
      });

      setIncome(totalIncome);
      setExpenses(totalExpenses);
      setBalance(totalIncome - totalExpenses);
    };

    calculateIncomeExpenses();
  }, [transactions]);

  return { balance, income, expenses };
};
