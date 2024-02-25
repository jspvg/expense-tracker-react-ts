import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";
import { Transaction } from "../utils/types";

export const useAddTransaction = () => {
  const transactionCollectionRef = collection(db, "transactions");
  const { userId } = useGetUserInfo();
  const addTransaction = async ({
    description,
    amount,
    type,
  }: Transaction) => {
    await addDoc(transactionCollectionRef, {
      userId,
      description,
      amount,
      type,
      createdAt: serverTimestamp(),
    });
  };
  return { addTransaction };
};
