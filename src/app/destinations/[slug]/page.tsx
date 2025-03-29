import { notFound } from 'next/navigation';
import PageBanner from '@/components/PageBanner';
import Image from '@/components/ui/Image';
import Link from 'next/link';
import { images } from '@/config/images';

const destinations = {
  'uttarakhand': {
    name: 'Uttarakhand',
    image: images.destinations.uttarakhand.card,
    bannerImage: images.destinations.uttarakhand.banner,
    description: 'Known as the Land of Gods, Uttarakhand offers some of the most spectacular trekking routes in India. From snow-capped peaks to lush valleys, ancient temples to pristine lakes, every trail here tells a story.',
    popularTreks: [
      { name: 'Valley of Flowers', difficulty: 'Moderate', duration: '6 days' },
      { name: 'Kedarkantha', difficulty: 'Easy-Moderate', duration: '6 days' },
      { name: 'Roopkund', difficulty: 'Difficult', duration: '8 days' },
      { name: 'Har Ki Dun', difficulty: 'Moderate', duration: '7 days' },
    ],
    bestTime: 'March to June, September to December',
    highlights: [
      'Home to some of India\'s highest peaks',
      'Rich biodiversity and unique flora',
      'Ancient temples and pilgrimage routes',
      'Pristine alpine meadows and lakes',
    ],
  },
  'himachal-pradesh': {
    name: 'Himachal Pradesh',
    image: images.destinations.himachalPradesh.card,
    bannerImage: images.destinations.himachalPradesh.banner,
    description: 'Himachal Pradesh is a trekker\'s paradise with its diverse landscapes ranging from lush green valleys to barren trans-Himalayan deserts. The state offers treks for every skill level.',
    popularTreks: [
      { name: 'Hampta Pass', difficulty: 'Moderate', duration: '5 days' },
      { name: 'Triund', difficulty: 'Easy', duration: '2 days' },
      { name: 'Pin Parvati Pass', difficulty: 'Difficult', duration: '11 days' },
      { name: 'Bhrigu Lake', difficulty: 'Moderate', duration: '4 days' },
    ],
    bestTime: 'April to June, September to November',
    highlights: [
      'Diverse landscapes and terrains',
      'Ancient Buddhist monasteries',
      'High-altitude alpine lakes',
      'Traditional Himalayan villages',
    ],
  },
  'sikkim': {
    name: 'Sikkim',
    image: images.destinations.sikkim.card,
    bannerImage: images.destinations.sikkim.banner,
    description: 'Sikkim offers a unique blend of culture and nature. With the majestic Kanchenjunga as its backdrop, the state provides some of the most scenic and culturally rich trekking experiences.',
    popularTreks: [
      { name: 'Goecha La', difficulty: 'Difficult', duration: '11 days' },
      { name: 'Dzongri', difficulty: 'Moderate', duration: '6 days' },
      { name: 'Sandakphu', difficulty: 'Moderate', duration: '7 days' },
      { name: 'Green Lake', difficulty: 'Difficult', duration: '9 days' },
    ],
    bestTime: 'March to May, October to December',
    highlights: [
      'Views of Kanchenjunga',
      'Rich Buddhist culture',
      'Diverse rhododendron forests',
      'High-altitude wetlands',
    ],
  },
};

export default function DestinationPage({ params }: { params: { slug: string } }) {
  const destination = destinations[params.slug as keyof typeof destinations];

  if (!destination) {
    notFound();
  }

  return (
    <div>
      <PageBanner
        title={destination.name}
        description="Discover the beauty and adventure that awaits"
        image={destination.bannerImage}
        height="lg"
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-700 mb-8">{destination.description}</p>

          <h2 className="text-2xl font-bold mb-4">Popular Treks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {destination.popularTreks.map((trek) => (
              <div key={trek.name} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2">{trek.name}</h3>
                <p className="text-gray-600">Difficulty: {trek.difficulty}</p>
                <p className="text-gray-600">Duration: {trek.duration}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-4">Highlights</h2>
          <ul className="list-disc list-inside space-y-2 mb-8 text-gray-700">
            {destination.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-2">Best Time to Visit</h2>
            <p className="text-gray-700">{destination.bestTime}</p>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/treks"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Explore Available Treks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 