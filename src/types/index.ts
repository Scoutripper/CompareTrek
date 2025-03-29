export interface Trek {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  likes: number;
  isLiked?: boolean;
}

export interface Destination {
  name: string;
  image: string;
  treks: number;
}

export interface PopularSearch {
  name: string;
  location: string;
}

export interface SearchResult {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
  rating: number;
} 