import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Payment() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const customerName = searchParams.get('customerName');
  const totalCost = searchParams.get('totalCost');
  const customerPhone = searchParams.get('customerPhone');

  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [amountpaid, setAmountpaid] = useState();
  const [remaining_amount, setRemaining_amount] = useState(0)

  const [chequeDetails, setChequeDetails] = useState({
    chequeNo: '',
    chequeAmount: '',
    accountHolderName: '',
    bankName: '',
  });

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardBankName: '',
    cardHolderName: '',
  });

  const [upiDetails, setUpiDetails] = useState({
    upiID: '',
  });

  const [cashDetails, setCashDetails] = useState({
    cash_amount: '',
  })

  const handleAmountPaidChange = (e) => {
    setAmountpaid(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleConfirmPayment = () => {
    if (paymentMethod === 'Cheque') {
      // Create a JSON payload from the chequeDetails
      const paymentData = {
        totalCost,
        customerName,
        customerPhone,
        amountpaid,
        remaining_amount,
        paymentMethod,
        chequeDetails, // This includes all the chequeDetails data
      };

      console.log("frontend side")
      console.log(paymentData)

      const url = "http://localhost:4000/payment/confirm_cheque_payment";
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error saving Cheque payment details');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Cheque payment details saved:', data);
          // Handle success as needed (e.g., show a success message)
        })
        .catch((error) => {
          console.error('Error saving Cheque payment details:', error);
          // Handle errors as needed (e.g., show an error message)
        });
    }
    else if (paymentMethod === 'Card') {
      const paymentData = {
        totalCost,
        customerName,
        customerPhone,
        amountpaid,
        remaining_amount,
        paymentMethod,
        cardDetails, // This includes all the chequeDetails data
      };

      console.log("frontend side")
      console.log(paymentData)

      const url = "http://localhost:4000/payment/confirm_card_payment";
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error saving Card payment details');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Card payment details saved:', data);
          // Handle success as needed (e.g., show a success message)
        })
        .catch((error) => {
          console.error('Error saving Card payment details:', error);
          // Handle errors as needed (e.g., show an error message)
        });
    }
    else if (paymentMethod === 'UPI') {
      const paymentData = {
        totalCost,
        customerName,
        customerPhone,
        amountpaid,
        remaining_amount,
        paymentMethod,
        upiDetails, // This includes all the chequeDetails data
      };

      console.log("frontend side")
      console.log(paymentData)

      const url = "http://localhost:4000/payment/confirm_upi_payment";
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error saving UPI payment details');
          }
          return response.json();
        })
        .then((data) => {
          console.log('UPI payment details saved:', data);
          // Handle success as needed (e.g., show a success message)
        })
        .catch((error) => {
          console.error('Error saving UPI payment details:', error);
          // Handle errors as needed (e.g., show an error message)
        });
    }
    else {
      const paymentData = {
        totalCost,
        customerName,
        customerPhone,
        amountpaid,
        remaining_amount,
        paymentMethod,
        cashDetails
      };

      console.log("frontend side")
      console.log(paymentData)

      const url = "http://localhost:4000/payment/confirm_cash_payment";
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error saving Cheque payment details');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Cash details saved:', data);
          // Handle success as needed (e.g., show a success message)
        })
        .catch((error) => {
          console.error('Error saving Cash payment details:', error);
          // Handle errors as needed (e.g., show an error message)
        });
    }
  };

  return (
    <div className="mx-auto max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Payment Details</h2>

      <p className="mb-4">Total Cost: {totalCost}</p>
      <p className="mb-4">Customer Name: {customerName}</p>
      <p className="mb-4">Customer Phone: {customerPhone}</p>

      <div className="mb-4">
        <label className="block mb-2">Amount Paid:</label>
        <input
          type="text"
          value={amountpaid}
          onChange={handleAmountPaidChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Remaining Amount:</label>
        <input
          type="number"
          value={totalCost}
          disabled
          className="w-full p-2 border rounded bg-gray-200"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
          className="w-full p-2 border rounded"
        >
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="Cheque">Cheque</option>
          <option value="UPI">UPI</option>
        </select>
      </div>

      {paymentMethod === 'Cheque' && (
        <div>
          <div className="mb-4">
            <label className="block mb-2">Cheque No:</label>
            <input
              type="text"
              value={chequeDetails.chequeNo}
              onChange={(e) => setChequeDetails({ ...chequeDetails, chequeNo: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Cheque Amount:</label>
            <input
              type="text"
              value={chequeDetails.chequeAmount}
              onChange={(e) => setChequeDetails({ ...chequeDetails, chequeAmount: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Account Holder Name:</label>
            <input
              type="text"
              value={chequeDetails.accountHolderName}
              onChange={(e) => setChequeDetails({ ...chequeDetails, accountHolderName: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Bank Name:</label>
            <input
              type="text"
              value={chequeDetails.bankName}
              onChange={(e) => setChequeDetails({ ...chequeDetails, bankName: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      )}


      {paymentMethod === 'Card' && (
        <div>
          <div className="mb-4">
            <label className="block mb-2">Card Number:</label>
            <input
              type="text"
              value={cardDetails.cardNumber}
              onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Bank Name:</label>
            <input
              type="text"
              value={cardDetails.cardBankName}
              onChange={(e) => setCardDetails({ ...cardDetails, cardBankName: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Card Holder Name:</label>
            <input
              type="text"
              value={cardDetails.cardHolderName}
              onChange={(e) => setCardDetails({ ...cardDetails, cardHolderName: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      )}


      {paymentMethod === 'UPI' && (
        <div>
          <div className="mb-4">
            <label className="block mb-2">UPI ID:</label>
            <input
              type="text"
              value={upiDetails.upiID}
              onChange={(e) => setUpiDetails({ ...upiDetails, upiID: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      )}

      {paymentMethod === 'Cash' && (
        <div>
          <div className="mb-4">
            <label className="block mb-2">Cash Amount :</label>
            <input
              type="text"
              value={cashDetails.cash_amount}
              onChange={(e) => setCashDetails({ ...cashDetails, cash_amount: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      )}

      <button
        onClick={handleConfirmPayment}
        className="bg-green-500 hover.bg-green-600 text-white font-semibold py-2 px-4 rounded"
      >
        Confirm Payment
      </button>
    </div>
  );
}

export default Payment;
