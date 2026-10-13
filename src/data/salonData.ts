import { Branch, SalonService, Stylist, BlogPost, Review } from '../types/salon';

export const SALON_INFO = {
  name: 'Mirrorist Unisex Salon',
  tagline: 'Hair, Beauty & Grooming Salon',
  subtext: 'Your trusted neighborhood salon in Vaishali Nagar, Jaipur. Professional haircuts, hair colour, smoothing treatments, facials, and bridal makeup.',
  primaryPhone: '+91 76159 48611',
  rawPhone: '+917615948611',
  whatsappNumber: '917615948611',
  email: 'contact@mirroristunisexsalon.com',
  rating: 4.8,
  reviewCount: 384,
  instagramHandle: '@mirroristunisexsalon',
  instagramUrl: 'https://instagram.com/mirroristunisexsalon',
  facebookUrl: 'https://facebook.com/mirroristunisexsalon',
  youtubeUrl: 'https://youtube.com',
  googleMapsPrimaryUrl: 'https://www.google.com/maps/place/Mirrorist+unisex+salon/@26.9106183,75.7414352,17z/data=!3m1!4b1!4m6!3m5!1s0x396db5c7fd0dffc9:0x1e6c9e3cd8555860!8m2!3d26.9106135!4d75.7440101!16s%2Fg%2F11vt4m_cpg',
};

// Single official branch
export const BRANCHES: Branch[] = [
  {
    id: 'vaishali-nagar',
    name: 'Mirrorist Unisex Salon',
    area: 'Hanuman Nagar / Amrapali Circle, Vaishali Nagar',
    fullAddress: 'Plot No. E-21 Shop No. 1, Gupta Store, Opposite Royal Bakery, Hanuman Nagar, Amrapali Circle, Vaishali Nagar, Jaipur, Rajasthan 302021',
    phone: '+91 76159 48611',
    whatsapp: '917615948611',
    timings: '10:00 AM – 9:00 PM',
    days: 'Open 7 Days a Week',
    lat: 26.9106135,
    lng: 75.7440101,
    googleMapsUrl: 'https://www.google.com/maps/place/Mirrorist+unisex+salon/@26.9106183,75.7414352,17z/data=!3m1!4b1!4m6!3m5!1s0x396db5c7fd0dffc9:0x1e6c9e3cd8555860!8m2!3d26.9106135!4d75.7440101!16s%2Fg%2F11vt4m_cpg',
    embedMapUrl: 'https://maps.google.com/maps?q=26.9106135,75.7440101&hl=en&z=17&output=embed',
    landmarks: 'Opposite Royal Bakery, near Amrapali Circle and Gupta Store',
    parking: 'Free front parking available',
    isFlagship: true,
  },
];

