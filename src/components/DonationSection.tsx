import React, { useState } from 'react';
import { ShieldCheck, Heart, QrCode, CreditCard, Landmark, CheckCircle, Printer, X, Sparkles } from 'lucide-react';
import { DONATION_FUNDS, TEMPLE_INFO } from '../data/templeData';
import { Language, DonationReceipt } from '../types';

interface DonationSectionProps {
  currentLang: Language;
}

export const DonationSection: React.FC<DonationSectionProps> = ({ currentLang }) => {
  const [selectedFundId, setSelectedFundId] = useState<string>('anna-daan');
  const [selectedAmount, setSelectedAmount] = useState<number>(1100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  
  // Donor details
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMode, setPaymentMode] = useState<'upi' | 'card' | 'netbanking'>('upi');

  // Checkout & Receipt state
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [generatedReceipt, setGeneratedReceipt] = useState<DonationReceipt | null>(null);

  const selectedFund = DONATION_FUNDS.find((f) => f.id === selectedFundId) || DONATION_FUNDS[0];
  const finalAmount = isCustom ? Number(customAmount) || 0 : selectedAmount;

  const handleSelectPredefined = (amt: number) => {
    setSelectedAmount(amt);
    setIsCustom(false);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setIsCustom(true);
  };

  const handleStartDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (finalAmount <= 0 || !donorName || !donorPhone) return;
    setShowPaymentModal(true);
  };

  const handleCompletePayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const receipt: DonationReceipt = {
        receiptNo: `OD-JAG-80G-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
        donorName,
        donorEmail: donorEmail || 'devotee@jagannath.org',
        donorPhone,
        panNumber: panNumber ? panNumber.toUpperCase() : 'NOT PROVIDED (ANONYMOUS DAKSHINA)',
        address: address || 'Bhubaneswar, Odisha',
        fundName: selectedFund.name,
        amount: finalAmount,
        paymentMethod: paymentMode === 'upi' ? 'UPI (Instant QR / VPA)' : paymentMode === 'card' ? 'Visa / MasterCard / RuPay' : 'Net Banking (NEFT/RTGS)',
        date: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        transactionRef: `TXN${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 999)}`,
        trustRegistrationNo: TEMPLE_INFO.regNumber,
        section80GApproval: TEMPLE_INFO.exemption80G,
      };

      setGeneratedReceipt(receipt);
      setIsProcessing(false);
    }, 900);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="ehundi" className="py-16 sm:py-24 bg-white text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-stone-200">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-800">
              {currentLang === 'or' ? 'ପବିତ୍ର ଇ-ହୁଣ୍ଡି ସମର୍ପଣ' : currentLang === 'hi' ? 'पवित्र ई-हुंडी दान' : 'Sacred E-Hundi & Danam'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-stone-900 tracking-tight">
              {currentLang === 'or' ? 'ଶ୍ରୀକ୍ଷେତ୍ର ଦାନ ଓ ଅନ୍ନଦାନ ସେବା' : currentLang === 'hi' ? 'ई-हुंडी एवं अन्नदान समर्पण' : 'Online E-Hundi & Charitable Offerings'}
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Support daily Anna Daan feeding over 1,200 pilgrims, preservation of Kalinga heritage, cow shelter seva, and Vedic Gurukul education. All donations are 100% tax exempt under Section 80G.
            </p>
          </div>

          {/* 80G Tax Exemption Callout */}
          <div className="bg-amber-50/90 border border-amber-200/90 rounded-xl p-4 sm:p-5 text-xs text-amber-950 space-y-1.5 shrink-0 max-w-sm">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Section 80G Tax Exemption</span>
            </div>
            <p className="text-stone-600 text-[11px] leading-relaxed">
              50% deduction available under Section 80G(5)(vi) of the Income Tax Act. Instant downloadable digital receipt with Trust PAN and 80G certificate number.
            </p>
          </div>
        </div>

        {/* Giving Module Container */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Fund Selector */}
          <div className="lg:col-span-5 space-y-3">
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
              1. Select Sacred Cause (Seva Fund)
            </label>

            <div className="space-y-3">
              {DONATION_FUNDS.map((fund) => {
                const isSelected = fund.id === selectedFundId;
                return (
                  <button
                    key={fund.id}
                    type="button"
                    onClick={() => {
                      setSelectedFundId(fund.id);
                      setSelectedAmount(fund.suggestedAmounts[1] || 1100);
                      setIsCustom(false);
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between ${
                      isSelected
                        ? 'border-amber-700 bg-amber-50/70 shadow-xs ring-1 ring-amber-700/50'
                        : 'border-stone-200 bg-[#FAF7F2]/40 hover:border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    <div className="space-y-1 pr-3">
                      <div className="font-heading font-bold text-stone-900 text-sm sm:text-base">
                        {fund.name}
                      </div>
                      <div className="text-xs text-stone-500 font-medium">
                        {fund.odiaName}
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed pt-1">
                        {fund.description}
                      </p>
                    </div>

                    <div className="shrink-0 pt-0.5">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-amber-700 bg-amber-700' : 'border-stone-300'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Amount Selection & Donor Form */}
          <div className="lg:col-span-7 bg-[#FAF7F2]/60 rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6">
            <form onSubmit={handleStartDonation} className="space-y-6">
              
              {/* Step 2: Amount Selector */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
                  2. Choose Contribution Amount (₹ INR)
                </label>

                {/* Predefined Pills */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                  {selectedFund.suggestedAmounts.map((amt) => {
                    const isPicked = !isCustom && selectedAmount === amt;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handleSelectPredefined(amt)}
                        className={`py-2.5 px-2 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer text-center ${
                          isPicked
                            ? 'bg-amber-800 text-white shadow-xs'
                            : 'bg-white border border-stone-200 text-stone-800 hover:border-amber-400 hover:bg-amber-50/50'
                        }`}
                      >
                        ₹{amt.toLocaleString('en-IN')}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount Field */}
                <div className="mt-3.5">
                  <div className="relative rounded-lg shadow-2xs">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                      <span className="text-stone-500 font-mono text-sm">₹</span>
                    </div>
                    <input
                      type="number"
                      min="51"
                      step="1"
                      placeholder="Or enter any custom amount (e.g. 5000)"
                      value={customAmount}
                      onChange={handleCustomChange}
                      className={`block w-full rounded-lg border py-2.5 pl-8 pr-4 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-700 bg-white ${
                        isCustom && Number(customAmount) > 0 ? 'border-amber-700 ring-1 ring-amber-700/40' : 'border-stone-300'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Devotee & 80G Tax Details */}
              <div className="space-y-4 pt-4 border-t border-stone-200">
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
                  3. Devotee & Tax Receipt Information
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Devotee / Donor Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Subrat Mohapatra"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      WhatsApp / Mobile <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 94370 12345"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm bg-white font-mono focus:outline-none focus:ring-2 focus:ring-amber-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      PAN Card Number (Required for 80G Tax Exemption)
                    </label>
                    <input
                      type="text"
                      maxLength={10}
                      placeholder="e.g. ABCDE1234F"
                      value={panNumber}
                      onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm bg-white font-mono uppercase focus:outline-none focus:ring-2 focus:ring-amber-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Email Address (For Instant Receipt PDF)
                    </label>
                    <input
                      type="email"
                      placeholder="donor@example.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Address with Pincode (For Tax Compliance)
                  </label>
                  <input
                    type="text"
                    placeholder="Address, City, State, PIN"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
                  />
                </div>
              </div>

              {/* Step 4: Payment Mode Selection */}
              <div className="pt-4 border-t border-stone-200">
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  4. Preferred Payment Gateway
                </label>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMode('upi')}
                    className={`p-3 rounded-lg border text-left flex items-center gap-2 cursor-pointer transition-all ${
                      paymentMode === 'upi'
                        ? 'border-amber-700 bg-amber-50 text-amber-900 font-semibold'
                        : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-amber-700 shrink-0" />
                    <span className="text-xs">UPI / QR Code</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMode('card')}
                    className={`p-3 rounded-lg border text-left flex items-center gap-2 cursor-pointer transition-all ${
                      paymentMode === 'card'
                        ? 'border-amber-700 bg-amber-50 text-amber-900 font-semibold'
                        : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-amber-700 shrink-0" />
                    <span className="text-xs">Cards / RuPay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMode('netbanking')}
                    className={`p-3 rounded-lg border text-left flex items-center gap-2 cursor-pointer transition-all ${
                      paymentMode === 'netbanking'
                        ? 'border-amber-700 bg-amber-50 text-amber-900 font-semibold'
                        : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <Landmark className="w-4 h-4 text-amber-700 shrink-0" />
                    <span className="text-xs">Net Banking</span>
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={finalAmount <= 0}
                  className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-amber-800 hover:bg-amber-900 active:bg-amber-950 transition-all shadow-sm text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-600"
                >
                  <Heart className="w-4 h-4" />
                  <span>
                    Offer Seva Dakshina of ₹{finalAmount.toLocaleString('en-IN')} (E-Hundi)
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Payment Confirmation & Instant 80G Receipt Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 border border-stone-200 shadow-2xl relative my-8">
              
              <div className="flex items-start justify-between pb-4 border-b border-stone-200">
                <div>
                  <span className="text-xs font-semibold uppercase text-amber-800 tracking-wider">
                    {generatedReceipt ? 'Tax Exemption Receipt' : 'Secure E-Hundi Gateway'}
                  </span>
                  <h3 className="text-2xl font-heading font-bold text-stone-900 mt-1">
                    {generatedReceipt ? '80G Donation Receipt' : 'Complete Temple Dakshina'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => { setShowPaymentModal(false); setGeneratedReceipt(null); }}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!generatedReceipt ? (
                /* Payment Gateway Gateway Simulation */
                <div className="space-y-6 text-center">
                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-stone-800">
                    <span className="text-xs text-stone-500 block">Contributing To</span>
                    <strong className="text-base font-heading font-bold text-stone-900 block mt-0.5">
                      {selectedFund.name}
                    </strong>
                    <div className="font-mono text-3xl font-bold text-amber-900 mt-2">
                      ₹{finalAmount.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* QR Code / Simulated UPI */}
                  <div className="py-2 flex flex-col items-center">
                    <div className="p-4 bg-white rounded-xl border-2 border-dashed border-stone-300 shadow-xs inline-block">
                      <svg viewBox="0 0 160 160" className="w-36 h-36" fill="currentColor">
                        {/* Realistic Mock QR Matrix */}
                        <rect x="0" y="0" width="40" height="40" rx="4" />
                        <rect x="8" y="8" width="24" height="24" fill="white" />
                        <rect x="14" y="14" width="12" height="12" />

                        <rect x="120" y="0" width="40" height="40" rx="4" />
                        <rect x="128" y="8" width="24" height="24" fill="white" />
                        <rect x="134" y="14" width="12" height="12" />

                        <rect x="0" y="120" width="40" height="40" rx="4" />
                        <rect x="8" y="128" width="24" height="24" fill="white" />
                        <rect x="14" y="134" width="12" height="12" />

                        {/* Data dots */}
                        <rect x="50" y="10" width="10" height="10" />
                        <rect x="70" y="10" width="20" height="10" />
                        <rect x="100" y="10" width="10" height="10" />
                        <rect x="50" y="30" width="20" height="10" />
                        <rect x="80" y="30" width="30" height="10" />
                        <rect x="10" y="50" width="20" height="10" />
                        <rect x="40" y="50" width="10" height="20" />
                        <rect x="60" y="50" width="40" height="10" />
                        <rect x="110" y="50" width="20" height="10" />
                        <rect x="140" y="50" width="10" height="20" />
                        <rect x="10" y="70" width="10" height="20" />
                        <rect x="30" y="70" width="20" height="10" />
                        <rect x="60" y="70" width="20" height="20" />
                        <rect x="90" y="70" width="20" height="10" />
                        <rect x="120" y="70" width="10" height="20" />
                        <rect x="10" y="100" width="20" height="10" />
                        <rect x="50" y="90" width="20" height="10" />
                        <rect x="80" y="100" width="10" height="30" />
                        <rect x="100" y="90" width="20" height="20" />
                        <rect x="130" y="100" width="20" height="10" />
                        <rect x="50" y="120" width="20" height="10" />
                        <rect x="50" y="140" width="10" height="10" />
                        <rect x="70" y="130" width="20" height="20" />
                        <rect x="100" y="130" width="10" height="10" />
                        <rect x="120" y="120" width="30" height="10" />
                        <rect x="120" y="140" width="20" height="10" />
                      </svg>
                    </div>

                    <div className="mt-3 text-xs text-stone-500 font-mono">
                      UPI ID: <span className="font-semibold text-stone-800">dasjagannath@sbi</span>
                    </div>
                    <p className="text-xs text-stone-400 mt-1">
                      Scan with Google Pay, PhonePe, Paytm or BHIM
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowPaymentModal(false)}
                      className="px-5 py-2.5 rounded-lg border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-50 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleCompletePayment}
                      disabled={isProcessing}
                      className="px-6 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 shadow-xs"
                    >
                      {isProcessing ? (
                        <span>Verifying Transaction...</span>
                      ) : (
                        <span>Simulate Successful Payment</span>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                /* Official 80G Tax Exemption Receipt (Printable & Downloadable) */
                <div className="space-y-6">
                  <div className="border border-stone-300 bg-white p-6 rounded-xl space-y-4 print:p-0 print:border-none">
                    
                    {/* Header */}
                    <div className="text-center pb-4 border-b border-stone-200">
                      <div className="text-[11px] font-bold uppercase tracking-widest text-amber-900">
                        {TEMPLE_INFO.trustees}
                      </div>
                      <h4 className="text-xl font-heading font-bold text-stone-900 mt-0.5">
                        {TEMPLE_INFO.name}
                      </h4>
                      <p className="text-xs text-stone-500">
                        {TEMPLE_INFO.location} · Reg: {TEMPLE_INFO.regNumber}
                      </p>
                      <div className="inline-block mt-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded text-[11px] text-amber-950 font-medium">
                        Receipt for Donation under Section 80G of the Income Tax Act, 1961
                      </div>
                    </div>

                    {/* Metadata Table */}
                    <div className="grid grid-cols-2 gap-3 text-xs py-2 border-b border-stone-200">
                      <div>
                        <span className="text-stone-500 block">Receipt Number:</span>
                        <strong className="font-mono text-stone-900">{generatedReceipt.receiptNo}</strong>
                      </div>
                      <div>
                        <span className="text-stone-500 block">Date of Realisation:</span>
                        <strong className="text-stone-900 font-mono">{generatedReceipt.date}</strong>
                      </div>
                      <div>
                        <span className="text-stone-500 block">Donor Name:</span>
                        <strong className="text-stone-900">{generatedReceipt.donorName}</strong>
                      </div>
                      <div>
                        <span className="text-stone-500 block">Donor PAN:</span>
                        <strong className="font-mono text-stone-900">{generatedReceipt.panNumber}</strong>
                      </div>
                      <div>
                        <span className="text-stone-500 block">Fund / Purpose:</span>
                        <strong className="text-stone-900">{generatedReceipt.fundName}</strong>
                      </div>
                      <div>
                        <span className="text-stone-500 block">Amount Received:</span>
                        <strong className="text-emerald-800 font-mono font-bold text-base">
                          ₹{generatedReceipt.amount.toLocaleString('en-IN')}
                        </strong>
                      </div>
                    </div>

                    {/* Tax Approval Note & Digital Signature */}
                    <div className="pt-2 text-[11px] text-stone-600 space-y-2">
                      <div>
                        <strong>80G Approval Order:</strong> {generatedReceipt.section80GApproval}
                      </div>
                      <div className="flex items-end justify-between pt-4">
                        <div>
                          <div className="font-mono text-[10px] text-stone-400">
                            TXN REF: {generatedReceipt.transactionRef}
                          </div>
                          <div className="text-[10px] text-emerald-700 font-medium flex items-center gap-1 mt-0.5">
                            <CheckCircle className="w-3 h-3" /> Digitally Verified & Issued
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-xs font-serif italic text-stone-700 underline">
                            P. K. Mohapatra
                          </div>
                          <div className="text-[10px] text-stone-500 font-medium">
                            Authorized Signatory / Managing Trustee
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="px-4.5 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" /> Print / Save Tax Receipt (PDF)
                    </button>
                    <button
                      type="button"
                      onClick={() => { setShowPaymentModal(false); setGeneratedReceipt(null); }}
                      className="px-6 py-2 text-xs sm:text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg transition-colors cursor-pointer"
                    >
                      Done (Jai Jagannath)
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
