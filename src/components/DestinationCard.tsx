'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface DestinationCardProps {
  name: string;
  image: string;
  trekCount: number;
  slug: string;
}

export default function DestinationCard({ name, image, trekCount, slug }: DestinationCardProps) {
  return (
    <Link href={`/destinations/${slug}`}>
      <motion.div
        className="relative overflow-hidden rounded-2xl group cursor-pointer"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="aspect-[4/3] relative">
          <Image
            src={image}
            alt={`${name} trekking destination`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">{name}</h3>
          <p className="text-sm text-gray-200">{trekCount} treks available</p>
        </div>
      </motion.div>
    </Link>
  );
} 