export const SALON_SERVICES: SalonService[] = [
  // Hair Treatments & Smoothing
  {
    id: 'nanoplastia-treatment',
    name: 'Nanoplastia Hair Treatment',
    category: 'treatments',
    gender: 'unisex',
    duration: '2.5 – 3 hours',
    price: 3999,
    originalPrice: 5000,
    description: 'For frizzy, wavy or unmanageable hair. An organic amino-acid smoothing treatment that leaves your hair soft, glossy, and noticeably easier to style every day.',
    benefits: [
      'Removes daily frizz and cuts down styling time',
      'Smoother, softer hair with natural movement',
      'Free of formaldehyde fumes; gentler on scalp',
      'Typically lasts 4 to 6 months with sulfate-free care'
    ],
    popular: true,
  },
  {
    id: 'hair-botox-therapy',
    name: 'Hair Botox Deep Conditioning',
    category: 'treatments',
    gender: 'unisex',
    duration: '2 hours',
    price: 3499,
    originalPrice: 4500,
    description: 'For dry, chemically treated, or heat-damaged hair. A deeply hydrating mask rich in proteins that softens rough ends and brings back shine without changing your natural wave or curl.',
    benefits: [
      'Intense hydration for dry, brittle strands',
      'Keeps your natural waves while eliminating frizz',
      'Helps repair damage from Jaipur hard water and heat',
      'Results typically last 2 to 3 months'
    ],
    popular: true,
  },
  {
    id: 'keratin-smoothing',
    name: 'Keratin Hair Smoothing',
    category: 'treatments',
    gender: 'unisex',
    duration: '2.5 hours',
    price: 3499,
    originalPrice: 4500,
    description: 'A classic smoothing treatment using quality salon products to tame coarse hair, reduce volume, and make blow-drying much faster.',
    benefits: [
      'Calms puffy, coarse hair in humid weather',
      'Creates a smooth, glossy finish',
      'Includes hair wash and aftercare advice'
    ],
    popular: false,
  },
  {
    id: 'scalp-detox-spa',
    name: 'Hair Spa & Scalp Cleansing',
    category: 'treatments',
    gender: 'unisex',
    duration: '60 mins',
    price: 1299,
    originalPrice: 1600,
    description: 'A relaxing head massage, steam session, and deep conditioning treatment to clear product buildup, nourish the scalp, and relieve daily stress.',
    benefits: [
      'Removes mineral buildup from borewell water',
      'Calming pressure-point head and shoulder massage',
      'Leaves hair soft, refreshed and shiny'
    ],
    popular: false,
  },

  // Haircuts & Colour
  {
    id: 'bespoke-balayage',
    name: 'Balayage & Hair Highlights',
    category: 'hair',
    gender: 'women',
    duration: '3 hours',
    price: 4499,
    originalPrice: 5800,
    description: 'Hand-painted highlights blended naturally into your base hair colour. Great for caramel, honey, or chocolate tones that grow out softly without harsh lines.',
    benefits: [
      'Low-maintenance regrowth with soft blending',
      'Customized shade matching your skin tone',
      'Includes gloss toner and conditioning seal'
    ],
    popular: true,
  },
  {
    id: 'global-hair-color',
    name: 'Global Hair Colour (Grey Coverage / New Shade)',
    category: 'hair',
    gender: 'unisex',
    duration: '90 mins',
    price: 2499,
    originalPrice: 3000,
    description: 'Full root-to-tip colour using professional salon brands. Covers 100% greys or enriches your natural shade with healthy, even tone.',
    benefits: [
      'Reliable 100% grey coverage',
      'Gentle, scalp-friendly formulations available',
      'Even, long-lasting rich colour'
    ],
    popular: true,
  },
  {
    id: 'signature-women-haircut',
    name: "Women's Haircut, Wash & Blow-Dry",
    category: 'hair',
    gender: 'women',
    duration: '45 mins',
    price: 799,
    originalPrice: 1000,
    description: 'A personalized cut tailored to your face shape and hair texture, followed by a refreshing shampoo wash and a bouncy blow-dry style.',
    benefits: [
      'Styling consultation before cutting',
      'Relaxing shampoo & conditioning wash',
      'Blow-dry style included'
    ],
    popular: false,
  },

  // Men's Grooming
  {
    id: 'mens-executive-grooming',
    name: "Men's Haircut & Beard Styling Combo",
    category: 'mens',
    gender: 'men',
    duration: '50 mins',
    price: 799,
    originalPrice: 1100,
    description: 'A sharp, modern haircut (fade, taper or classic) combined with a clean beard trim, razor edge-up, hot towel steam, and head massage.',
    benefits: [
      'Clean razor lines for cheeks and neckline',
      'Hot towel steam to soften beard hair',
      'Quick refreshing head massage'
    ],
    popular: true,
  },
  {
    id: 'mens-designer-haircut',
    name: "Men's Precision Haircut & Wash",
    category: 'mens',
    gender: 'men',
    duration: '30 mins',
    price: 349,
    originalPrice: 450,
    description: 'A crisp, well-blended haircut tailored to your head shape, finished with a cooling shampoo wash and everyday styling wax.',
    benefits: [
      'Fade, crop, side-part, or classic taper',
      'Includes shampoo wash and styling'
    ],
    popular: false,
  },
  {
    id: 'beard-sculpt-color',
    name: 'Beard Trim & Natural Colour',
    category: 'mens',
    gender: 'men',
    duration: '35 mins',
    price: 449,
    originalPrice: 600,
    description: 'Symmetrical beard shaping with natural tinting to cover grey patches without staining your skin.',
    benefits: [
      'Sharp beard lines',
      'Natural-looking grey coverage',
      'Soothing beard oil finish'
    ],
    popular: false,
  },
  {
    id: 'mens-tan-removal-d-tan',
    name: "Men's D-Tan Face Cleansing",
    category: 'mens',
    gender: 'men',
    duration: '40 mins',
    price: 699,
    originalPrice: 900,
    description: 'A gentle scrub and cleansing pack to remove dust, sun tan, and excess oil from daily traffic and outdoor heat.',
    benefits: [
      'Clears dull tanned surface skin',
      'Deep pore blackhead removal',
      'Fresh, matte and clean feel'
    ],
    popular: false,
  },

  // Skin & Facials
  {
    id: 'hydra-glow-facial',
    name: 'Hydra Cleanse & Glow Facial',
    category: 'skin',
    gender: 'unisex',
    duration: '60 mins',
    price: 2199,
    originalPrice: 2800,
    description: 'Gentle water-based pore suction and serum infusion that clears blackheads and hydrates thirsty skin without redness or downtime.',
    benefits: [
      'Painless blackhead & whitehead removal',
      'Immediate fresh, clean hydration',
      'Great before parties, weddings, or functions'
    ],
    popular: true,
  },
  {
    id: 'gold-collagen-facial',
    name: 'Brightening Gold Facial',
    category: 'skin',
    gender: 'women',
    duration: '60 mins',
    price: 1699,
    originalPrice: 2200,
    description: 'A traditional glow-enhancing facial with gentle facial massage, exfoliation, and a soothing gold pack for an instant radiance boost.',
    benefits: [
      'Relaxing face and neck massage',
      'Helps lighten dullness and fatigue',
      'Leaves skin soft and glowing'
    ],
    popular: false,
  },
  {
    id: 'o3-bridal-d-tan-spa',
    name: 'O3+ Instant Brightening Facial',
    category: 'skin',
    gender: 'unisex',
    duration: '60 mins',
    price: 1999,
    originalPrice: 2500,
    description: 'A dermatologically tested facial pack specifically designed to fade stubborn sun tan and restore an even, healthy skin tone.',
    benefits: [
      'Noticeable reduction in sun tan',
      'Includes cooling peel-off mask',
      'Suitable for sensitive or sun-exposed skin'
    ],
    popular: false,
  },

  // Bridal & Groom
  {
    id: 'bridal-hd-makeup',
    name: 'Bridal HD Makeup & Complete Styling',
    category: 'bridal',
    gender: 'women',
    duration: '3 hours',
    price: 8999,
    originalPrice: 12000,
    description: 'Long-lasting, camera-ready bridal makeup using trusted international cosmetics (MAC, Huda Beauty, Kryolan). Includes hair updo, dupatta draping, and jewelry setting.',
    benefits: [
      'Sweat-resistant finish that stays intact for hours',
      'Eyelashes, lens application, and hair art included',
      'Private styling area for calm pre-wedding preparation',
      'Pre-wedding consultation included'
    ],
    popular: true,
  },
  {
    id: 'groom-royal-prep',
    name: 'Groom Styling & Skin Package',
    category: 'bridal',
    gender: 'men',
    duration: '75 mins',
    price: 2499,
    originalPrice: 3500,
    description: 'Complete pre-wedding grooming for grooms: skin cleanup, beard shaping, hair styling, and subtle camera-ready touchup.',
    benefits: [
      'Clean, shine-free skin for photography',
      'Sharp hair and beard definition',
      'Hand grooming and cleanup included'
    ],
    popular: false,
  },

  // Mani & Pedi
  {
    id: 'spa-pedicure-ice-cream',
    name: 'Relaxing Spa Pedicure & Manicure',
    category: 'nails',
    gender: 'unisex',
    duration: '60 mins',
    price: 1299,
    originalPrice: 1700,
    description: 'A warm foot soak, scrub to remove dead skin from heels, nail shaping, cuticle care, and a soothing foot massage.',
    benefits: [
      'Smooths cracked heels and dry feet',
      'Relieves tired feet with warm massage',
      'Neat nail trimming and buffing'
    ],
    popular: false,
  },
];

