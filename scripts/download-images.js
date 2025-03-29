const https = require('https');
const fs = require('fs');
const path = require('path');

const imageUrls = {
  destinations: {
    'uttarakhand.jpg': 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3',
    'himachal-pradesh.jpg': 'https://images.unsplash.com/photo-1486911278844-a81c5267e227',
    'sikkim.jpg': 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e',
  },
  banners: {
    'home-banner.jpg': 'https://images.unsplash.com/photo-1551632811-561732d1e306',
    'destinations-banner.jpg': 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b',
    'uttarakhand-banner.jpg': 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3',
    'himachal-pradesh-banner.jpg': 'https://images.unsplash.com/photo-1486911278844-a81c5267e227',
    'sikkim-banner.jpg': 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e',
    'og-image.jpg': 'https://images.unsplash.com/photo-1551632811-561732d1e306',
    'twitter-image.jpg': 'https://images.unsplash.com/photo-1551632811-561732d1e306',
  },
};

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const fullUrl = `${url}?auto=format&fit=crop&w=1920&q=80`;
    https.get(fullUrl, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Follow redirect
        https.get(response.headers.location, (redirectedResponse) => {
          if (redirectedResponse.statusCode !== 200) {
            reject(new Error(`Failed to download ${url}: ${redirectedResponse.statusCode}`));
            return;
          }
          const fileStream = fs.createWriteStream(filepath);
          redirectedResponse.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close();
            console.log(`Downloaded: ${filepath}`);
            resolve();
          });
          fileStream.on('error', (err) => {
            fs.unlink(filepath, () => reject(err));
          });
        }).on('error', reject);
      } else if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`Downloaded: ${filepath}`);
          resolve();
        });
        fileStream.on('error', (err) => {
          fs.unlink(filepath, () => reject(err));
        });
      } else {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function main() {
  // Create directories if they don't exist
  const dirs = ['public/images/destinations', 'public/images/banners'];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // Download destination images
  for (const [filename, url] of Object.entries(imageUrls.destinations)) {
    try {
      await downloadImage(url, path.join('public/images/destinations', filename));
    } catch (error) {
      console.error(`Failed to download ${filename}:`, error.message);
    }
  }

  // Download banner images
  for (const [filename, url] of Object.entries(imageUrls.banners)) {
    try {
      await downloadImage(url, path.join('public/images/banners', filename));
    } catch (error) {
      console.error(`Failed to download ${filename}:`, error.message);
    }
  }
}

main().catch(console.error); 