interface ExpenseSummaryProps {
  income: number;
  expenses: number;
}

const ExpenseSummary = ({ income, expenses }: ExpenseSummaryProps) => {
  return (
    <div className="summary">
      <div className="income">
        <h4>Income ${income}</h4>
      </div>
      <div className="expenses">
        <h4>Expenses ${expenses}</h4>
      </div>
    </div>
  );
};

export default ExpenseSummary;
