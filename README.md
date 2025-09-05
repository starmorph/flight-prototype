# AI-Powered Flight Search & Recommendation Tool

## 🚀 Demo Overview

This project showcases my ability to build production-ready, AI-enhanced applications as a fullstack software engineer. Built on top of Vercel's Next.js AI template, I've implemented a flight search tool function powered system with intelligent recommendations using natural language processing.

## ✈️ Flight Search System Features

### Core Functionality
- **Intelligent Flight Search**: Natural language queries processed by GPT-4 Turbo
- **Advanced Filtering**: Price, airline, stops, duration, cities, and more
- **Smart Sorting**: UI Design only - not functioning atm, out of scope of coding challenge 
- **Real-time Results**: Instant search results with streaming AI responses

### Search Capabilities
The AI-powered search tool supports complex queries like:
- *"Find me the cheapest direct flight to New York"*
- *"Show me United flights under $500 with one stop"*
- *"What are the shortest flights from SFO to JFK?"*
- *"Find business class flights departing after 2 PM"*

### Technical Implementation

#### Flight Data Structure
```typescript
interface Flight {
  id: string;
  airline: string;
  departure: { airport: string; airportCode: string; city: string; };
  arrival: { airport: string; airportCode: string; city: string; };
  price: { base: number; total: number; currency: string; };
  duration: number; // minutes
  stops: number;
  class: 'economy' | 'premium_economy' | 'business' | 'first';
  amenities: string[];
  // ... additional metadata
}
```

#### AI Tool Integration
The system uses Vercel's AI SDK with custom tool definitions:

```typescript
searchFlights: {
  description: 'Search flights based on various criteria',
  parameters: z.object({
    maxPrice: z.number().optional(),
    airline: z.string().optional(),
    maxStops: z.number().optional(),
    departureCity: z.string().optional(),
    arrivalCity: z.string().optional(),
    sortBy: z.enum(['price', 'duration', 'departure_time']).optional(),
    // ... more parameters
  }),
  execute: async (params) => {
    // Advanced filtering and sorting logic
    // Returns formatted flight results
  }
}
```

## 🛠 Technical Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Modern icon library

### Backend & AI
- **Vercel AI SDK** - AI integration and streaming
- **OpenAI GPT-4 Turbo** - Natural language processing
- **Zod** - Runtime type validation
- **Server Actions** - Type-safe server functions

### Architecture Highlights
- **Server-Side Rendering** - Optimal performance and SEO
- **API Routes** - RESTful endpoints for data handling
- **Streaming Responses** - Real-time AI interactions
- **Type Safety** - End-to-end TypeScript implementation

## 🎨 User Interface Features

### Modern Design System
- **Glass-morphism Effects** - Modern, translucent UI elements
- **Responsive Grid Layout** - Mobile-first design approach
- **Interactive Filters** - Dynamic search refinement
- **Loading States** - Smooth user experience during searches
- **Error Handling** - Graceful fallbacks and user feedback

### Search Interface
- **Natural Language Input** - Conversational search queries
- **Filter Presets** - Quick access to common search criteria
- **Real-time Results** - Instant feedback as you type
- **Detailed Flight Cards** - Comprehensive flight information display

## 📊 Flight Data Management

### Data Structure
- **Comprehensive Flight Database** - 50+ sample flights with realistic data
- **Multiple Airlines** - United, Delta, American, Southwest coverage
- **Route Variety** - Domestic and international destinations
- **Pricing Tiers** - Economy to First Class options

### Search Algorithm Features
- **Multi-criteria Filtering** - Price, airline, stops, duration, cities
- **Intelligent Sorting** - Multiple sort options with ascending/descending order
- **Fuzzy Matching** - Flexible city and airline name matching
- **Result Limiting** - Configurable result set sizes

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- OpenAI API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nextjs-ai-lite
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Add your OpenAI API key
   OPENAI_API_KEY=your_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 💡 Key Implementation Details

### AI Integration
- **Custom Tool Definition** - Sophisticated flight search function integrated with GPT-4
- **Parameter Validation** - Zod schemas ensure type safety and data integrity
- **Streaming Responses** - Real-time AI responses for better UX
- **Error Handling** - Robust error management and user feedback

### Performance Optimizations
- **Server-Side Processing** - Flight filtering happens on the server
- **Efficient Data Structures** - Optimized search algorithms
- **Minimal Bundle Size** - Tree-shaking and code splitting
- **Fast Refresh** - Instant development feedback

### Code Quality
- **TypeScript Strict Mode** - Maximum type safety
- **ESLint Configuration** - Code quality enforcement
- **Component Architecture** - Reusable, maintainable components
- **Separation of Concerns** - Clear data/logic/presentation layers

## 🔧 Customization & Extension

### Adding New Airlines
1. Update the flight data in `src/data/flights.json`
2. Extend the airline filter options in the UI components
3. Update search algorithm if needed

### Enhancing Search Features
1. Modify the `searchFlights` tool parameters in `src/app/api/chat/route.ts`
2. Update the filtering logic to handle new criteria
3. Extend the UI to expose new search options

## 📈 Future Enhancements

- **Real-time Pricing** - Integration with live flight APIs
- **User Preferences** - Saved searches and personalized recommendations
- **Booking Integration** - Direct booking functionality
- **Advanced Analytics** - Search pattern analysis and optimization
- **Mobile App** - React Native companion application

