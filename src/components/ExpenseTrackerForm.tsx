import { useForm } from "react-hook-form";
import { Transaction } from "../types";

interface ExpenseTrackerFormProps {
  onSubmit: (transaction: Transaction) => Promise<void>;
}

const ExpenseTrackerForm = ({ onSubmit }: ExpenseTrackerFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Transaction>();

  const onValidSubmit = (data: Transaction) => {
    onSubmit(data);
    reset();
  };

  return (
    <form className="add-transaction" onSubmit={handleSubmit(onValidSubmit)}>
      <input
        type="text"
        placeholder="Transaction description"
        {...register("description", { required: true })}
      />
      {errors.description && <p  className="error">Description is required</p>}
      <input
        type="number"
        min="0"
        step="0.01"
        placeholder="Transaction amount"
        {...register("amount", { required: true, min: 0 })}
      />
      {errors.amount && (
        <p className="error">Transaction amount is required and must be a positive number</p>
      )}
      <div className="radio">
        <label htmlFor="expense">
          Expense{" "}
          <input
            type="radio"
            id="expense"
            value="expense"
            {...register("type", { required: true })}
          />
        </label>
        <label htmlFor="income">
          Income{" "}
          <input
            type="radio"
            id="income"
            value="income"
            {...register("type", { required: true })}
          />
        </label>
      </div>
      {errors.type && <p  className="error">Transaction type is required</p>}

      <button type="submit">Add transaction</button>
    </form>
  );
};

export default ExpenseTrackerForm;
