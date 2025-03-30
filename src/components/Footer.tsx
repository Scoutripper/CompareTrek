import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const footerLinks = [
  {
    title: 'Company',
    links: [
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Blog', href: '/blog' },
      { name: 'Terms', href: '/terms' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'FAQ', href: '/faq' },
      { name: 'Support', href: '/support' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Refund Policy', href: '/refund-policy' },
    ],
  },
  {
    title: 'Services',
    links: [
      { name: 'Treks', href: '/treks' },
      { name: 'Destinations', href: '/destinations' },
      { name: 'Custom Tours', href: '/custom-tours' },
      { name: 'Group Bookings', href: '/group-booking' },
    ],
  },
];

const socialLinks = [
  { name: 'Facebook', icon: FaFacebook, href: 'https://facebook.com/scoutripper' },
  { name: 'Twitter', icon: FaTwitter, href: 'https://twitter.com/scoutripper' },
  { name: 'Instagram', icon: FaInstagram, href: 'https://instagram.com/scoutripper' },
  { name: 'YouTube', icon: FaYoutube, href: 'https://youtube.com/scoutripper' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Scoutripper</h3>
            <p className="text-gray-400 mb-4">
              Your ultimate trekking adventure partner. Discover breathtaking destinations and create unforgettable memories.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <link.icon className="w-6 h-6" />
                  <span className="sr-only">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Scoutripper. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 