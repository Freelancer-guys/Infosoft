import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  CheckCircle,
  X,
  Lock,
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
    country: string;
    state: string;
    city: string;
    postcode: string;
  };
}

interface PaymentGatewayProps {
  onClose: () => void;
}

const services: { [key: string]: string[] } = {
  'Cloud Computing': [
    'Strategy & Migration',
    'Management & Security',
    'Cost Optimization',
  ],
  'Data Management': [
    'Database & Warehousing',
    'Big Data & Analytics',
    'Data Governance',
  ],
  'IT Support & Managed Services': [
    '24/7 Technical Support',
    'Infrastructure Monitoring',
    'Cybersecurity',
  ],
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
      country: 'Australia',
      state: '',
      city: '',
      postcode: '',
    },
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

    if (name === 'amount') {
      setFormData((prev) => ({ ...prev, amount: parseFloat(value) || 0 }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'serviceCategory' && {
        selectedService: '',
        amount: 0,
      }),
    }));
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
        country: 'Australia',
        state: '',
        city: '',
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
      <div className="relative bg-white rounded-xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-8">
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
                {services[formData.serviceCategory].map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
          )}

          {formData.selectedService && (
            <input
              type="number"
              name="amount"
              placeholder="Enter invoice amount (AUD)"
              value={formData.amount || ''}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          )}

          <input type="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleInputChange} className="w-full border rounded-lg px-4 py-2" required />
          <input type="text" name="cardholderName" placeholder="John Doe" value={formData.cardholderName} onChange={handleInputChange} className="w-full border rounded-lg px-4 py-2" required />
          <input type="text" name="cardNumber" placeholder="1234 5678 9012 3456" value={formData.cardNumber} onChange={handleInputChange} className="w-full border rounded-lg px-4 py-2" required />

          <div className="flex gap-4">
            <input type="text" name="expiryDate" placeholder="MM/YY" value={formData.expiryDate} onChange={handleInputChange} className="w-1/2 border rounded-lg px-4 py-2" required />
            <input type="text" name="cvv" placeholder="123" value={formData.cvv} onChange={handleInputChange} className="w-1/2 border rounded-lg px-4 py-2" required />
          </div>

          <h3 className="font-semibold text-lg mt-4">Billing Address</h3>
          <input type="text" name="billingAddress.street" placeholder="123 Main Street" value={formData.billingAddress.street} onChange={handleInputChange} className="w-full border rounded-lg px-4 py-2 mt-2" />
          <input type="text" name="billingAddress.country" value={formData.billingAddress.country} disabled className="w-full border rounded-lg px-4 py-2 mt-2 bg-gray-100 cursor-not-allowed" />
          <input type="text" name="billingAddress.state" placeholder="State/Province" value={formData.billingAddress.state} onChange={handleInputChange} className="w-full border rounded-lg px-4 py-2 mt-2" />
          <input type="text" name="billingAddress.city" placeholder="City" value={formData.billingAddress.city} onChange={handleInputChange} className="w-full border rounded-lg px-4 py-2 mt-2" />
          <input type="text" name="billingAddress.postcode" placeholder="Post Code" value={formData.billingAddress.postcode} onChange={handleInputChange} className="w-full border rounded-lg px-4 py-2 mt-2" />

          <div className="mt-4 flex items-center gap-2 bg-gray-50 border rounded-lg p-3 text-sm text-gray-600">
            <Lock className="w-5 h-5 text-green-600" />
            <span><strong>Secure Payment:</strong> Your payment information is encrypted and secure. We use industry-standard SSL encryption to protect your data.</span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isProcessing || !formData.selectedService || !formData.amount}
            className={`w-full mt-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg px-6 py-3 font-semibold transition ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
          >
            {isProcessing ? 'Processing...' : `Pay A$${formData.amount || 0}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
