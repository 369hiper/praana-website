import React, { useEffect, useMemo, useState } from 'react';
import { PRODUCTS } from '../constants';
import { Check, ArrowRight, Palette, Package, ShoppingCart } from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

// Mini Vortex crystal images
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
import miniVortex7Chakras from '../assets/product-images/mini-vortex/mini-vortex-7chakras.png';

// Core Vortex crystal images
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import coreVortexTQS1 from '../assets/product-images/core-vortex/Praana-Core-15cm.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import coreVortexTQS2 from '../assets/product-images/core-vortex/Praana-core2.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import coreVortexTQS3 from '../assets/product-images/core-vortex/Praana-core3.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import coreVortexAmethystLapis from '../assets/product-images/core-vortex/vortex-core-amethyst-lapzi-lazuli.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import coreVortexGreenAventurine from '../assets/product-images/core-vortex/vortex-core-c.png';

const MINI_CRYSTALS = [
  { id: 'mv-amethyst', name: 'Amethyst', image: miniVortexAmethyst },
  { id: 'mv-quartz', name: 'Quartz', image: miniVortexQuartz },
  { id: 'mv-ocean-blue', name: 'Ocean Blue', image: miniVortexOceanBlue },
  { id: 'mv-4-crystal-colors', name: '4 Crystal Colors', image: miniVortex4CrystalColors },
  { id: 'mv-7-chakras', name: '7 Chakras', image: miniVortex7Chakras },
] as const;

const CORE_CRYSTALS = [
  {
    id: 'cv-tiger-quartz-selenite',
    name: 'Tiger Chips + Quartz + Selenite',
    images: [coreVortexTQS1, coreVortexTQS2, coreVortexTQS3],
  },
  {
    id: 'cv-amethyst-lapis',
    name: 'Amethyst + Lapis Lazuli',
    images: [coreVortexAmethystLapis],
  },
  {
    id: 'cv-green-aventurine',
    name: 'Green Aventurine',
    images: [coreVortexGreenAventurine],
  },
] as const;

