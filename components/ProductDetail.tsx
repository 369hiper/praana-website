import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { Check, Palette, Package, Star, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'benefits'>('description');

  const product = PRODUCTS.find(p => p.id === id) as Product;

  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0].id);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Product not found</h2>
        <a href="/#products" className="mt-4 inline-flex items-center text-praana-primary hover:underline">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to products
        </a>
      </div>
    );
  }

  const selectedVariantData = product.variants?.find(v => v.id === selectedVariant) || product.variants?.[0];
  const priceValue = selectedVariantData ? selectedVariantData.price : product.price;
  const currency = product.currency || 'USD';
  const displayPrice = formatPrice(priceValue, currency);
  const displaySpecifications = selectedVariantData?.specifications || product.specifications;

  const incrementQuantity = () => {
    if ((selectedVariantData?.stockQuantity || product.stockQuantity) && quantity < (selectedVariantData?.stockQuantity || product.stockQuantity!)) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const { dispatch } = useCart();

  const addToCart = () => {
    if (product) {
      const variantToAdd = product.variants?.find(v => v.id === selectedVariant);
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          product,
          variant: variantToAdd,
          quantity
        }
      });
      alert(`Added ${quantity} ${product.name}${selectedVariantData ? ` (${selectedVariantData.name})` : ''} to cart!`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <a href="/#products" className="mb-8 inline-flex items-center text-praana-primary hover:underline">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to products
      </a>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Product Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-slate-100">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails could go here */}
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <span className="inline-block px-3 py-1 bg-praana-primary/10 text-praana-primary rounded-full text-sm font-medium mb-2">
              {product.category}
            </span>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">{product.name}</h1>
            {/* <div className="text-4xl font-bold text-praana-primary mb-6">${displayPrice}</div> */}
          </div>

          {/* Variant Selection */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-700">
                <Palette className="w-5 h-5" />
                <span className="font-medium">Choose Color:</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.variants.map(variant => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border ${selectedVariant === variant.id
                        ? 'border-praana-primary bg-praana-primary/10'
                        : 'border-slate-300 hover:border-praana-primary'
                      }`}
                  >
                    <div
                      className="w-5 h-5 rounded-full border border-slate-300"
                      style={{ backgroundColor: variant.color }}
                    ></div>
                    <span>{variant.name.split(' ').slice(-1)[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-slate-300 rounded-full">
              <button
                onClick={decrementQuantity}
                className="px-4 py-2 text-xl hover:bg-slate-100 rounded-l-full"
              >
                -
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="px-4 py-2 text-xl hover:bg-slate-100 rounded-r-full"
              >
                +
              </button>
            </div>

            <div className="flex items-center text-sm text-slate-500">
              <Package className="w-4 h-4 mr-1" />
              <span>
                {selectedVariantData
                  ? `${selectedVariantData.stockQuantity} in stock`
                  : `${product.stockQuantity} in stock`}
              </span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={addToCart}
            className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
            {/* - {formatPrice(priceValue * quantity, currency)} */}
          </button>

          {/* Tabs */}
          <div className="border-b border-slate-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'description'
                    ? 'border-praana-primary text-praana-primary'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'specs'
                    ? 'border-praana-primary text-praana-primary'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('benefits')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'benefits'
                    ? 'border-praana-primary text-praana-primary'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
              >
                PEMF Benefits
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="py-4">
            {activeTab === 'description' && (
              <div>
                <p className="text-slate-600 leading-relaxed mb-6">{product.description}</p>

                <h3 className="text-xl font-bold text-slate-900 mb-4">Key Benefits</h3>
                <div className="space-y-3">
                  {product.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-slate-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Technical Specifications</h3>
                {displaySpecifications ? (
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(displaySpecifications).map(([key, value]) => (
                      <div key={key} className="border-b border-slate-200 pb-3">
                        <div className="text-sm text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                        <div className="font-medium">{value}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-600">Specifications not available for this product.</p>
                )}
              </div>
            )}

            {activeTab === 'benefits' && (
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">PEMF Therapy Benefits</h3>
                {product.pemfBenefits && product.pemfBenefits.length > 0 ? (
                  <div className="space-y-6">
                    {product.pemfBenefits.map((benefit, idx) => (
                      <div key={idx} className="p-6 bg-slate-50 rounded-xl">
                        <div className="flex items-start">
                          <div className="mr-4 mt-1">
                            <Star className="w-6 h-6 text-yellow-400 fill-current" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h4>
                            <p className="text-slate-600">{benefit.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-600">PEMF benefits information not available for this product.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;