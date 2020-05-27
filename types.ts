export interface Testimonial {
  body: string;
  title: {
    rendered: string;
  };
}

export interface Article {
  id: string;
  date: string;
  title: string;
  link: string;
}

export interface Service {
  body: string;
  title: string;
  imageUrl: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
}

export interface Project {
  title: string;
  blocks: any[];
}
