import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, Heart, Zap, Leaf, Shield, Clock, Activity, Moon, Droplets, Wind, Waves } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProVortexPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('pv-black');

  const { dispatch } = useCart();

  // Images for the Pro Vortex
  const productImages = [
    '../assets/product-images/pro-vortex/image1.jpg',
    '../assets/product-images/pro-vortex/image2.jpg',
    '../assets/product-images/pro-vortex/image3.jpg',
    '../assets/product-images/pro-vortex/image4.jpg'
  ];

  // Variants for the Pro Vortex
  const variants = [
    {
      id: 'pv-black',
      name: 'Black',
      color: '#212529',
      price: 599,
      specifications: {
        gauss: '1100 Gauss',
        frequency: '7.83Hz, 13Hz, 21Hz, 34Hz, 55Hz',
        batteryLife: '24 hours',
        chargingTime: '4 hours',
        weight: '2.5 kg',
        dimensions: '25cm x 25cm x 20cm'
      }
    },
    {
      id: 'pv-silver',
      name: 'Silver',
      color: '#adb5bd',
      price: 629,
      specifications: {
        gauss: '1100 Gauss',
        frequency: '7.83Hz, 13Hz, 21Hz, 34Hz, 55Hz',
        batteryLife: '24 hours',
        chargingTime: '4 hours',
        weight: '2.5 kg',
        dimensions: '25cm x 25cm x 20cm'
      }
    }
  ];

  const currentVariant = variants.find(v => v.id === selectedVariant) || variants[0];

  const pemfBenefits = [
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Pain Relief",
      description: "PEMF therapy may help reduce discomfort associated with minor aches and pains through gentle stimulation."
    },
    {
      icon: <Wind className="w-6 h-6" />,
      title: "Inflammation Support",
      description: "PEMF may assist in supporting the body's natural inflammatory response mechanisms."
    },
    {
      icon: <Moon className="w-6 h-6" />,
      title: "Sleep Enhancement",
      description: "PEMF may promote relaxation and support healthy sleep patterns."
    },
    {
      icon: <Droplets className="w-6 h-6" />,
      title: "Muscle Recovery",
      description: "PEMF may support muscle recovery after physical activity."
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Wellness Support",
      description: "PEMF may contribute to overall wellness and vitality."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Cellular Wellness",
      description: "PEMF may support cellular wellness through gentle electromagnetic stimulation."
    }
  ];

  const addToCart = () => {
    const product = {
      id: 'coil-25cm',
      name: 'Pro Vortex',
      price: currentVariant.price,
      imageUrl: productImages[0],
      stockQuantity: 5
    };

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        product,
        variant: currentVariant,
        quantity
      }
    });

    alert(`Added ${quantity} Pro Vortex (${currentVariant.name}) to cart!`);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="min-h-screen bg-praana-dark text-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/#products" className="mb-8 inline-flex items-center text-praana-primary hover:underline">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Images Section */}
          <div className="space-y-6">
            <div className="rounded-3xl overflow-hidden bg-slate-800 flex items-center justify-center">
              <img
                src={productImages[selectedImage]}
                alt="Pro Vortex"
                className="w-full h-auto"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 ${selectedImage === index ? 'border-praana-primary' : 'border-slate-700'
                    }`}
                >
                  <img
                    src={img}
                    alt={`Pro Vortex ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-8">
            <div>
              <span className="inline-block px-3 py-1 bg-praana-primary/10 text-praana-primary rounded-full text-sm font-medium mb-2">
                Professional
              </span>
              <h1 className="text-4xl font-bold text-slate-100 mb-4">Pro Vortex (25cm)</h1>
              <div className="text-4xl font-bold text-praana-primary mb-6">${currentVariant.price}</div>
            </div>

            {/* Variant Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-200">Choose Color:</h3>
              <div className="flex flex-wrap gap-3">
                {variants.map(variant => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border ${selectedVariant === variant.id
                      ? 'border-praana-primary bg-praana-primary/10'
                      : 'border-slate-600 hover:border-praana-primary'
                      }`}
                  >
                    <div
                      className="w-5 h-5 rounded-full border border-slate-400"
                      style={{ backgroundColor: variant.color }}
                    ></div>
                    <span>{variant.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-slate-800/50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-200 mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(currentVariant.specifications).map(([key, value]) => (
                  <div key={key} className="border-b border-slate-700 pb-2">
                    <div className="text-sm text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                    <div className="font-medium">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-slate-600 rounded-full">
                  <button
                    onClick={decrementQuantity}
                    className="px-4 py-2 text-xl hover:bg-slate-700 rounded-l-full"
                  >
                    -
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="px-4 py-2 text-xl hover:bg-slate-700 rounded-r-full"
                  >
                    +
                  </button>
                </div>

                <div className="text-sm text-slate-400">
                  In Stock: 5 units available
                </div>
              </div>

              <button
                onClick={addToCart}
                className="w-full bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-colors"
              >
                Add to Cart - ${(currentVariant.price * quantity).toFixed(2)}
              </button>
            </div>
          </div>
        </div>

        {/* PEMF Benefits Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-slate-100 mb-12 text-center">PEMF Wellness Benefits</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pemfBenefits.map((benefit, index) => (
              <div key={index} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <div className="text-praana-primary mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">{benefit.title}</h3>
                <p className="text-slate-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Physiotherapy Benefits Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-slate-100 mb-12 text-center">Physiotherapy Applications</h2>

          <div className="bg-slate-800/50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-100 mb-4">Comprehensive Wellness Support</h3>
                <p className="text-slate-300 mb-6">
                  The Pro Vortex is designed for individuals seeking comprehensive support for their physical wellness routines.
                  Its full-body immersion capabilities make it ideal for extensive physiotherapy applications.
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Shield className="text-praana-primary mt-1 mr-3 flex-shrink-0" />
                    <span className="text-slate-300">Designed for personal wellness applications</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="text-praana-primary mt-1 mr-3 flex-shrink-0" />
                    <span className="text-slate-300">Full-body immersion for maximum wellness</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="text-praana-primary mt-1 mr-3 flex-shrink-0" />
                    <span className="text-slate-300">Five frequency options for varied wellness needs</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-xl">
                <h4 className="text-lg font-bold text-slate-100 mb-4">How PEMF Works</h4>
                <p className="text-slate-300 mb-4">
                  PEMF (Pulsed Electromagnetic Field) technology delivers gentle electromagnetic pulses that may support
                  cellular wellness and overall well-being.
                </p>
                <p className="text-slate-300">
                  The Pro Vortex operates at 1100 Gauss with five frequencies (7.83Hz, 13Hz, 21Hz, 34Hz, 55Hz),
                  designed for professional wellness applications.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Systemic Healing Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-slate-100 mb-12 text-center">Systemic Wellness Support</h2>

          <div className="bg-gradient-to-r from-slate-800/50 to-praana-primary/10 rounded-2xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-100 mb-4">Address Wellness at the Cellular Level</h3>
                <p className="text-slate-300 mb-6">
                  The Pro Vortex is designed to provide systemic wellness support throughout the entire body.
                  Its 25cm diameter allows for full-body applications that may address wellness concerns at the cellular level.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <Zap className="text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-100">Full-Body Immersion</h4>
                      <p className="text-slate-300 text-sm">25cm diameter for comprehensive wellness coverage</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-100">Extended Battery Life</h4>
                      <p className="text-slate-300 text-sm">24-hour battery life for extended wellness sessions</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Waves className="text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-100">Five Frequencies</h4>
                      <p className="text-slate-300 text-sm">7.83Hz, 13Hz, 21Hz, 34Hz, and 55Hz for varied wellness approaches</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-4">🌐</div>
                  <h4 className="text-xl font-bold text-slate-100">Systemic Wellness</h4>
                  <p className="text-slate-300 mt-2">Support for wellness throughout the entire body</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sleep Enhancement Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-slate-100 mb-12 text-center">Sleep Quality Improvement</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-slate-800/50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-slate-100 mb-4">Regulate Circadian Rhythms</h3>
              <p className="text-slate-300 mb-6">
                The Pro Vortex supports improved sleep quality by helping regulate circadian rhythms and promoting restorative sleep.
                Its frequencies are designed to support the body's natural sleep processes.
              </p>

              <ul className="space-y-3">
                <li className="flex items-start">
                  <Star className="text-praana-primary mt-1 mr-3 flex-shrink-0" />
                  <span className="text-slate-300">Promotes deeper, more restorative sleep</span>
                </li>
                <li className="flex items-start">
                  <Star className="text-praana-primary mt-1 mr-3 flex-shrink-0" />
                  <span className="text-slate-300">Supports natural circadian rhythm regulation</span>
                </li>
                <li className="flex items-start">
                  <Star className="text-praana-primary mt-1 mr-3 flex-shrink-0" />
                  <span className="text-slate-300">May reduce nighttime wakefulness</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 p-8 rounded-2xl border border-slate-700">
              <h4 className="text-xl font-bold text-slate-100 mb-4">Restorative Sleep</h4>
              <p className="text-slate-300 mb-4">
                Using the Pro Vortex before bedtime may help prepare your body for restorative sleep
                by promoting relaxation and reducing stress.
              </p>
              <p className="text-slate-300">
                The device's frequencies are calibrated to support the body's natural sleep preparation processes,
                making it easier to achieve quality rest.
              </p>
            </div>
          </div>
        </div>

        {/* Muscle Recovery Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-slate-100 mb-12 text-center">Accelerated Muscle Recovery</h2>

          <div className="bg-gradient-to-r from-slate-800/50 to-praana-primary/10 rounded-2xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-100 mb-4">Speed Up Recovery After Exercise</h3>
                <p className="text-slate-300 mb-6">
                  The Pro Vortex accelerates muscle recovery after exercise by supporting the body's natural recovery processes.
                  Its full-body coverage ensures comprehensive support for all muscle groups.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <Droplets className="text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-100">Reduced Inflammation</h4>
                      <p className="text-slate-300 text-sm">May support the body's natural inflammatory response</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Activity className="text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-100">Enhanced Circulation</h4>
                      <p className="text-slate-300 text-sm">May support healthy circulation for faster recovery</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Heart className="text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-100">Cellular Wellness</h4>
                      <p className="text-slate-300 text-sm">Supports cellular wellness for optimal recovery</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-4">💪</div>
                  <h4 className="text-xl font-bold text-slate-100">Muscle Recovery</h4>
                  <p className="text-slate-300 mt-2">Support for faster recovery after physical activity</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Anti-Aging Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-slate-100 mb-12 text-center">Anti-Aging Wellness Support</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-slate-800/50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-slate-100 mb-4">Support Cellular Wellness</h3>
              <p className="text-slate-300 mb-6">
                The Pro Vortex supports cellular wellness through gentle electromagnetic stimulation,
                which may contribute to maintaining youthful wellness and vitality.
              </p>

              <ul className="space-y-3">
                <li className="flex items-start">
                  <Star className="text-praana-primary mt-1 mr-3 flex-shrink-0" />
                  <span className="text-slate-300">Supports cellular wellness mechanisms</span>
                </li>
                <li className="flex items-start">
                  <Star className="text-praana-primary mt-1 mr-3 flex-shrink-0" />
                  <span className="text-slate-300">May contribute to overall wellness and vitality</span>
                </li>
                <li className="flex items-start">
                  <Star className="text-praana-primary mt-1 mr-3 flex-shrink-0" />
                  <span className="text-slate-300">Gentle electromagnetic stimulation for wellness</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 p-8 rounded-2xl border border-slate-700">
              <h4 className="text-xl font-bold text-slate-100 mb-4">Wellness Maintenance</h4>
              <p className="text-slate-300 mb-4">
                Regular use of the Pro Vortex may support wellness maintenance and contribute to a sense of vitality.
                The device's comprehensive approach to wellness support may help maintain youthful wellness.
              </p>
              <p className="text-slate-300">
                The combination of multiple frequencies and full-body coverage provides comprehensive wellness support
                that may contribute to maintaining overall wellness over time.
              </p>
            </div>
          </div>
        </div>

        {/* DNA Wellness Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-slate-100 mb-12 text-center">Cellular Wellness Support</h2>

          <div className="bg-slate-800/50 rounded-2xl p-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h3 className="text-2xl font-bold text-slate-100 mb-4">Gentle Electromagnetic Stimulation</h3>
              <p className="text-slate-300">
                PEMF technology delivers gentle electromagnetic pulses that may support cellular wellness.
                The Pro Vortex's 1100 Gauss field with five frequencies is designed to provide
                comprehensive wellness support at the cellular level.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-slate-900/30 rounded-xl">
                <div className="text-praana-primary text-3xl mb-4">🧬</div>
                <h4 className="font-bold text-slate-100 mb-2">Cellular Wellness</h4>
                <p className="text-slate-300 text-sm">Support for cellular wellness mechanisms</p>
              </div>

              <div className="text-center p-6 bg-slate-900/30 rounded-xl">
                <div className="text-praana-primary text-3xl mb-4">⚡</div>
                <h4 className="font-bold text-slate-100 mb-2">Energy Support</h4>
                <p className="text-slate-300 text-sm">May support natural energy levels</p>
              </div>

              <div className="text-center p-6 bg-slate-900/30 rounded-xl">
                <div className="text-praana-primary text-3xl mb-4">🔄</div>
                <h4 className="font-bold text-slate-100 mb-2">Recovery Support</h4>
                <p className="text-slate-300 text-sm">Aid in recovery after physical activity</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProVortexPage;