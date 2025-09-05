export interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  departure: {
    airport: string;
    airportCode: string;
    city: string;
    country: string;
    terminal?: string;
    gate?: string;
  };
  arrival: {
    airport: string;
    airportCode: string;
    city: string;
    country: string;
    terminal?: string;
    gate?: string;
  };
  departureTime: string; // ISO 8601 format
  arrivalTime: string; // ISO 8601 format
  duration: number; // in minutes
  price: {
    base: number;
    currency: string;
    taxes?: number;
    fees?: number;
    total: number;
  };
  stops: number;
  aircraft: {
    type: string;
    manufacturer: string;
    model: string;
  };
  class: 'economy' | 'premium_economy' | 'business' | 'first';
  baggage: {
    carryOn: boolean;
    checked: number; // number of bags included
    weightLimit?: number; // in kg
  };
  amenities: string[];
  bookingClass: string; // e.g., 'Y', 'B', 'M' for economy
  availableSeats: number;
  refundable: boolean;
  changeable: boolean;
  lastUpdated: string; // ISO 8601 format
}
