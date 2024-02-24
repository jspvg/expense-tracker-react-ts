export type Transaction = {
  description: string;
  amount: number;
  type: "expense" | "income";
};

export type TransactionData = Transaction & {
  userId: string;
  createdAt: Date;
  id?: string;
};
