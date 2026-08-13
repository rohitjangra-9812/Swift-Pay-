import { formatCurrency } from '../utils/formatCurrency';
import { numberToWords } from '../utils/numberToWords';
import React, { useRef } from 'react';
import { Share2, Download, CheckCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface TransactionReceiptProps {
  paymentId: string;
  orderId: string;
  amount: number;
  customerName: string;
  timestamp: string;
  onClose?: () => void;
}

export const TransactionReceipt: React.FC<TransactionReceiptProps> = ({
  paymentId,
  orderId,
  amount,
  customerName,
  timestamp,
  onClose,
}) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Transaction Receipt',
          text: `Receipt for payment of ${formatCurrency(amount)} (Txn: ${paymentId})`,
        });
      } catch (err) {
        console.error('Share failed', err);
      }
    } else {
      alert('Sharing is not supported on this device/browser.');
    }
  };

  const handleDownload = () => {
    // In a real app, we'd use html2canvas or similar to generate an image
    alert('Downloading receipt (Mock implementation)');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[100] flex flex-col items-center bg-slate-950/90 backdrop-blur-md p-4 overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl mx-auto my-8 pointer-events-auto shrink-0">
        {/* The Receipt Document */}
        <div 
          ref={receiptRef}
          className="bg-white text-slate-900 border-[6px] border-slate-800 shadow-2xl relative"
        >
          {/* Inner border */}
          <div className="border border-slate-400 m-1">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start p-6 border-b border-slate-300">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">PAYMENT RECEIPT</h1>
                <p className="text-sm font-medium text-slate-500 mt-1 uppercase tracking-wide">
                  ROHIT JANGRA Secure Payment Settlement Registry
                </p>
              </div>
              <div className="flex flex-col gap-2 text-sm text-right">
                <div className="flex justify-end gap-2">
                  <span className="text-slate-500">Receipt No :</span>
                  <span className="font-bold text-slate-800 uppercase">{paymentId || "SWIFTO21RCW3"}</span>
                </div>
                <div className="flex justify-end gap-2">
                  <span className="text-slate-500">Date & Time:</span>
                  <span className="font-bold text-slate-800">{timestamp}</span>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 text-sm">
              <div className="p-4 border-b sm:border-r border-slate-300 flex items-center justify-between">
                <span className="text-slate-500">Sender (From User)</span>
                <span className="font-bold text-slate-900">Rohit Jangra</span>
              </div>
              <div className="p-4 border-b border-slate-300 flex items-center justify-between">
                <span className="text-slate-500">Sender Account/UPI</span>
                <span className="font-bold text-slate-900">Digital Wallet</span>
              </div>
              
              <div className="p-4 border-b sm:border-r border-slate-300 flex items-center justify-between">
                <span className="text-slate-500">Recipient (To Me)</span>
                <span className="font-bold text-slate-900 uppercase">{customerName || 'VERIFIED USER (98126)'}</span>
              </div>
              <div className="p-4 border-b border-slate-300 flex items-center justify-between">
                <span className="text-slate-500">Recipient UPI ID</span>
                <span className="font-bold text-slate-900 uppercase">{orderId || '9812603346@paytm'}</span>
              </div>

              <div className="p-4 border-b sm:border-r border-slate-300 flex items-center justify-between">
                <span className="text-slate-500">Receiver Bank</span>
                <span className="font-bold text-slate-900">STATE BANK OF INDIA</span>
              </div>
              <div className="p-4 border-b border-slate-300 flex items-center justify-between">
                <span className="text-slate-500">Payment Source</span>
                <span className="font-bold text-slate-900">UPI QR Code Transfer</span>
              </div>

              <div className="p-4 border-b sm:border-r border-slate-300 flex items-center justify-between">
                <span className="text-slate-500">Bank Account No</span>
                <span className="font-bold text-slate-900">****1827</span>
              </div>
              <div className="p-4 border-b border-slate-300 flex items-center justify-between">
                <span className="text-slate-500">Bank IFSC Code</span>
                <span className="font-bold text-slate-900">****0135</span>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col sm:flex-row min-h-48 border-b border-slate-300">
              {/* Amount Box */}
              <div className="flex-1 p-6 border-b sm:border-b-0 sm:border-r border-slate-300 flex flex-col justify-center">
                <div className="border-[3px] border-teal-500 p-4 inline-block w-full max-w-[280px] mb-4">
                  <div className="text-teal-600 font-bold text-xs mb-1 uppercase tracking-wider">AMOUNT RECEIVED</div>
                  <div className="text-3xl font-black text-slate-900">{formatCurrency(amount)}</div>
                </div>
                <div className="text-xs text-slate-500 mt-2 mb-1">Amount in Words:</div>
                <div className="text-sm font-bold text-slate-800 capitalize leading-relaxed">
                  {numberToWords(amount)}
                </div>
              </div>

              {/* Signature Box */}
              <div className="flex-1 p-6 flex flex-col items-center justify-center relative min-h-[160px]">
                <div className="font-['Dancing_Script',cursive] text-5xl text-slate-800 mb-4 mt-2 transform -rotate-3 opacity-90">
                  Rohit
                </div>
                <div className="w-48 h-px bg-slate-300 mb-2"></div>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Authorized Signature: Rohit</span>
              </div>
            </div>

            {/* Footer Bar */}
            <div className="bg-blue-600 text-white p-3 flex items-center justify-start gap-2">
              <span className="text-xs font-bold uppercase tracking-widest">%Ï VERIFIED TRANSFERRED SECURELY</span>
            </div>
            
          </div>
        </div>

        {/* Outer Text */}
        <div className="mt-8 text-left space-y-2 px-2">
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">ROHIT JANGRA</h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Authorized Regulatory System</p>
          <div className="pt-4 space-y-1">
            <p className="text-xs text-slate-500">This is an official computer-generated receipt matching ROHIT JANGRA voucher parameters.</p>
            <p className="text-xs text-slate-500">Securely processed via SwiftPay Gateway Core Infrastructure.</p>
          </div>
          
          <div className="mt-6 p-5 bg-indigo-950/40 border border-indigo-500/30 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />
            <p className="text-sm text-indigo-200 italic flex gap-3 items-start relative z-10">
              <span className="text-indigo-400 font-serif text-3xl leading-none">"</span>
              <span className="leading-relaxed font-medium">Thank you for transacting with us! Your trust fuels our innovation. We are continuously building the most secure and seamless payment experience just for you.</span>
            </p>
            <p className="text-xs text-indigo-400/80 mt-3 text-right font-bold uppercase tracking-widest relative z-10">— Founder & Team</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-8 px-2">
          <button
            onClick={handleShare}
            className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-700 shadow-xl"
          >
            <Share2 className="w-5 h-5 text-slate-400" /> Share
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5 text-indigo-200" /> Save PDF
          </button>
        </div>
        
        {onClose && (
          <div className="px-2 pb-12">
            <button 
              onClick={onClose}
              className="w-full mt-6 py-4 bg-slate-900/50 hover:bg-slate-800 border border-slate-800/50 text-slate-300 hover:text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};
