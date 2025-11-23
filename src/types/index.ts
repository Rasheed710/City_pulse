export interface EventType {
  id: string;
  name: string;
  images?: { url: string }[];
  dates?: {
    start?: {
      localDate?: string;
      localTime?: string;
    };
  };
  _embedded?: {
    venues?: Array<{
      name?: string;
      city?: { name?: string };
      country?: { name?: string };
      address?: { line1?: string };
      location?: {
        latitude?: string;
        longitude?: string;
      };
    }>;
    attractions?: Array<{
      name?: string;
    }>;
  };
}