export const STYLISTS: Stylist[] = [
  {
    id: 'rohit-sharma',
    name: 'Rohit Sharma',
    role: 'Senior Hair Stylist',
    experience: '11+ Years Experience',
    specialty: 'Nanoplastia, Balayage, Precision Haircuts',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'priya-rathore',
    name: 'Priya Rathore',
    role: 'Bridal Makeup Artist',
    experience: '8+ Years Experience',
    specialty: 'HD Bridal Makeup & Traditional Draping',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'vikram-singh',
    name: 'Vikram Singh',
    role: 'Men’s Grooming Specialist',
    experience: '7+ Years Experience',
    specialty: 'Fades, Beard Architecture, Scalp Care',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'anjali-sharma',
    name: 'Anjali Sharma',
    role: 'Skin Therapist',
    experience: '6+ Years Experience',
    specialty: 'Hydra Facials & D-Tan Cleansing',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'nanoplastia-vs-hair-botox',
    slug: 'nanoplastia-vs-hair-botox-jaipur-guide',
    title: 'Nanoplastia vs. Hair Botox: Which One is Right for You?',
    excerpt: 'Simple guide to choosing the right hair treatment for Jaipur weather, your natural hair texture, and your styling routine.',
    category: 'Hair Treatments',
    readTime: '3 min read',
    date: 'Updated for 2026',
    author: 'Rohit Sharma (Senior Stylist)',
    coverImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80',
    content: [
      'Many clients visiting our Vaishali Nagar salon ask us: "Should I get Nanoplastia or Hair Botox?" Here is the honest, straightforward answer.',
      'Nanoplastia is a smoothing treatment. If your main concern is frizzy, puffy hair that takes forever to comb or blow-dry, Nanoplastia helps relax the curl and gives you smooth, shiny, wash-and-wear hair.',
      'Hair Botox is a deep conditioning treatment. It does NOT straighten your hair. Instead, it replenishes moisture and proteins to hair that feels dry, rough, or damaged from hard water and frequent coloring.',
      'In short: Pick Nanoplastia if you want smooth, manageable hair that stays frizz-free. Pick Hair Botox if you want softer, healthier-feeling hair while keeping your natural wave or curl pattern.'
    ],
    keyTakeaways: [
      'Nanoplastia smooths frizz and relaxes waves (lasts 4–6 months)',
      'Hair Botox deeply moisturizes without changing your natural curl (lasts 2–3 months)',
      'Both treatments are gentler on hair than older chemical treatments',
      'Always use a mild, sulfate-free shampoo to make your results last longer'
    ],
    recommendedServices: ['nanoplastia-treatment', 'hair-botox-therapy'],
  },
  {
    id: 'rajasthan-summer-hard-water-hair-defense',
    slug: 'rajasthan-summer-hard-water-hair-defense',
    title: 'How to Protect Hair from Jaipur Hard Water & Dry Heat',
    excerpt: 'Practical, everyday tips to keep your hair soft when dealing with high-TDS tap water and dry weather.',
    category: 'Hair Care Tips',
    readTime: '3 min read',
    date: 'Updated for 2026',
    author: 'Anjali Sharma (Skin & Hair Specialist)',
    coverImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
    content: [
      'In Vaishali Nagar and neighboring areas, tap water contains higher mineral deposits (calcium and magnesium). Over time, this makes hair feel stiff, dry, and chalky.',
      'A simple habit that helps immediately: use filtered (RO) water for your very last rinse after washing your hair. This washes away leftover mineral salts before they dry on your strands.',
      'Avoid washing your hair with very hot water, which strips natural scalp oils. Luke-warm or room-temperature water is far gentler.',
      'If your hair already feels heavy and rough, book a gentle scalp clarifying wash or hair spa once a month to reset your hair.'
    ],
    keyTakeaways: [
      'Finish your hair wash with a mug of RO water',
      'Use a moisturizing leave-in conditioner before stepping into the afternoon sun',
      'Oil your hair lightly 1 hour before shampooing (not overnight if you have an oily scalp)',
      'Get a clarifying hair spa session every 4 to 6 weeks'
    ],
    recommendedServices: ['scalp-detox-spa'],
  },
  {
    id: 'mens-beard-hair-grooming-rituals',
    slug: 'mens-beard-hair-grooming-rituals',
    title: "Simple Men's Grooming Habits That Make a Real Difference",
    excerpt: 'Easy ways to keep your haircut fresh, your beard neat, and your skin clear between salon visits.',
    category: "Men's Grooming",
    readTime: '3 min read',
    date: 'Updated for 2026',
    author: 'Vikram Singh (Grooming Lead)',
    coverImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1000&q=80',
    content: [
      'Looking well-groomed does not require dozens of products. It just requires consistency and clean habits.',
      'Keep your beard neckline at the right height: place two fingers above your Adam’s apple. That is where your beard should stop. Trimming it too high makes the jawline look awkward.',
      'Never wash your beard with harsh bathing soap. Body soap strips essential facial oils, causing dry, itchy skin underneath your beard.',
      'Get a quick trim every 2 to 3 weeks to keep your fade sharp and sideburns clean.'
    ],
    keyTakeaways: [
      'Trim beard neckline two finger-widths above the Adam’s apple',
      'Wash beard with mild cleanser, not body soap',
      'Schedule a maintenance haircut every 2–3 weeks',
      'Use a light moisturizer with SPF when riding a two-wheeler'
    ],
    recommendedServices: ['mens-executive-grooming'],
  },
  {
    id: 'bridal-glow-skin-prep-timeline',
    slug: 'bridal-glow-skin-prep-timeline',
    title: 'Pre-Bridal Beauty Timeline: When to Schedule Each Service',
    excerpt: 'A stress-free schedule for facials, hair treatments, and trial makeup before your wedding.',
    category: 'Bridal Tips',
    readTime: '4 min read',
    date: 'Updated for 2026',
    author: 'Priya Rathore (Bridal Lead)',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    content: [
      'Pre-wedding preparation is best when planned gradually, so your skin and hair look natural and fresh on the big day.',
      '4 Weeks Before: If you plan on getting Nanoplastia or hair colour, get it done 3 to 4 weeks prior. This lets the hair settle naturally.',
      '2 Weeks Before: Schedule your facial and do a makeup and dupatta trial so there are zero surprises.',
      '3 Days Before: Final gentle D-Tan, eyebrow grooming, and relaxing spa manicure & pedicure.',
      'Wedding Day: Relax in our comfortable salon suite while our team takes care of makeup, hairstyle, and outfit draping.'
    ],
    keyTakeaways: [
      'Do not try harsh new skincare treatments right before your wedding',
      'Finish hair smoothing or global color 3–4 weeks in advance',
      'Book a bridal makeup trial with your jewelry and dupatta',
      'Drink plenty of water and get adequate sleep during ceremonies'
    ],
    recommendedServices: ['bridal-hd-makeup', 'hydra-glow-facial'],
  },
];

