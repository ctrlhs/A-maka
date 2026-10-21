export interface SeerahPlace {
  id: string;
  name: string;
  city: string;
  category: string;
  event: string;
  historicalOverview: string;
  sources: string[];
  image: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  mapUrl?: string;
  suggestedPrompt: string;
  authenticityNote?: string;
}

export interface HijrahStation {
  order: number;
  id: string;
  title: string;
  locationName: string;
  timeframe: string;
  story: string;
  sources: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
  mapUrl?: string;
  isConfirmedLocation: boolean;
  notesOnGeography: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sources?: string[];
  isError?: boolean;
}

export interface HistoricalReference {
  id: string;
  title: string;
  author: string;
  era: string;
  description: string;
}
