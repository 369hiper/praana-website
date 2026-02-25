import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, Heart, Zap, Leaf, Shield, Clock, Activity, Moon, Droplets, Wind, Waves } from 'lucide-react';
import { useCart } from '../context/CartContext';

// Crystal images
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import coreTQS1 from '../assets/product-images/core-vortex/Praana-Core-15cm.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import coreTQS2 from '../assets/product-images/core-vortex/Praana-core2.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import coreTQS3 from '../assets/product-images/core-vortex/Praana-core3.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import coreAmethystLapis from '../assets/product-images/core-vortex/vortex-core-amethyst-lapzi-lazuli.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import coreGreenAventurine from '../assets/product-images/core-vortex/vortex-core-c.png';

const CoreVortexPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('cv-tiger-quartz-selenite');

  const { dispatch } = useCart();

  const crystalOptions = useMemo(
    () => [
      { id: 'cv-tiger-quartz-selenite', name: 'Tiger Chips + Quartz + Selenite', images: [coreTQS1, coreTQS2, coreTQS3] },
      { id: 'cv-amethyst-lapis', name: 'Amethyst + Lapis Lazuli', images: [coreAmethystLapis] },
      { id: 'cv-green-aventurine', name: 'Green Aventurine', images: [coreGreenAventurine] },
    ],
    []
  );

  const selectedCrystalIndex = Math.max(0, crystalOptions.findIndex((c) => c.id === selectedVariant));
  const activeCrystal = crystalOptions[selectedCrystalIndex] || crystalOptions[0];
  const activeImages = activeCrystal.images;

  // Variants for the Core Vortex
  const variants = [
    {
      id: 'cv-tiger-quartz-selenite',
      name: 'Tiger Chips + Quartz + Selenite',
      color: '#b45309',
      price: 349,
      specifications: {
        gauss: '1100 Gauss',
        frequency: '7.83Hz, 13Hz, 21Hz',
        batteryLife: '12 hours',
        chargingTime: '3 hours',
        weight: '1.2 kg',
        dimensions: '15cm x 15cm x 15cm'
      },
      sku: 'CV-TQS',
      stockQuantity: 12
    },
    {
      id: 'cv-amethyst-lapis',
      name: 'Amethyst + Lapis Lazuli',
      color: '#7c3aed',
      price: 349,
      specifications: {
        gauss: '1100 Gauss',
        frequency: '7.83Hz, 13Hz, 21Hz',
        batteryLife: '12 hours',
        chargingTime: '3 hours',
        weight: '1.2 kg',
        dimensions: '15cm x 15cm x 15cm'
      },
      sku: 'CV-AL',
      stockQuantity: 12
    },
    {
      id: 'cv-green-aventurine',
      name: 'Green Aventurine',
      color: '#16a34a',
      price: 349,
      specifications: {
        gauss: '1100 Gauss',
        frequency: '7.83Hz, 13Hz, 21Hz',
        batteryLife: '12 hours',
        chargingTime: '3 hours',
        weight: '1.2 kg',
        dimensions: '15cm x 15cm x 15cm'
      },
      sku: 'CV-GA',
      stockQuantity: 12
    },
  ];

  const currentVariant = variants.find(v => v.id === selectedVariant) || variants[0];

  // Slideshow: rotate angles, then rotate crystal option
  useEffect(() => {
    const timer = window.setInterval(() => {
      setSelectedImage((prev) => {
        const next = prev + 1;
        if (next < activeImages.length) return next;
        // move to next crystal
        const nextCrystalIndex = (selectedCrystalIndex + 1) % crystalOptions.length;
        setSelectedVariant(crystalOptions[nextCrystalIndex].id);
        return 0;
      });
    }, 5000);
    return () => window.clearInterval(timer);
  }, [activeImages.length, crystalOptions, selectedCrystalIndex]);

  // Reset angle index when crystal changes
  useEffect(() => {
    setSelectedImage(0);
  }, [selectedVariant]);

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
      id: 'coil-15cm',
      name: 'Core Vortex',
      price: currentVariant.price,
      imageUrl: activeImages[0],
      stockQuantity: 12,
      diameter: '15cm',
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

    alert(`Added ${quantity} Core Vortex (${currentVariant.name}) to cart!`);
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
                src={activeImages[Math.min(selectedImage, activeImages.length - 1)]}
                alt="Core Vortex"
                className="w-full h-auto"
              />
            </div>

            <div className={`grid gap-4 ${activeImages.length >= 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
              {activeImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 ${selectedImage === index ? 'border-praana-primary' : 'border-slate-700'
                    }`}
                >
                  <img
                    src={img}
                    alt={`Core Vortex ${index + 1}`}
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
                Therapeutic
              </span>
              <h1 className="text-4xl font-bold text-slate-100 mb-4">Core Vortex (15cm)</h1>
              {/* <div className="text-4xl font-bold text-praana-primary mb-6">${currentVariant.price}</div> */}
            </div>

            {/* Variant Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-200">Choose Crystals:</h3>
              <div className="flex flex-wrap gap-3">
                {crystalOptions.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedVariant(c.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border ${selectedVariant === c.id
                      ? 'border-praana-primary bg-praana-primary/10'
                      : 'border-slate-600 hover:border-praana-primary'
                      }`}
                  >
                    <div
                      className="w-5 h-5 rounded-full border border-slate-400"
                      style={{ backgroundColor: variants.find(v => v.id === c.id)?.color || '#94a3b8' }}
                    ></div>
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
              <p className="text-sm text-slate-400">
                Auto slideshow is enabled (switches every 5 seconds). It cycles angles (if available) and then the next crystal.
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
                  In Stock: 12 units available
                </div>
              </div>

              <button
                onClick={addToCart}
                className="w-full bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-colors"
              >
                Add to Cart
                {/* - ${(currentVariant.price * quantity).toFixed(2)} */}
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
                <h3 className="text-2xl font-bold text-slate-100 mb-4">Support for Physical Wellness</h3>
                <p className="text-slate-300 mb-6">
                  The Core Vortex is designed for individuals seeking comprehensive support for their physical wellness routines.
                  Its balanced field projection makes it ideal for broader applications during physiotherapy exercises.
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Shield className="text-praana-primary mt-1 mr-3 flex-shrink-0" />
                    <span className="text-slate-300">Designed for personal wellness applications</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="text-praana-primary mt-1 mr-3 flex-shrink-0" />
                    <span className="text-slate-300">Balanced field projection for comprehensive wellness</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="text-praana-primary mt-1 mr-3 flex-shrink-0" />
                    <span className="text-slate-300">Multiple frequency options for varied wellness needs</span>
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
                  The Core Vortex operates at 1100 Gauss with multiple frequencies (7.83Hz, 13Hz, 21Hz),
                  designed for therapeutic wellness applications.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Gut Health Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-slate-100 mb-12 text-center">Gut Health Support</h2>

          <div className="bg-gradient-to-r from-slate-800/50 to-praana-primary/10 rounded-2xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-100 mb-4">Optimize Digestive Wellness</h3>
                <p className="text-slate-300 mb-6">
                  The Core Vortex is specially designed to support digestive wellness and gut health.
                  Its balanced field projection targets the abdominal region for optimal wellness support.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <Zap className="text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-100">Targeted Wellness</h4>
                      <p className="text-slate-300 text-sm">Specifically designed for digestive wellness</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-100">Extended Battery Life</h4>
                      <p className="text-slate-300 text-sm">12-hour battery life for extended wellness sessions</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Waves className="text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-100">Multiple Frequencies</h4>
                      <p className="text-slate-300 text-sm">7.83Hz, 13Hz, and 21Hz for varied wellness approaches</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-4">🌿</div>
                  <h4 className="text-xl font-bold text-slate-100">Digestive Wellness</h4>
                  <p className="text-slate-300 mt-2">Support for healthy digestive function</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Meditation Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-slate-100 mb-12 text-center">Enhanced Meditation Support</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-slate-800/50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-slate-100 mb-4">Deepen Your Practice</h3>
              <p className="text-slate-300 mb-6">
                The Core Vortex supports deeper meditative states and mental clarity.
                Its balanced frequencies promote relaxation and focus during meditation sessions.
              </p>

              <ul className="space-y-3">
                <li className="flex items-start">
                  <Star className="text-praana-primary mt-1 mr-3 flex-shrink-0" />
                  <span className="text-slate-300">Promotes relaxation and mental clarity</span>
                </li>
                <li className="flex items-start">
                  <Star className="text-praana-primary mt-1 mr-3 flex-shrink-0" />
                  <span className="text-slate-300">Supports parasympathetic nervous system</span>
                </li>
                <li className="flex items-start">
                  <Star className="text-praana-primary mt-1 mr-3 flex-shrink-0" />
                  <span className="text-slate-300">Enhances focus and mindfulness</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 p-8 rounded-2xl border border-slate-700">
              <h4 className="text-xl font-bold text-slate-100 mb-4">Meditation Wellness</h4>
              <p className="text-slate-300 mb-4">
                Using the Core Vortex during meditation may help activate deeper states of awareness
                and promote a sense of inner peace.
              </p>
              <p className="text-slate-300">
                The device's frequencies are calibrated to support the brain's natural relaxation responses,
                making it easier to achieve meditative states.
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
                The Core Vortex's 1100 Gauss field with multiple frequencies is designed to provide
                comprehensive wellness support.
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

export default CoreVortexPage;