export const CLIENT_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    clientName: 'Sunita Meena',
    service: 'Nanoplastia Hair Treatment',
    branch: 'Vaishali Nagar, Jaipur',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Got my Nanoplastia done at Mirrorist Vaishali Nagar. Rohit was very polite and explained everything clearly beforehand. My hair is so much easier to manage in the mornings now, even after washing at home. Very happy with the result!',
    verified: true,
  },
  {
    id: 'rev-2',
    clientName: 'Gaurav Khandelwal',
    service: "Men's Haircut & Beard Styling",
    branch: 'Vaishali Nagar, Jaipur',
    rating: 5,
    date: '1 month ago',
    comment: 'Clean shop, sanitized tools, and Vikram really took his time on the fade and beard lines. Fair pricing and no pushy upselling. My go-to salon in Vaishali Nagar now.',
    verified: true,
  },
  {
    id: 'rev-3',
    clientName: 'Ananya Sharma',
    service: 'Balayage & Hair Highlights',
    branch: 'Vaishali Nagar, Jaipur',
    rating: 5,
    date: '3 weeks ago',
    comment: 'I wanted subtle caramel highlights that looked natural for office wear. The stylist matched my hair tone perfectly. Professional staff and pleasant environment near Amrapali Circle.',
    verified: true,
  },
  {
    id: 'rev-4',
    clientName: 'Mohit Mathur',
    service: 'Hair Botox & D-Tan Cleanse',
    branch: 'Vaishali Nagar, Jaipur',
    rating: 5,
    date: 'A month ago',
    comment: 'Polite staff, great haircut, and honest advice about my hair. WhatsApp booking was instant and they took me right on time without long waiting.',
    verified: true,
  },
  {
    id: 'rev-5',
    clientName: 'Pooja Agarwal',
    service: 'Bridal HD Makeup & Draping',
    branch: 'Vaishali Nagar, Jaipur',
    rating: 5,
    date: '2 months ago',
    comment: 'Priya did my sister’s wedding makeup and hair. The makeup was natural, glowing, and stayed fresh all night through the functions. Highly recommended for bridal bookings in Vaishali Nagar.',
    verified: true,
  },
];

