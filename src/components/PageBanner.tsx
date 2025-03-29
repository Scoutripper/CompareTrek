import Image from 'next/image';
import { motion } from 'framer-motion';

interface PageBannerProps {
  title: string;
  description?: string;
  image: string;
  height?: 'sm' | 'md' | 'lg';
}

export default function PageBanner({ title, description, image, height = 'md' }: PageBannerProps) {
  const heightClasses = {
    sm: 'h-[40vh]',
    md: 'h-[60vh]',
    lg: 'h-[80vh]',
  };

  return (
    <div className={`relative ${heightClasses[height]} flex items-center justify-center`}>
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 text-center text-white px-4">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p 
            className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </div>
  );
} 