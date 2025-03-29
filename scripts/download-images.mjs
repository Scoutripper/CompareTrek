import https from 'https';
import fs from 'fs';
import path from 'path';

const images = [
  {
    name: 'hero.jpg',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b'
  },
  {
    name: 'trek1.jpg',
    url: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227'
  },
  {
    name: 'trek2.jpg',
    url: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5'
  },
  {
    name: 'trek3.jpg',
    url: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f'
  },
  {
    name: 'uttarakhand.jpg',
    url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23'
  },
  {
    name: 'himachal.jpg',
    url: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd'
  },
  {
    name: 'sikkim.jpg',
    url: 'https://images.unsplash.com/photo-1463693396721-8ca0cfa2b3b5'
  }
];

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams({
      auto: 'format',
      fit: 'crop',
      w: '800',
      q: '80'
    });

    const fullUrl = `${url}?${params.toString()}`;
    
    https.get(fullUrl, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      const imagePath = path.join(process.cwd(), 'public', 'images', filename);
      const fileStream = fs.createWriteStream(imagePath);
      
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });
    }).on('error', reject);
  });
};

// Create images directory if it doesn't exist
const imagesDir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Download all images
Promise.all(images.map(img => downloadImage(img.url, img.name)))
  .then(() => console.log('All images downloaded successfully'))
  .catch(error => console.error('Error downloading images:', error));