const ProductList: React.FC = () => {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [miniCrystalIndex, setMiniCrystalIndex] = useState(0);
  const [coreCrystalIndex, setCoreCrystalIndex] = useState(0);
  const [coreAngleIndex, setCoreAngleIndex] = useState(0);

  const { dispatch } = useCart();

  const handleVariantChange = (productId: string, variantId: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [productId]: variantId
    }));
  };

  // Default selection for Mini Vortex + slideshow loop every 5s
  useEffect(() => {
    if (!selectedVariants['coil-5cm']) {
      handleVariantChange('coil-5cm', MINI_CRYSTALS[0].id);
    }
    if (!selectedVariants['coil-15cm']) {
      handleVariantChange('coil-15cm', CORE_CRYSTALS[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setMiniCrystalIndex((prev) => (prev + 1) % MINI_CRYSTALS.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  // Sync slideshow → selected variant for Mini Vortex
  useEffect(() => {
    const next = MINI_CRYSTALS[miniCrystalIndex];
    if (next && selectedVariants['coil-5cm'] !== next.id) {
      handleVariantChange('coil-5cm', next.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [miniCrystalIndex]);

  // Core Vortex slideshow: rotate angles, then rotate crystal
  useEffect(() => {
    const timer = window.setInterval(() => {
      setCoreAngleIndex((prevAngle) => {
        const active = CORE_CRYSTALS[coreCrystalIndex];
        const nextAngle = prevAngle + 1;
        if (active && nextAngle < active.images.length) return nextAngle;
        // move to next crystal
        setCoreCrystalIndex((prevCrystal) => (prevCrystal + 1) % CORE_CRYSTALS.length);
        return 0;
      });
    }, 5000);
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coreCrystalIndex]);

  // Sync core crystal selection → selected variant
  useEffect(() => {
    const next = CORE_CRYSTALS[coreCrystalIndex];
    if (next && selectedVariants['coil-15cm'] !== next.id) {
      handleVariantChange('coil-15cm', next.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coreCrystalIndex]);

  // If user selects a core variant externally, align indices
  useEffect(() => {
    const selected = selectedVariants['coil-15cm'];
    if (!selected) return;
    const idx = CORE_CRYSTALS.findIndex((c) => c.id === selected);
    if (idx >= 0 && idx !== coreCrystalIndex) {
      setCoreCrystalIndex(idx);
      setCoreAngleIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVariants['coil-15cm']]);

  const miniImageByVariant = useMemo(() => {
    const map: Record<string, string> = {};
    MINI_CRYSTALS.forEach((c) => (map[c.id] = c.image));
    return map;
  }, []);

  const coreImageByVariant = useMemo(() => {
    const map: Record<string, string[]> = {};
    CORE_CRYSTALS.forEach((c) => (map[c.id] = [...c.images]));
    return map;
  }, []);

  const getDisplayImage = (product: Product, selectedVariantId?: string) => {
    if (product.id === 'coil-5cm' && selectedVariantId && miniImageByVariant[selectedVariantId]) {
      return miniImageByVariant[selectedVariantId];
    }
    if (product.id === 'coil-15cm' && selectedVariantId && coreImageByVariant[selectedVariantId]) {
      const imgs = coreImageByVariant[selectedVariantId];
      const safeIndex = Math.min(coreAngleIndex, Math.max(0, imgs.length - 1));
      return imgs[safeIndex] || imgs[0];
    }
    return product.imageUrl;
  };

  const handleAddToCart = (product: Product) => {
    const variantId = selectedVariants[product.id];
    const variant = product.variants?.find(v => v.id === variantId) || product.variants?.[0];

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        product,
        variant: variant,
        quantity: 1
      }
    });

    alert(`Added ${product.name}${variant ? ` (${variant.name})` : ''} to cart!`);
  };

  return (
    <section id="products" className="py-24 bg-white text-slate-900 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-praana-primary font-bold tracking-wider uppercase text-sm">Our Products</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mt-2 mb-6">
            Crafted for unmatched mobility
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            A smarter medical-grade technology personalized for your healthcare experience.
          </p>
        </div>

        <div className="space-y-24">
          {PRODUCTS.map((product, index) => {
            const selectedVariantId = selectedVariants[product.id];
            const selectedVariant = product.variants?.find(v => v.id === selectedVariantId) || product.variants?.[0];
            const priceValue = selectedVariant ? selectedVariant.price : product.price;
            const currency = product.currency || 'USD';
            const displayPrice = formatPrice(priceValue, currency);
            const displayImage = getDisplayImage(product, selectedVariantId);
            const useContainFit = product.id === 'coil-15cm';

            return (
              <div key={product.id} className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1 w-full relative group">
                  <div className="absolute inset-0 bg-slate-100 rounded-[3rem] transform rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
                  {/* Image frame: curved edges, image fully visible, background matches image edges */}
                  <div
                    className="relative z-10 w-full rounded-[3rem] shadow-xl overflow-hidden bg-slate-100"
                  >
                    <img
                      src={displayImage}
                      alt={product.name}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="absolute bottom-8 right-8 z-20 bg-white px-6 py-3 rounded-xl shadow-lg font-bold text-xl text-slate-900">
                    {product.diameter}
                  </div>
                </div>

                <div className="flex-1 space-y-6">
                  <h3 className="text-3xl font-bold text-slate-900">{product.name}</h3>
                  <div className="text-3xl font-bold text-praana-primary">{displayPrice}</div>

                  {product.variants && product.variants.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-slate-700">
                        <Palette className="w-4 h-4" />
                        <span className="font-medium">
                          {product.id === 'coil-5cm' || product.id === 'coil-15cm' ? 'Choose Crystals:' : 'Choose Color:'}
                        </span>
                      </div>
                      {product.id === 'coil-5cm' ? (
                        <>
                          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                            <div className="flex flex-wrap gap-2">
                              {MINI_CRYSTALS.map((c, idx) => (
                                <button
                                  key={c.id}
                                  onClick={() => {
                                    setMiniCrystalIndex(idx);
                                    handleVariantChange(product.id, c.id);
                                  }}
                                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border text-xs sm:text-sm font-medium ${selectedVariantId === c.id
                                      ? 'border-praana-primary bg-praana-primary/10'
                                      : 'border-slate-300 hover:border-praana-primary'
                                    }`}
                                >
                                  <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-300">
                                    <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                                  </div>
                                  <span className="text-slate-900">{c.name}</span>
                                </button>
                              ))}
                            </div>
                            <p className="mt-3 text-xs sm:text-sm text-slate-600">
                              Auto slideshow is enabled (switches every 5 seconds). Click any crystal to select it.
                            </p>
                          </div>
                        </>
                      ) : product.id === 'coil-15cm' ? (
                        <>
                          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                            <div className="flex flex-wrap gap-2">
                              {CORE_CRYSTALS.map((c, idx) => (
                                <button
                                  key={c.id}
                                  onClick={() => {
                                    setCoreCrystalIndex(idx);
                                    setCoreAngleIndex(0);
                                    handleVariantChange(product.id, c.id);
                                  }}
                                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border text-xs sm:text-sm font-medium ${selectedVariantId === c.id
                                      ? 'border-praana-primary bg-praana-primary/10'
                                      : 'border-slate-300 hover:border-praana-primary'
                                    }`}
                                >
                                  <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-300">
                                    <img src={c.images[0]} alt={c.name} className="w-full h-full object-cover" />
                                  </div>
                                  <span className="text-slate-900">{c.name}</span>
                                </button>
                              ))}
                            </div>
                            <p className="mt-3 text-xs sm:text-sm text-slate-600">
                              Auto slideshow is enabled (switches every 5 seconds). It cycles through angles (if available) and then the next crystal.
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {product.variants.map((variant) => (
                            <button
                              key={variant.id}
                              onClick={() => handleVariantChange(product.id, variant.id)}
                              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium text-slate-900 ${selectedVariantId === variant.id
                                  ? 'border-praana-primary bg-praana-primary/10'
                                  : 'border-slate-300 hover:border-praana-primary'
                                }`}
                            >
                              <div
                                className="w-4 h-4 rounded-full border border-slate-300"
                                style={{ backgroundColor: variant.color }}
                              ></div>
                              <span>{variant.name}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <p className="text-slate-600 text-lg leading-relaxed">
                    {product.description}
                  </p>

                  <div className="space-y-4 pt-4">
                    {product.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center text-slate-700">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        {benefit}
                      </div>
                    ))}
                  </div>

                  <div className="pt-8">
                    <div className="flex gap-3">
                      {product.id === 'coil-5cm' ? (
                        <a href="/mini-vortex" className="flex-1 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                          View Details
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      ) : product.id === 'coil-15cm' ? (
                        <a href="/core-vortex" className="flex-1 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                          View Details
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      ) : product.id === 'coil-25cm' ? (
                        <a href="/pro-vortex" className="flex-1 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                          View Details
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      ) : (
                        <a href={`/product/${product.id}`} className="flex-1 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                          View Details
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-praana-primary text-praana-dark px-6 py-4 rounded-full font-bold hover:bg-teal-400 transition-colors flex items-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                    </div>

                    {selectedVariant && (
                      <div className="mt-4 flex items-center text-sm text-slate-500">
                        <Package className="w-4 h-4 mr-1" />
                        <span>In Stock: {selectedVariant.stockQuantity} units available</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductList;