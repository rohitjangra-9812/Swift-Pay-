import React from "react";
import { TransactionReceipt } from "./TransactionReceipt";

interface PaymentSuccessProps {
  amount?: string;
  recipient?: string;
  transactionId?: string;
  timestamp?: number;
  onClose?: () => void;
}

export const PaymentSuccess = ({ amount, recipient, transactionId, timestamp, onClose }: PaymentSuccessProps) => {
  return (
    <TransactionReceipt 
      paymentId={transactionId || "TXN" + Math.random().toString(36).substring(2, 10).toUpperCase()}
      orderId={recipient || "9812603346@paytm"}
      amount={amount ? parseFloat(amount) : 0}
      customerName={recipient || "VERIFIED USER (98126)"}
      timestamp={new Date(timestamp || Date.now()).toLocaleString()}
      onClose={onClose}
    />
  );
};
