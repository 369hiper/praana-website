import { Product } from './types';

// Product images (Vite will fingerprint for production)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import miniVortexImg from './assets/product-images/mini-vortex/mini-vortex.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import coreVortexImg from './assets/product-images/core-vortex/Praana-Core-15cm.png';

export const PRODUCTS: Product[] = [
  {
    id: 'coil-5cm',
    name: 'Mini Vortex',
    diameter: '5cm',
    description: 'Targeted relief for joints and acute pain points. Ultra-portable design.',
    benefits: ['Localized Relief', 'Joint Mobility', 'Travel Friendly'],
    price: 330,
    currency: 'EUR',
    imageUrl: miniVortexImg,
    category: 'Portable',
    inStock: true,
    stockQuantity: 50,
    variants: [
      {
        id: 'mv-amethyst',
        name: 'Mini Vortex Amethyst',
        sku: 'MV-AMETHYST-001',
        price: 330,
        color: '#7c3aed',
        specifications: {
          gauss: '1100 Gauss',
          frequency: '7.83Hz',
          batteryLife: '8 hours',
          chargingTime: '2 hours'
        },
        stockQuantity: 20
      },
      {
        id: 'mv-quartz',
        name: 'Mini Vortex Quartz',
        sku: 'MV-QUARTZ-001',
        price: 330,
        color: '#e5e7eb',
        specifications: {
          gauss: '1100 Gauss',
          frequency: '7.83Hz',
          batteryLife: '8 hours',
          chargingTime: '2 hours'
        },
        stockQuantity: 15
      },
      {
        id: 'mv-ocean-blue',
        name: 'Mini Vortex Ocean Blue',
        sku: 'MV-OCEANBLUE-001',
        price: 330,
        color: '#06b6d4',
        specifications: {
          gauss: '1100 Gauss',
          frequency: '7.83Hz',
          batteryLife: '8 hours',
          chargingTime: '2 hours'
        },
        stockQuantity: 15
      },
      {
        id: 'mv-4-crystal-colors',
        name: 'Mini Vortex 4 Crystal Colors',
        sku: 'MV-4CRYSTAL-001',
        price: 330,
        color: '#22c55e',
        specifications: {
          gauss: '1100 Gauss',
          frequency: '7.83Hz',
          batteryLife: '8 hours',
          chargingTime: '2 hours'
        },
        stockQuantity: 10
      },
      // {
      //   id: 'mv-7-chakras',
      //   name: 'Mini Vortex 7 Prism Colors',
      //   sku: 'MV-7CHAKRAS-001',
      //   price: 330,
      //   color: '#ec4899',
      //   specifications: {
      //     gauss: '1100 Gauss',
      //     frequency: '7.83Hz',
      //     batteryLife: '8 hours',
      //     chargingTime: '2 hours'
      //   },
      //   stockQuantity: 10
      // }
    ],
    pemfBenefits: [
      {
        title: 'Pain Reduction',
        description: 'Significantly reduces localized pain and inflammation in targeted areas.'
      },
      {
        title: 'Enhanced Circulation',
        description: 'Improves blood flow and oxygen delivery to treated areas.'
      },
      {
        title: 'Faster Recovery',
        description: 'Accelerates healing and tissue regeneration processes.'
      }
    ],
    specifications: {
      weight: '0.5 kg',
      dimensions: '5cm x 5cm x 10cm',
      powerSource: 'Rechargeable Battery',
      operatingTime: '8 hours continuous'
    }
  },
  {
    id: 'coil-15cm',
    name: 'Core Vortex',
    diameter: '15cm',
    description: 'The versatile healer for gut health and meditation. Balanced field projection.',
    benefits: ['Gut Health', 'Deep Meditation', 'Stress Reduction'],
    price: 800,
    currency: 'EUR',
    imageUrl: coreVortexImg,
    category: 'Therapeutic',
    inStock: true,
    stockQuantity: 30,
    variants: [
      {
        id: 'cv-tiger-quartz-selenite',
        name: 'Core Vortex Tiger Chips + Quartz + Selenite',
        sku: 'CV-TQS-001',
        price: 800,
        color: '#b45309',
        specifications: {
          gauss: '1100 Gauss',
          frequency: '7.83Hz, 13Hz, 21Hz',
          batteryLife: '12 hours',
          chargingTime: '3 hours'
        },
        stockQuantity: 12
      },
      {
        id: 'cv-amethyst-lapis',
        name: 'Core Vortex Amethyst + Lapis Lazuli',
        sku: 'CV-AL-001',
        price: 800,
        color: '#7c3aed',
        specifications: {
          gauss: '1100 Gauss',
          frequency: '7.83Hz, 13Hz, 21Hz',
          batteryLife: '12 hours',
          chargingTime: '3 hours'
        },
        stockQuantity: 8
      },
      {
        id: 'cv-green-aventurine',
        name: 'Core Vortex Green Aventurine',
        sku: 'CV-GA-001',
        price: 800,
        color: '#16a34a',
        specifications: {
          gauss: '1100 Gauss',
          frequency: '7.83Hz, 13Hz, 21Hz',
          batteryLife: '12 hours',
          chargingTime: '3 hours'
        },
        stockQuantity: 10
      }
    ],
    pemfBenefits: [
      {
        title: 'Gut Health Optimization',
        description: 'Promotes healthy digestive function and reduces inflammation in the GI tract.'
      },
      {
        title: 'Stress Reduction',
        description: 'Activates parasympathetic nervous system for deep relaxation.'
      },
      {
        title: 'Enhanced Meditation',
        description: 'Facilitates deeper meditative states and mental clarity.'
      }
    ],
    specifications: {
      weight: '1.2 kg',
      dimensions: '15cm x 15cm x 15cm',
      powerSource: 'AC Adapter or Rechargeable Battery',
      operatingTime: '12 hours continuous'
    }
  },
  {
    id: 'coil-25cm',
    name: 'Pro Vortex',
    diameter: '25cm',
    description: 'Full-body immersion for maximum recovery and sleep enhancement.',
    benefits: ['Systemic Healing', 'Sleep Quality', 'Muscle Recovery'],
    price: 1500,
    currency: 'EUR',
    imageUrl: 'https://picsum.photos/400/400?random=3',
    category: 'Professional',
    inStock: true,
    stockQuantity: 15,
    variants: [
      {
        id: 'pv-black',
        name: 'Pro Vortex Black',
        sku: 'PV-BLACK-001',
        price: 1500,
        color: '#212529',
        specifications: {
          gauss: '1100 Gauss',
          frequency: '7.83Hz, 13Hz, 21Hz, 34Hz, 55Hz',
          batteryLife: '24 hours',
          chargingTime: '4 hours'
        },
        stockQuantity: 5
      },
      {
        id: 'pv-silver',
        name: 'Pro Vortex Silver',
        sku: 'PV-SILVER-001',
        price: 1500,
        color: '#adb5bd',
        specifications: {
          gauss: '1100 Gauss',
          frequency: '7.83Hz, 13Hz, 21Hz, 34Hz, 55Hz',
          batteryLife: '24 hours',
          chargingTime: '4 hours'
        },
        stockQuantity: 3
      }
    ],
    pemfBenefits: [
      {
        title: 'Systemic Healing',
        description: 'Addresses health concerns at the cellular level throughout the body.'
      },
      {
        title: 'Improved Sleep Quality',
        description: 'Regulates circadian rhythms and promotes restorative sleep.'
      },
      {
        title: 'Accelerated Muscle Recovery',
        description: 'Reduces inflammation and speeds up muscle repair after exercise.'
      }
    ],
    specifications: {
      weight: '2.5 kg',
      dimensions: '25cm x 25cm x 20cm',
      powerSource: 'AC Adapter',
      operatingTime: 'Continuous'
    }
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah M.",
    role: "Yoga Instructor",
    quote: "Using Praana for my condition completely changed my daily routine. I feel lighter.",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "David K.",
    role: "Marathon Runner",
    quote: "Excellent results after just two sittings. Significant pain relief for my knees.",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Dr. Emily R.",
    role: "Physiotherapist",
    quote: "I recommend the 15cm coil to all my patients recovering from inflammation.",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

export const STATS = [
  { value: "85%", label: "Pain Reduction", sub: "Reported by users" },
  { value: "30min", label: "Session Time", sub: "For optimal results" },
  { value: "0%", label: "Side Effects", sub: "Non-invasive therapy" }
];