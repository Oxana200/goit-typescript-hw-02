export interface UnsplashImage {
    id: string;
    alt_description: string | null;
    description: string | null;
    likes?: number;
    urls: {
      small: string;
      regular: string;
      full: string;
    };
    user?: {
      name: string;
    };
  }
  