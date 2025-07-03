import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  Shield,
  Lock,
  CheckCircle,
  Calendar,
  User,
  Mail,
  X,
} from 'lucide-react';

interface FormData {
  email: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  serviceCategory: string;
  selectedService: string;
  amount: number;
  billingAddress: {
    street: string;
    suburb: string;
    state: string;
    postcode: string;
  };
}

interface PaymentGatewayProps {
  onClose: () => void;
}

interface Services {
  [key: string]: {
    [key: string]: number;
  };
}

const services: Services = {
  'Cloud Computing': {
    'Strategy & Migration': 2999,
    'Management & Security': 1999,
    'Cost Optimization': 1499,
  },
  'Data Management': {
    'Database & Warehousing': 3499,
    'Big Data & Analytics': 4999,
    'Data Governance': 2499,
  },
  'IT Support & Managed Services': {
    '24/7 Technical Support': 899,
    'Infrastructure Monitoring': 1299,
    'Cybersecurity': 1899,
  },
};

const PaymentGateway: React.FC<PaymentGatewayProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    serviceCategory: '',
    selectedService: '',
    amount: 0,
    billingAddress: {
      street: '',
      suburb: '',
      state: '',
      postcode: '',
    },
  });

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith('billingAddress.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [key]: value,
        },
      }));
      return;
    }

    let newFormData = { ...formData, [name]: value };

    if (name === 'serviceCategory') {
      newFormData.selectedService = '';
      newFormData.amount = 0;
    }

    if (name === 'selectedService' && value && formData.serviceCategory) {
      newFormData.amount = services[formData.serviceCategory][value];
    }

    setFormData(newFormData);
  };

  const handleSubmit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleReset = () => {
    setFormData({
      email: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
      serviceCategory: '',
      selectedService: '',
      amount: 0,
      billingAddress: {
        street: '',
        suburb: '',
        state: '',
        postcode: '',
      },
    });
    setIsSuccess(false);
    setIsProcessing(false);
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-4">
            Your payment of ${formData.amount.toLocaleString()} was processed successfully.
          </p>
          <button
            onClick={handleReset}
            className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700"
          >
            Make Another Payment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-3 bg-teal-100 rounded-full flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-teal-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Secure Payment</h2>
          <p className="text-gray-500 text-sm mt-1">Complete your payment securely</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Service Category</label>
            <select
              name="serviceCategory"
              value={formData.serviceCategory}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            >
              <option value="">Select a service category</option>
              {Object.keys(services).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {formData.serviceCategory && (
            <div>
              <label className="block font-medium mb-1">Specific Service</label>
              <select
                name="selectedService"
                value={formData.selectedService}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-4 py-2"
                required
              >
                <option value="">Select a service</option>
                {Object.keys(services[formData.serviceCategory]).map((service) => (
                  <option key={service} value={service}>
                    {service} - ${services[formData.serviceCategory][service]}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Cardholder Name</label>
            <input
              type="text"
              name="cardholderName"
              value={formData.cardholderName}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block font-medium mb-1">Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-4 py-2"
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block font-medium mb-1">CVV</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-4 py-2"
                placeholder="123"
                required
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isProcessing || !formData.selectedService}
            className={`w-full bg-teal-600 text-white rounded-lg px-6 py-3 font-semibold transition ${
              isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-700'
            }`}
          >
            {isProcessing ? 'Processing...' : `Pay $${formData.amount || 0}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
