import React, { useState } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'

const PaymentModal = ({ orderId, name, amount, firstname, email, address, city, country }) => {
    const [ merchant_id, setMerchant_id ] = useState('')

    const getPayhereMerchantid = async () => {
        const { data : merchant_id } = await axios.get('/api/config/payhere')
        setMerchant_id(`${merchant_id}`)
    }
    getPayhereMerchantid()
    // Put the payment variables here
    var payment = {
        sandbox: true, // if the account is sandbox or real
        merchant_id: merchant_id, // Replace your Merchant ID
        return_url: '/',
        cancel_url: '/',
        notify_url: 'http://sample.com/notify',
        order_id: orderId,
        items: name,
        amount: amount, 
        currency: 'LKR',
        first_name: firstname,
        last_name: '',
        email: email,
        phone: '',
        address: address,
        city: city,
        country: country,
        delivery_address: address, // optional field
        delivery_city: city, // optional field
        delivery_country: country, // optional field
        //custom_1: '', // optional field
        //custom_2: '', // optional field
    };
    
    // Called when user completed the payment. It can be a successful payment or failure
    window.payhere.onCompleted = function onCompleted(orderId) {
        console.log("Payment completed. OrderID:" + orderId);
        //Note: validate the payment and show success or failure page to the customer
    };

    // Called when user closes the payment without completing
    window.payhere.onDismissed = function onDismissed() {
        //Note: Prompt user to pay again or show an error page
        console.log("Payment dismissed");
    };

    // Called when error happens when initializing payment such as invalid parameters
    window.payhere.onError = function onError(error) {
        // Note: show an error page
        console.log("Error:"  + error);
    };

    function pay(){
        window.payhere.startPayment(payment);
    }

    return <Button onClick={pay}>Pay with Payhere</Button>;
};

export default PaymentModal;
