import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CardImg from "../assets/Images/credit-card.png"
import Upi from "../assets/Images/upi.png"
import ApplePay from "../assets/Images/ApplePay.png"
import NetBanking from "../assets/Images/NetBanking.png"

const PaymentMethods = () => {
  const paymentMethods = [
    {
      name: "Credit/Debit Card",
      image: CardImg,
    },
    {
      name: "PayPal",
      image: "https://cdn-icons-png.flaticon.com/128/888/888870.png",
    },
    {
      name: "UPI",
      image: Upi,
    },
    {
      name: "Net Banking",
      image: NetBanking,
    },
    {
      name: "Google Pay",
      image: "https://cdn-icons-png.flaticon.com/128/888/888857.png",
    },
    {
      name: "Apple Pay",
      image: ApplePay,
    },
  ];
  return (
    <>
    <Navbar />
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Select a Payment Method</h2>
        <p className="text-gray-600 mb-6">Choose a secure and convenient payment method.</p>

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {paymentMethods.map((method, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-green-100 transition-all cursor-pointer"
            >
              <img src={method.image} alt={method.name} className="w-16 h-16 mb-2" />
              <span className="text-sm font-medium text-gray-700">{method.name}</span>
            </div>
          ))}
        </div>

        {/* Checkout Button */}
        <button className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all">
          Proceed to Payment
        </button>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default PaymentMethods