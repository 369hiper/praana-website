export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  color?: string;
  specifications?: Record<string, any>;
  stockQuantity: number;
}

export interface PEMFBenefit {
  title: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  diameter: string;
  description: string;
  benefits: string[];
  price: number;
  currency?: string;
  imageUrl: string;
  category?: string;
  inStock?: boolean;
  stockQuantity?: number;
  variants?: ProductVariant[];
  pemfBenefits?: PEMFBenefit[];
  specifications?: Record<string, any>;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum PageRoute {
  HOME = '/',
  BLOG = '/blog',
  BLOG_POST = '/blog/:slug',
  PAYMENT_REFUND_POLICY = '/payment-refund-policy',
  WARRANTY_CLAIMS = '/warranty-claims',
  PRIVACY_POLICY = '/privacy-policy',
  EULA = '/eula',
  SHIPPING_POLICY = '/shipping-policy',
  PRODUCT_POLICY = '/product-policy',
  PRODUCT_DETAIL = '/product/:id',
  MINI_VORTEX = '/mini-vortex',
  CORE_VORTEX = '/core-vortex',
  PRO_VORTEX = '/pro-vortex',
}