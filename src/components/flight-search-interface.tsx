"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plane, Search, Clock, DollarSign, MapPin, Loader2, Sparkles, Zap, TrendingUp } from "lucide-react"

interface FlightResult {
  id: string
  airline: string
  departure: string
  arrival: string
  departureTime: string
  arrivalTime: string
  duration: string
  price: number
  stops: number
}

export default function FlightSearchInterface() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<FlightResult[]>([])
  const [filters, setFilters] = useState({
    maxPrice: "",
    airline: "",
    stops: "",
    duration: "",
  })

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsSearching(true)
    setSearchResults([])

    // Simulate AI search with loading states
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock flight results
    const mockResults: FlightResult[] = [
      {
        id: "1",
        airline: "United Airlines",
        departure: "SFO",
        arrival: "JFK",
        departureTime: "08:30 AM",
        arrivalTime: "05:15 PM",
        duration: "5h 45m",
        price: 299,
        stops: 0,
      },
      {
        id: "2",
        airline: "Delta Air Lines",
        departure: "SFO",
        arrival: "JFK",
        departureTime: "02:20 PM",
        arrivalTime: "11:05 PM",
        duration: "5h 45m",
        price: 324,
        stops: 0,
      },
      {
        id: "3",
        airline: "American Airlines",
        departure: "SFO",
        arrival: "JFK",
        departureTime: "11:45 AM",
        arrivalTime: "10:30 PM",
        duration: "7h 45m",
        price: 249,
        stops: 1,
      },
    ]

    setSearchResults(mockResults)
    setIsSearching(false)
  }

  const SearchingAnimation = () => (
    <div className="flex flex-col items-center justify-center py-20 space-y-8">
      <div className="relative">
        <div className="absolute inset-0 animate-ping">
          <div className="w-20 h-20 rounded-full bg-primary/20"></div>
        </div>
        <div className="relative w-20 h-20 rounded-full gradient-primary flex items-center justify-center">
          <Plane className="h-8 w-8 text-primary-foreground animate-pulse" />
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center animate-bounce">
          <Sparkles className="h-4 w-4 text-accent-foreground" />
        </div>
      </div>
      <div className="text-center space-y-3 max-w-md">
        <h3 className="text-2xl font-bold text-foreground">AI is finding your perfect flight</h3>
        <p className="text-muted-foreground text-lg">
          Analyzing millions of flight combinations across 500+ airlines...
        </p>
      </div>
      <div className="flex space-x-3">
        <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-3 h-3 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
      </div>
      <div className="w-full max-w-xs">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Searching...</span>
          <span>87%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div className="gradient-primary h-2 rounded-full animate-pulse" style={{ width: "87%" }}></div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background coffee-texture">
      <header className="glass-effect sticky top-0 z-50 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="p-3 gradient-primary rounded-2xl shadow-lg">
                  <Plane className="h-7 w-7 text-primary-foreground" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                  <Zap className="h-2.5 w-2.5 text-accent-foreground" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground tracking-tight">Flight AI Prototype</h1>
                <p className="text-sm text-muted-foreground font-medium">Artisanal Flight Discovery</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge
                variant="secondary"
                className="text-xs font-semibold px-3 py-1 bg-accent/20 text-accent-foreground border-accent/30"
              >
                <TrendingUp className="h-3 w-3 mr-1" />
                Live Pricing
              </Badge>
              <Badge
                variant="secondary"
                className="text-xs font-semibold px-3 py-1 border-primary/20"
                style={{
                  backgroundColor: "#6b4f4f",
                  color: "#ffffff",
                }}
              >
                Curated
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    

        <Card className="mb-12 shadow-2xl border-0 glass-effect overflow-hidden">
          <CardHeader className="pb-6">
            <CardTitle className="text-center text-2xl font-bold text-foreground">
              Where shall we take you today?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            <div className="flex gap-4">
              <div className="flex-1 relative group">
                <Input
                  placeholder="Find me the most comfortable flights from SFO to JFK in the next 30 days"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="text-lg py-7 pl-14 pr-6 border-2 border-border/50 focus:border-primary transition-all duration-300 rounded-2xl bg-background/50 backdrop-blur-sm group-hover:border-primary/50"
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
              <Button
                onClick={handleSearch}
                disabled={!query.trim() || isSearching}
                className="px-10 py-7 text-lg font-bold rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:scale-100 relative z-20 border-0"
                style={{
                  backgroundColor: "#6b4f4f",
                  color: "#ffffff",
                  border: "none",
                  backgroundImage: "none",
                }}
              >
                {isSearching ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-5 w-5 animate-spin" style={{ color: "#ffffff" }} />
                    <span style={{ color: "#ffffff" }}>Searching</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5" style={{ color: "#ffffff" }} />
                    <span style={{ color: "#ffffff" }}>Discover Flights</span>
                  </div>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-border/50">
              <Select value={filters.maxPrice} onValueChange={(value) => setFilters({ ...filters, maxPrice: value })}>
                <SelectTrigger className="h-14 rounded-xl border-border/50 hover:border-primary/50 transition-colors bg-background/50 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <DollarSign className="h-4 w-4 text-primary" />
                    </div>
                    <SelectValue placeholder="Budget" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="200">Under $200</SelectItem>
                  <SelectItem value="300">Under $300</SelectItem>
                  <SelectItem value="500">Under $500</SelectItem>
                  <SelectItem value="1000">Under $1000</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.airline} onValueChange={(value) => setFilters({ ...filters, airline: value })}>
                <SelectTrigger className="h-14 rounded-xl border-border/50 hover:border-primary/50 transition-colors bg-background/50 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Plane className="h-4 w-4 text-accent" />
                    </div>
                    <SelectValue placeholder="Carrier" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="united">United Airlines</SelectItem>
                  <SelectItem value="delta">Delta Air Lines</SelectItem>
                  <SelectItem value="american">American Airlines</SelectItem>
                  <SelectItem value="southwest">Southwest</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.stops} onValueChange={(value) => setFilters({ ...filters, stops: value })}>
                <SelectTrigger className="h-14 rounded-xl border-border/50 hover:border-primary/50 transition-colors bg-background/50 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <SelectValue placeholder="Journey" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Direct</SelectItem>
                  <SelectItem value="1">1 Connection</SelectItem>
                  <SelectItem value="2">2+ Connections</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.duration} onValueChange={(value) => setFilters({ ...filters, duration: value })}>
                <SelectTrigger className="h-14 rounded-xl border-border/50 hover:border-primary/50 transition-colors bg-background/50 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Clock className="h-4 w-4 text-accent" />
                    </div>
                    <SelectValue placeholder="Duration" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Under 4h</SelectItem>
                  <SelectItem value="medium">4h - 8h</SelectItem>
                  <SelectItem value="long">8h+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {isSearching && <SearchingAnimation />}

        {searchResults.length > 0 && !isSearching && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold text-foreground">Curated {searchResults.length} perfect journeys</h3>
              <Badge
                variant="secondary"
                className="text-sm font-semibold px-4 py-2 bg-accent/10 text-accent-foreground border-accent/20"
              >
                <Zap className="h-4 w-4 mr-1" />
                Handpicked
              </Badge>
            </div>
            {searchResults.map((flight) => (
              <Card
                key={flight.id}
                className="glass-effect hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden group hover:scale-[1.02]"
              >
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-foreground mb-1">{flight.departureTime}</p>
                        <p className="text-sm text-muted-foreground font-semibold tracking-wider">{flight.departure}</p>
                      </div>

                      <div className="flex flex-col items-center space-y-2">
                        <p className="text-sm text-muted-foreground font-medium">{flight.duration}</p>
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-primary rounded-full shadow-lg"></div>
                          <div className="w-20 h-0.5 bg-gradient-to-r from-primary to-accent"></div>
                          {flight.stops > 0 && <div className="w-2 h-2 bg-accent rounded-full"></div>}
                          <div className="w-20 h-0.5 bg-gradient-to-r from-accent to-primary"></div>
                          <div className="w-3 h-3 bg-primary rounded-full shadow-lg"></div>
                        </div>
                        <Badge variant="secondary" className="text-xs font-medium bg-muted text-muted-foreground">
                          {flight.stops === 0 ? "Direct" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
                        </Badge>
                      </div>

                      <div className="text-center">
                        <p className="text-3xl font-bold text-foreground mb-1">{flight.arrivalTime}</p>
                        <p className="text-sm text-muted-foreground font-semibold tracking-wider">{flight.arrival}</p>
                      </div>
                    </div>

                    <div className="text-right space-y-4">
                      <div>
                        <p className="text-4xl font-bold text-foreground">${flight.price}</p>
                        <p className="text-sm text-muted-foreground font-medium">{flight.airline}</p>
                      </div>
                      <Button
                        className="w-full hover:shadow-lg hover:scale-105 transition-all duration-300 py-3 px-8 rounded-xl font-bold relative z-20 border-0"
                        style={{
                          backgroundColor: "#6b4f4f",
                          color: "#ffffff",
                          border: "none",
                          backgroundImage: "none",
                        }}
                      >
                        <span style={{ color: "#ffffff" }}>Reserve Journey</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isSearching && searchResults.length === 0 && query === "" && (
          <div className="text-center py-20">
            <div className="mb-8">
              <div className="relative inline-flex">
            

              </div>
            </div>
            
          </div>
        )}
      </main>
    </div>
  )
}
