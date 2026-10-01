export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicFile {
  url: string;
  imgix_url: string;
}

export type StoryPageLayout = 'Full Illustration' | 'Text + Illustration' | 'Text Only';

export interface Book extends CosmicObject {
  type: 'books';
  metadata: {
    subtitle?: string;
    author_name?: string;
    description?: string;
    cover_image?: CosmicFile;
    trim_size?: string;
    target_age?: string;
    page_count?: number;
    keywords?: string;
    isbn?: string;
  };
}

export interface StoryPage extends CosmicObject {
  type: 'story-pages';
  metadata: {
    book?: Book;
    page_number?: number;
    layout?: StoryPageLayout;
    story_text?: string;
    illustration?: CosmicFile;
    illustration_notes?: string;
  };
}

export interface Character extends CosmicObject {
  type: 'characters';
  metadata: {
    book?: Book;
    role?: string;
    description?: string;
    character_image?: CosmicFile;
  };
}

export function isBook(obj: CosmicObject): obj is Book {
  return obj.type === 'books';
}

export function isStoryPage(obj: CosmicObject): obj is StoryPage {
  return obj.type === 'story-pages';
}

export function isCharacter(obj: CosmicObject): obj is Character {
  return obj.type === 'characters';
}