export const images = {
  destinations: {
    uttarakhand: {
      card: '/images/destinations/uttarakhand.jpg',
      banner: '/images/banners/uttarakhand-banner.jpg',
    },
    himachalPradesh: {
      card: '/images/destinations/himachal-pradesh.jpg',
      banner: '/images/banners/himachal-pradesh-banner.jpg',
    },
    sikkim: {
      card: '/images/destinations/sikkim.jpg',
      banner: '/images/banners/sikkim-banner.jpg',
    },
  },
  banners: {
    home: '/images/banners/home-banner.jpg',
    destinations: '/images/banners/destinations-banner.jpg',
    treks: '/images/banners/treks-banner.jpg',
    about: '/images/banners/about-banner.jpg',
    contact: '/images/banners/contact-banner.jpg',
  },
  meta: {
    ogImage: '/images/banners/og-image.jpg',
    twitterImage: '/images/banners/twitter-image.jpg',
    favicon: '/favicon.ico',
    appleTouchIcon: '/apple-touch-icon.png',
  },
} as const;

export const imageSizes = {
  banner: {
    width: 1920,
    height: 1080,
  },
  destinationCard: {
    width: 800,
    height: 600,
  },
  ogImage: {
    width: 1200,
    height: 630,
  },
} as const; 