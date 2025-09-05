import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { Flight } from '@/types/flight';
import flightsData from '@/data/flights.json';
import { z } from 'zod';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4-turbo'),
    system: `You are a helpful flight search assistant. You can search for flights using the searchFlights tool based on various criteria like price, airline, stops, duration, and cities. 

When users ask for flights, use the searchFlights tool to find relevant results. For example:
- "find me the cheapest flight" → search with sortBy: 'price', sortOrder: 'asc'
- "show me direct flights under $300" → search with maxStops: 0, maxPrice: 300
- "United flights to New York" → search with airline: 'United Airlines', arrivalCity: 'New York'
- "flights from SFO to JFK" → search with departureCity: 'SFO', arrivalCity: 'JFK'

Always provide helpful, detailed responses about the flights you find.`,
    messages,
    tools: {
      searchFlights: {
        description: 'Search for flights based on various criteria like price, airline, stops, duration, departure/arrival cities, and more.',
        parameters: z.object({
          maxPrice: z.number().optional().describe('Maximum price in USD'),
          minPrice: z.number().optional().describe('Minimum price in USD'),
          airline: z.string().optional().describe('Specific airline name (e.g., "United Airlines", "Delta Air Lines")'),
          maxStops: z.number().optional().describe('Maximum number of stops (0 for direct flights)'),
          maxDuration: z.number().optional().describe('Maximum flight duration in minutes'),
          departureCity: z.string().optional().describe('Departure city or airport code'),
          arrivalCity: z.string().optional().describe('Arrival city or airport code'),
          sortBy: z.enum(['price', 'duration', 'departure_time', 'arrival_time']).optional().describe('Sort results by this criteria'),
          sortOrder: z.enum(['asc', 'desc']).optional().describe('Sort order - ascending or descending'),
          limit: z.number().optional().describe('Maximum number of results to return (default: 10)'),
        }),
        execute: async (params) => {
          console.log('Flight search tool called with params:', params);
          const flights: Flight[] = flightsData as Flight[];
          let filteredFlights = [...flights];

          // Apply filters
          if (params.maxPrice) {
            filteredFlights = filteredFlights.filter(flight => flight.price.total <= params.maxPrice!);
          }
          
          if (params.minPrice) {
            filteredFlights = filteredFlights.filter(flight => flight.price.total >= params.minPrice!);
          }
          
          if (params.airline) {
            filteredFlights = filteredFlights.filter(flight => 
              flight.airline.toLowerCase().includes(params.airline!.toLowerCase())
            );
          }
          
          if (params.maxStops !== undefined) {
            filteredFlights = filteredFlights.filter(flight => flight.stops <= params.maxStops!);
          }
          
          if (params.maxDuration) {
            filteredFlights = filteredFlights.filter(flight => flight.duration <= params.maxDuration!);
          }
          
          if (params.departureCity) {
            filteredFlights = filteredFlights.filter(flight => 
              flight.departure.city.toLowerCase().includes(params.departureCity!.toLowerCase()) ||
              flight.departure.airportCode.toLowerCase().includes(params.departureCity!.toLowerCase())
            );
          }
          
          if (params.arrivalCity) {
            filteredFlights = filteredFlights.filter(flight => 
              flight.arrival.city.toLowerCase().includes(params.arrivalCity!.toLowerCase()) ||
              flight.arrival.airportCode.toLowerCase().includes(params.arrivalCity!.toLowerCase())
            );
          }

          // Apply sorting
          const sortBy = params.sortBy || 'price';
          const sortOrder = params.sortOrder || 'asc';
          
          filteredFlights.sort((a, b) => {
            let aValue: any, bValue: any;
            
            switch (sortBy) {
              case 'price':
                aValue = a.price.total;
                bValue = b.price.total;
                break;
              case 'duration':
                aValue = a.duration;
                bValue = b.duration;
                break;
              case 'departure_time':
                aValue = new Date(a.departureTime).getTime();
                bValue = new Date(b.departureTime).getTime();
                break;
              case 'arrival_time':
                aValue = new Date(a.arrivalTime).getTime();
                bValue = new Date(b.arrivalTime).getTime();
                break;
              default:
                aValue = a.price.total;
                bValue = b.price.total;
            }
            
            if (sortOrder === 'asc') {
              return aValue - bValue;
            } else {
              return bValue - aValue;
            }
          });

          // Apply limit
          const limit = params.limit || 10;
          filteredFlights = filteredFlights.slice(0, limit);

          // Format results for display
          if (filteredFlights.length === 0) {
            return "No flights found matching your criteria. Try adjusting your search parameters.";
          }

          const results = filteredFlights.map(flight => {
            const departureTime = new Date(flight.departureTime).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              timeZoneName: 'short'
            });
            const arrivalTime = new Date(flight.arrivalTime).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              timeZoneName: 'short'
            });
            const duration = `${Math.floor(flight.duration / 60)}h ${flight.duration % 60}m`;
            
            return `✈️ **${flight.airline} ${flight.flightNumber}**
📍 ${flight.departure.airportCode} → ${flight.arrival.airportCode}
🕐 ${departureTime} - ${arrivalTime} (${duration})
💰 $${flight.price.total} ${flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
🛫 ${flight.aircraft.type}
💺 ${flight.class.charAt(0).toUpperCase() + flight.class.slice(1)} Class
🎒 ${flight.baggage.checked} checked bag${flight.baggage.checked > 1 ? 's' : ''} included
${flight.amenities.length > 0 ? `✨ ${flight.amenities.join(', ')}` : ''}
---`;
          }).join('\n\n');

          const finalResult = `Found ${filteredFlights.length} flight${filteredFlights.length > 1 ? 's' : ''}:\n\n${results}`;
          console.log('Tool execution result:', finalResult);
          return finalResult;
        },
      },
    },
  });

  return result.toDataStreamResponse();
}
