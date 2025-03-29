#!/bin/bash

# Create images directory if it doesn't exist
mkdir -p public/images

# Download images
curl -o public/images/hero.jpg "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80"
curl -o public/images/trek1.jpg "https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&q=80"
curl -o public/images/trek2.jpg "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&q=80"
curl -o public/images/trek3.jpg "https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&q=80"
curl -o public/images/uttarakhand.jpg "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80"
curl -o public/images/himachal.jpg "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&q=80"
curl -o public/images/sikkim.jpg "https://images.unsplash.com/photo-1463693396721-8ca0cfa2b3b5?auto=format&fit=crop&q=80"
