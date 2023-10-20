const express = require('express');
const router = express.Router();
const Payment = require('../models/payment.js');
const ChequeDetails = require('../models/ChequeDetails');
const CardDetails=require("../models/CardDetails .js")

// Create a new payment
router.post('/confirm_cheque_payment', async (req, res) => {
    try {
        console.log("backend sideeeee")
        const { totalCost, customerName, customerPhone, amountpaid, remaining_amount, paymentMethod, chequeDetails } = req.body;
        console.log("backend side")
        console.log(req.body)
        // Create a new ChequeDetails document
        const newChequeDetails = new ChequeDetails({

            chequeNo: chequeDetails.chequeNo,
            chequeAmount: chequeDetails.chequeAmount,
            accountHolderName: chequeDetails.accountHolderName,
            bankName: chequeDetails.bankName,
        });

        // Save the ChequeDetails document
        const savedChequeDetails = await newChequeDetails.save();

        // Create a new Payment document with a reference to the saved ChequeDetails
        const newPayment = new Payment({
            totalCost: totalCost,
            customername: customerName,
            customerphoneno: customerPhone,
            amountpaid: amountpaid,
            remaining_amount: remaining_amount,
            payment_method: paymentMethod,
            chequeDetails: savedChequeDetails._id,
        });

        // Save the Payment document
        const savedPayment = await newPayment.save();

        res.status(200).json({ message: 'Payment details saved successfully', payment: savedPayment });
    } catch (error) {
        console.error('Error saving payment details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.post('/confirm_card_payment', async (req, res) => {
    try {
        console.log("backend sideeeee")
        const { totalCost, customerName, customerPhone, amountpaid, remaining_amount, paymentMethod, cardDetails } = req.body;
        console.log("backend side")
        console.log(req.body)
        // Create a new ChequeDetails document
        const newCardDetails = new CardDetails({

            cardNumber: cardDetails.cardNumber,
            cardBankName: cardDetails.cardBankName,
            cardHolderName: cardDetails.cardHolderName,
            
        });

        // Save the ChequeDetails document
        const savedCardDetails = await newCardDetails.save();

        // Create a new Payment document with a reference to the saved ChequeDetails
        const newPayment = new Payment({
            totalCost: totalCost,
            customername: customerName,
            customerphoneno: customerPhone,
            amountpaid: amountpaid,
            remaining_amount: remaining_amount,
            payment_method: paymentMethod,
            cardDetails: savedCardDetails._id,
        });

        // Save the Payment document
        const savedPayment = await newPayment.save();

        res.status(200).json({ message: 'Payment details saved successfully', payment: savedPayment });
    } catch (error) {
        console.error('Error saving payment details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// router.post('/confirm_upi_payment', async (req, res) => {
//     try {
//         console.log("backend sideeeee")
//         const { totalCost, customerName, customerPhone, amountpaid, remaining_amount, paymentMethod, chequeDetails } = req.body;
//         console.log("backend side")
//         console.log(req.body)
//         // Create a new ChequeDetails document
//         const newChequeDetails = new ChequeDetails({

//             chequeNo: chequeDetails.chequeNo,
//             chequeAmount: chequeDetails.chequeAmount,
//             accountHolderName: chequeDetails.accountHolderName,
//             bankName: chequeDetails.bankName,
//         });

//         // Save the ChequeDetails document
//         const savedChequeDetails = await newChequeDetails.save();

//         // Create a new Payment document with a reference to the saved ChequeDetails
//         const newPayment = new Payment({
//             totalCost: totalCost,
//             customername: customerName,
//             customerphoneno: customerPhone,
//             amountpaid: amountpaid,
//             remaining_amount: remaining_amount,
//             payment_method: paymentMethod,
//             chequeDetails: savedChequeDetails._id,
//         });

//         // Save the Payment document
//         const savedPayment = await newPayment.save();

//         res.status(200).json({ message: 'Payment details saved successfully', payment: savedPayment });
//     } catch (error) {
//         console.error('Error saving payment details:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// router.post('/confirm_case_payment', async (req, res) => {
//     try {
//         console.log("backend sideeeee")
//         const { totalCost, customerName, customerPhone, amountpaid, remaining_amount, paymentMethod, chequeDetails } = req.body;
//         console.log("backend side")
//         console.log(req.body)
//         // Create a new ChequeDetails document
//         const newChequeDetails = new ChequeDetails({

//             chequeNo: chequeDetails.chequeNo,
//             chequeAmount: chequeDetails.chequeAmount,
//             accountHolderName: chequeDetails.accountHolderName,
//             bankName: chequeDetails.bankName,
//         });

//         // Save the ChequeDetails document
//         const savedChequeDetails = await newChequeDetails.save();

//         // Create a new Payment document with a reference to the saved ChequeDetails
//         const newPayment = new Payment({
//             totalCost: totalCost,
//             customername: customerName,
//             customerphoneno: customerPhone,
//             amountpaid: amountpaid,
//             remaining_amount: remaining_amount,
//             payment_method: paymentMethod,
//             chequeDetails: savedChequeDetails._id,
//         });

//         // Save the Payment document
//         const savedPayment = await newPayment.save();

//         res.status(200).json({ message: 'Payment details saved successfully', payment: savedPayment });
//     } catch (error) {
//         console.error('Error saving payment details:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

module.exports = router;
