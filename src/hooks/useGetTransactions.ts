import {
  Unsubscribe,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

type Transaction = {
  userId: string;
  description: string;
  transactionAmount: number;
  transactionType: string;
  createdAt: Date;
  id?: string;
};

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const transactionCollectionRef = collection(db, "transactions");
  const { userId } = useGetUserInfo();

  const getTransactions = async () => {
    let unsubcscribe: Unsubscribe;
    try {
      const queryTransactions = query(
        transactionCollectionRef,
        where("userId", "==", userId),
        orderBy("createdAt")
      );

      unsubcscribe = onSnapshot(queryTransactions, (snapshot) => {
        const docs: Transaction[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as Transaction;
          const id = doc.id;

          docs.push({ ...data, id });
        });
        setTransactions(docs);
      });
    } catch (err) {
      console.error(err);
    }
    return () => unsubcscribe();
  };

  useEffect(() => {
    getTransactions();
  });

  return { transactions };
};
