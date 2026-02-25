import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, Heart, Zap, Leaf, Shield, Clock, Activity, Moon, Droplets, Wind, Waves, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

// Crystal images
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import miniVortexAmethyst from '../assets/product-images/mini-vortex/minivortex-amethyst.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import miniVortexQuartz from '../assets/product-images/mini-vortex/mini-vortex-quartz.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import miniVortexOceanBlue from '../assets/product-images/mini-vortex/mini-vortex-ocean-blue.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import miniVortex4CrystalColors from '../assets/product-images/mini-vortex/minivortex-4crystal-colors.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import miniVortex7PrismColors from '../assets/product-images/mini-vortex/mini-vortex-7chakras.png';

const MiniVortexPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('mv-amethyst');

  const { dispatch } = useCart();

  // Crystal options (click to change main image)
  const crystalOptions = useMemo(
    () => [
      { id: 'mv-amethyst', name: 'Amethyst', image: miniVortexAmethyst },
      { id: 'mv-quartz', name: 'Quartz', image: miniVortexQuartz },
      { id: 'mv-ocean-blue', name: 'Ocean Blue', image: miniVortexOceanBlue },
      { id: 'mv-4-crystal-colors', name: '4 Crystal Colors', image: miniVortex4CrystalColors },
      // { id: 'mv-7-prism-colors', name: '7 Prism Colors', image: miniVortex7PrismColors },
    ],
    []
  );

  // Auto slideshow loop (every 5 seconds)
  useEffect(() => {
    const timer = window.setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % crystalOptions.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [crystalOptions.length]);

  // Keep selectedVariant in sync with active image (manual click or slideshow)
  useEffect(() => {
    const next = crystalOptions[selectedImage];
    if (next && next.id !== selectedVariant) setSelectedVariant(next.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImage, crystalOptions]);

  // Variants for the Mini Vortex
  const variants = [
    {
      id: 'mv-amethyst',
      name: 'Amethyst',
      color: '#7c3aed',
      price: 199,
      specifications: {
        gauss: '1100 Gauss',
        frequency: '7.83Hz',
        batteryLife: '8 hours',
        chargingTime: '2 hours',
        weight: '0.5 kg',
        dimensions: '5cm x 5cm x 10cm'
      },
      sku: 'MV-AMETHYST',
      stockQuantity: 20
    },
    {
      id: 'mv-quartz',
      name: 'Quartz',
      color: '#e5e7eb',
      price: 199,
      specifications: {
        gauss: '1100 Gauss',
        frequency: '7.83Hz',
        batteryLife: '8 hours',
        chargingTime: '2 hours',
        weight: '0.5 kg',
        dimensions: '5cm x 5cm x 10cm'
      },
      sku: 'MV-QUARTZ',
      stockQuantity: 20
    },
    {
      id: 'mv-ocean-blue',
      name: 'Ocean Blue',
      color: '#06b6d4',
      price: 199,
      specifications: {
        gauss: '1100 Gauss',
        frequency: '7.83Hz',
        batteryLife: '8 hours',
        chargingTime: '2 hours',
        weight: '0.5 kg',
        dimensions: '5cm x 5cm x 10cm'
      },
      sku: 'MV-OCEAN-BLUE',
      stockQuantity: 20
    },
    {
      id: 'mv-4-crystal-colors',
      name: '4 Crystal Colors',
      color: '#22c55e',
      price: 199,
      specifications: {
        gauss: '1100 Gauss',
        frequency: '7.83Hz',
        batteryLife: '8 hours',
        chargingTime: '2 hours',
        weight: '0.5 kg',
        dimensions: '5cm x 5cm x 10cm'
      },
      sku: 'MV-4-CRYSTAL',
      stockQuantity: 20
    },
    // {
    //   id: 'mv-7-prism-colors',
    //   name: '7 Prism Colors',
    //   color: '#ec4899',
    //   price: 199,
    //   specifications: {
    //     gauss: '1100 Gauss',
    //     frequency: '7.83Hz',
    //     batteryLife: '8 hours',
    //     chargingTime: '2 hours',
    //     weight: '0.5 kg',
    //     dimensions: '5cm x 5cm x 10cm'
    //   },
    //   sku: 'MV-7-PRISM',
    //   stockQuantity: 20
    // },
  ];

  const currentVariant = variants.find(v => v.id === selectedVariant) || variants[0];
  const activeCrystal = crystalOptions.find((c) => c.id === selectedVariant) || crystalOptions[0];

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
      id: 'coil-5cm',
      name: 'Mini Vortex',
      price: currentVariant.price,
      imageUrl: activeCrystal.image,
      stockQuantity: 20,
      diameter: '5cm',
      description: '',
      benefits: []
    };

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        product,
        variant: currentVariant,
        quantity
      }
    });

    alert(`Added ${quantity} Mini Vortex (${currentVariant.name}) to cart!`);
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
                src={activeCrystal.image}
                alt="Mini Vortex"
                className="w-full h-auto"
              />
            </div>

            <div className="grid grid-cols-5 gap-3">
              {crystalOptions.map((c, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 ${selectedImage === index ? 'border-praana-primary' : 'border-slate-700'
                    }`}
                  title={c.name}
                >
                  <img
                    src={c.image}
                    alt={`Mini Vortex - ${c.name}`}
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
                Portable
              </span>
              <h1 className="text-4xl font-bold text-slate-100 mb-4">Mini Vortex (5cm)</h1>
              {/* <div className="text-4xl font-bold text-praana-primary mb-6">${currentVariant.price}</div> */}
            </div>

            {/* Variant Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-200">Choose Crystals:</h3>
              <div className="flex flex-wrap gap-3">
                {crystalOptions.map((c, idx) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border ${selectedVariant === c.id
                      ? 'border-praana-primary bg-praana-primary/10'
                      : 'border-slate-600 hover:border-praana-primary'
                      }`}
                  >
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-600">
                      <img src={c.image} alt={c.name} className="w-full h-full object-contain" />
                    </div>
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
              <p className="text-sm text-slate-400">
                Auto slideshow is enabled (switches every 5 seconds). Click any crystal to select it.
              </p>
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
                  In Stock: 20 units available
                </div>
              </div>

              <button
                onClick={addToCart}
                className="w-full bg-indigo-600 text-white px-8 py-4 rounded-full font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
                {/* - ${(currentVariant.price * quantity).toFixed(2)} */}
              </button>

              <div className="text-sm text-slate-400 italic">
                Includes portable amplifier for enhanced field projection
              </div>
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
                <h3 className="text-2xl font-bold text-slate-100 mb-4">Support for Physical Wellness</h3>
                <p className="text-slate-300 mb-6">
                  The Mini Vortex is designed for individuals seeking portable support for their physical wellness routines.
                  Its compact design makes it ideal for targeted applications during physiotherapy exercises.
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Shield className="text-praana-primary mt-1 mr-3 flex-shrink-0" />
                    <span className="text-slate-300">Designed for personal wellness applications</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="text-praana-primary mt-1 mr-3 flex-shrink-0" />
                    <span className="text-slate-300">Compact design for targeted wellness support</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="text-praana-primary mt-1 mr-3 flex-shrink-0" />
                    <span className="text-slate-300">Ideal for travel and on-the-go wellness</span>
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
                  The Mini Vortex operates at 1100 Gauss with a 7.83Hz frequency, designed for portable wellness applications.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Portability Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-slate-100 mb-12 text-center">Unmatched Portability</h2>

          <div className="bg-gradient-to-r from-slate-800/50 to-praana-primary/10 rounded-2xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-100 mb-4">Take Wellness Anywhere</h3>
                <p className="text-slate-300 mb-6">
                  The Mini Vortex is the most portable option in our lineup. At just 5cm in diameter and weighing only 0.5kg,
                  it fits easily in your bag, purse, or even pocket.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <Zap className="text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-100">Ultra-Compact Design</h4>
                      <p className="text-slate-300 text-sm">Perfect for travel and daily use</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-100">8-Hour Battery Life</h4>
                      <p className="text-slate-300 text-sm">All-day wellness support without charging</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Waves className="text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-100">Built-in Amplifier</h4>
                      <p className="text-slate-300 text-sm">Includes portable amplifier for enhanced field projection</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-4">✈️</div>
                  <h4 className="text-xl font-bold text-slate-100">Perfect for Travel</h4>
                  <p className="text-slate-300 mt-2">Use anywhere - office, gym, travel, home</p>
                </div>
              </div>
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
                The Mini Vortex's 1100 Gauss field is designed to provide consistent wellness support.
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

export default MiniVortexPage;