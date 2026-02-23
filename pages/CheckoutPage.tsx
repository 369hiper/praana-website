import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, MessageCircle, Send } from 'lucide-react';
import CountrySelector from '../components/CountrySelector';
import { createOrder } from '../services/api';

const CheckoutPage: React.FC = () => {
  const { state, dispatch } = useCart();
  const [step, setStep] = useState<'cart' | 'address' | 'contact' | 'confirmation'>('cart');
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    phone: ''
  });
  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    phone: ''
  });
  const [sameAsShipping, setSameAsShipping] = useState(true);

  // New Contact Info State
  const [contactInfo, setContactInfo] = useState({
    whatsapp: '',
    telegram: '',
    preferredMethod: 'whatsapp' as 'whatsapp' | 'telegram' | 'email' | 'phone'
  });

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTax = () => {
    return getTotalPrice() * 0.085; // 8.5% tax
  };

  const getShipping = () => {
    return 0; // Free shipping for now
  };

  const getTotal = () => {
    return getTotalPrice() + getTax() + getShipping();
  };

  const handlePlaceOrder = async () => {
    try {
      // Prepare order data (Manual Processing)
      const orderData = {
        items: state.items.map(item => ({
          productId: item.productId || 'UNKNOWN_PRODUCT_ID', // Fallback for safety
          variantId: item.variantId || 'DEFAULT',
          quantity: item.quantity,
          unitPrice: item.price,
          totalPrice: item.price * item.quantity
        })),
        subtotal: getTotalPrice(),
        taxAmount: getTax(),
        shippingCost: getShipping(),
        totalAmount: getTotal(),
        shippingAddress: { ...shippingInfo },
        billingAddress: sameAsShipping ? { ...shippingInfo } : { ...billingInfo },
        contactInfo: { ...contactInfo },
        paymentStatus: 'pending_manual_verification',
        paymentMethod: 'manual_inquiry', // Added required field
        orderType: 'manual_inquiry'
      };

      // Call Backend API
      console.log('Submitting order to backend...', orderData);
      const response = await createOrder(orderData);

      console.log('Order submitted successfully:', response);

      dispatch({ type: 'CLEAR_CART' });
      setStep('confirmation');

    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to submit order request. Please ensure the backend server is running.');
    }
  };

  if (step === 'confirmation') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Request Received!</h2>
          <p className="text-slate-600 mb-4 text-lg">
            Thank you for your interest. Your order request <span className="font-bold">#REQ-{Date.now().toString().slice(-6)}</span> has been received.
          </p>
          <div className="bg-slate-50 p-6 rounded-xl max-w-2xl mx-auto mb-8 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-2">What happens next?</h3>
            <p className="text-slate-600">
              One of our sales associates will contact you shortly via <strong>{contactInfo.preferredMethod.toUpperCase()}</strong> or <strong>Email</strong> to finalize the payment and shipping details.
            </p>
            <p className="text-slate-500 text-sm mt-4">
              We accept payments via Xoom, PayPal, Wise, and Bank Transfer.
            </p>
          </div>
          <Link
            to="/"
            className="inline-block bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/#products" className="mb-8 inline-flex items-center text-praana-primary hover:underline">
        <ArrowLeft className="w-4 h-4 mr-1" /> Continue Shopping
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Checkout</h2>

            {/* Step Indicator */}
            <div className="flex items-center mb-8">
              <div className={`flex-1 text-center ${step === 'cart' ? 'text-praana-primary font-bold' : 'text-slate-500'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${step === 'cart' ? 'bg-praana-primary/20' : 'bg-slate-100'}`}>1</div>
                <div>Cart</div>
              </div>
              <div className="h-0.5 w-1/6 bg-slate-200"></div>
              <div className={`flex-1 text-center ${step === 'address' ? 'text-praana-primary font-bold' : 'text-slate-500'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${step === 'address' ? 'bg-praana-primary/20' : 'bg-slate-100'}`}>2</div>
                <div>Address</div>
              </div>
              <div className="h-0.5 w-1/6 bg-slate-200"></div>
              <div className={`flex-1 text-center ${step === 'contact' ? 'text-praana-primary font-bold' : 'text-slate-500'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${step === 'contact' ? 'bg-praana-primary/20' : 'bg-slate-100'}`}>3</div>
                <div>Contact</div>
              </div>
            </div>

            {/* Step 1: Cart Items */}
            {step === 'cart' && (
              <div className="space-y-4">
                {state.items.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">Your cart is empty.</div>
                ) : (
                  state.items.map(item => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg">
                      <div className="w-16 h-16 flex-shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-slate-900">{item.name} <span className="text-sm text-slate-500">({item.variant?.name})</span></h3>
                        <p className="text-slate-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-slate-600 text-sm">${item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Step 2: Address */}
            {step === 'address' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Shipping Information
                </h3>
                {/* Shipping Form Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                    <input type="text" value={shippingInfo.firstName} onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-praana-primary focus:border-praana-primary text-slate-900" />.
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                    <input type="text" value={shippingInfo.lastName} onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-praana-primary focus:border-praana-primary text-slate-900" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input type="email" value={shippingInfo.email} onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-praana-primary focus:border-praana-primary text-slate-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                  <input type="text" value={shippingInfo.address} onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-praana-primary focus:border-praana-primary text-slate-900" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                    <input type="text" value={shippingInfo.city} onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-praana-primary focus:border-praana-primary text-slate-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
                    <input type="text" value={shippingInfo.state} onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-praana-primary focus:border-praana-primary text-slate-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">ZIP Code</label>
                    <input type="text" value={shippingInfo.zipCode} onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-praana-primary focus:border-praana-primary text-slate-900" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
                  <CountrySelector
                    value={shippingInfo.country}
                    onChange={(value) => setShippingInfo({ ...shippingInfo, country: value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                  <input type="tel" value={shippingInfo.phone} onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-praana-primary focus:border-praana-primary text-slate-900" />
                </div>

                <div className="flex items-center">
                  <input type="checkbox" id="sameAsShipping" checked={sameAsShipping} onChange={(e) => setSameAsShipping(e.target.checked)} className="h-4 w-4 text-praana-primary focus:ring-praana-primary border-slate-300 rounded" />
                  <label htmlFor="sameAsShipping" className="ml-2 block text-sm text-slate-700">Billing address same as shipping</label>
                </div>

                {!sameAsShipping && (
                  <div className="mt-4 space-y-4 p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-medium text-slate-900">Billing Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className="block text-sm font-medium text-slate-700 mb-1">First Name</label><input type="text" value={billingInfo.firstName} onChange={(e) => setBillingInfo({ ...billingInfo, firstName: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-praana-primary focus:border-praana-primary text-slate-900" /></div>
                      <div><label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label><input type="text" value={billingInfo.lastName} onChange={(e) => setBillingInfo({ ...billingInfo, lastName: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-praana-primary focus:border-praana-primary text-slate-900" /></div>
                    </div>
                    <div><label className="block text-sm font-medium text-slate-700 mb-1">Address</label><input type="text" value={billingInfo.address} onChange={(e) => setBillingInfo({ ...billingInfo, address: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-praana-primary focus:border-praana-primary text-slate-900" /></div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                        <input type="text" value={billingInfo.city} onChange={(e) => setBillingInfo({ ...billingInfo, city: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-praana-primary focus:border-praana-primary text-slate-900" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
                        <input type="text" value={billingInfo.state} onChange={(e) => setBillingInfo({ ...billingInfo, state: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-praana-primary focus:border-praana-primary text-slate-900" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">ZIP Code</label>
                        <input type="text" value={billingInfo.zipCode} onChange={(e) => setBillingInfo({ ...billingInfo, zipCode: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-praana-primary focus:border-praana-primary text-slate-900" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
                      <CountrySelector
                        value={billingInfo.country}
                        onChange={(value) => setBillingInfo({ ...billingInfo, country: value })}
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button onClick={() => setStep('cart')} className="flex-1 border border-slate-300 text-slate-700 py-3 rounded-full font-bold hover:bg-slate-50 transition-colors">Back</button>
                  <button onClick={() => setStep('contact')} className="flex-1 bg-slate-900 text-white py-3 rounded-full font-bold hover:bg-slate-800 transition-colors">Continue</button>
                </div>
              </div>
            )}

            {/* Step 3: Contact & Payment Info */}
            {step === 'contact' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Payment & Contact Method
                </h3>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                  <p className="font-bold mb-1">Important Payment Information</p>
                  <p>
                    We currently handle payments securely via <strong>Xoom, PayPal, Wise, or Bank Transfer</strong> through our dedicated sales team.
                    Please provide your preferred contact method below, and we will reach out to you immediately to finalize your order securely.
                  </p>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Confirmation Channel</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setContactInfo({ ...contactInfo, preferredMethod: 'whatsapp' })}
                      className={`px-4 py-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${contactInfo.preferredMethod === 'whatsapp' ? 'border-green-500 bg-green-50 text-green-700 font-bold shadow-sm' : 'border-slate-200 hover:border-slate-300 text-slate-600'}`}
                    >
                      WhatsApp
                    </button>
                    <button
                      onClick={() => setContactInfo({ ...contactInfo, preferredMethod: 'telegram' })}
                      className={`px-4 py-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${contactInfo.preferredMethod === 'telegram' ? 'border-blue-500 bg-blue-50 text-blue-700 font-bold shadow-sm' : 'border-slate-200 hover:border-slate-300 text-slate-600'}`}
                    >
                      Telegram
                    </button>
                    <button
                      onClick={() => setContactInfo({ ...contactInfo, preferredMethod: 'email' })}
                      className={`px-4 py-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${contactInfo.preferredMethod === 'email' ? 'border-slate-800 bg-slate-100 text-slate-900 font-bold shadow-sm' : 'border-slate-200 hover:border-slate-300 text-slate-600'}`}
                    >
                      Email Only
                    </button>
                    <button
                      onClick={() => setContactInfo({ ...contactInfo, preferredMethod: 'phone' })}
                      className={`px-4 py-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${contactInfo.preferredMethod === 'phone' ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-bold shadow-sm' : 'border-slate-200 hover:border-slate-300 text-slate-600'}`}
                    >
                      Phone Call
                    </button>
                  </div>
                </div>

                {/* Dynamic Contact Inputs */}
                <div className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-100">
                  {contactInfo.preferredMethod === 'whatsapp' && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp Number</label>
                      <input type="tel" placeholder="+1 (555) 000-0000" value={contactInfo.whatsapp} onChange={(e) => setContactInfo({ ...contactInfo, whatsapp: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-praana-primary focus:border-praana-primary text-slate-900" />
                    </div>
                  )}
                  {contactInfo.preferredMethod === 'telegram' && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Telegram ID / Number</label>
                      <input type="text" placeholder="@username" value={contactInfo.telegram} onChange={(e) => setContactInfo({ ...contactInfo, telegram: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-praana-primary focus:border-praana-primary text-slate-900" />
                    </div>
                  )}
                  {(contactInfo.preferredMethod === 'email' || contactInfo.preferredMethod === 'phone') && (
                    <p className="text-sm text-slate-500 italic">We will use the {contactInfo.preferredMethod} provided in the Shipping Address section.</p>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button onClick={() => setStep('address')} className="flex-1 border border-slate-300 text-slate-700 py-3 rounded-full font-bold hover:bg-slate-50 transition-colors">Back</button>
                  <button onClick={handlePlaceOrder} className="flex-1 bg-slate-900 text-white py-3 rounded-full font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                    Submit Request <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-6">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Order Summary</h3>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between"><span>Subtotal</span><span>${getTotalPrice().toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Tax</span><span>${getTax().toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>${getShipping().toFixed(2)}</span></div>
            <div className="border-t border-slate-200 pt-3 mt-3">
              <div className="flex justify-between font-bold text-lg"><span>Total</span><span>${getTotal().toFixed(2)}</span></div>
            </div>
          </div>
          {step === 'cart' && (
            <button onClick={() => setStep('address')} className="w-full bg-slate-900 text-white py-3 rounded-full font-bold hover:bg-slate-800 transition-colors">Continue to Shipping</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;