export const FAQS = [
  {
    q: 'What is Nanoplastia and how is it different from normal straightening?',
    a: 'Nanoplastia is an organic amino-acid smoothing treatment free of formaldehyde fumes. It tames frizz, softens waves, and makes hair much easier to manage everyday. Unlike older chemical straightening, it maintains natural movement and softness.',
  },
  {
    q: 'Do I need an appointment or can I walk in?',
    a: 'Walk-ins are always welcome at our Vaishali Nagar salon. However, for longer services like Nanoplastia, Balayage, or Bridal styling, booking on WhatsApp or online ensures you get your preferred stylist with zero waiting time.',
  },
  {
    q: 'Does the price change based on hair length?',
    a: 'Yes, for chemical services like Nanoplastia, Botox, and Balayage, the starting price is for shoulder-length hair. If your hair is longer or thicker, additional product is required. We always give you the exact final price during the consultation before starting.',
  },
  {
    q: 'Where exactly is the salon located in Vaishali Nagar?',
    a: 'We are located at Plot No. E-21, Shop No. 1, Gupta Store building, opposite Royal Bakery in Hanuman Nagar, Amrapali Circle, Vaishali Nagar, Jaipur, Rajasthan 302021 (Google Maps coordinates 26.9106135, 75.7440101). Free parking is available right in front of the salon.',
  },
  {
    q: 'How long does a Nanoplastia or Hair Botox appointment take?',
    a: 'Depending on your hair length and density, a session takes approximately 2.5 to 3 hours. We have a comfortable air-conditioned seating area with complimentary tea, coffee, and Wi-Fi.',
  },
];
