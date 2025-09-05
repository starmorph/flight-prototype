'use client';

import { Card } from "@/components/ui/card"
import { useChat } from 'ai/react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IconArrowUp } from '@/components/ui/icons';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plane, Search, Clock, DollarSign, MapPin, Sparkles, Zap, TrendingUp } from "lucide-react";
import  Link from "next/link";
import AboutCard from "@/components/cards/aboutcard";
export const maxDuration = 30;

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
  });
  
  const [filters, setFilters] = useState({
    maxPrice: "",
    airline: "",
    stops: "",
    duration: "",
  });

  // Debug logging
  console.log('Current messages:', messages);
  
  return (    
    <div className="group w-full overflow-auto ">
      {messages.length === 0 ? (
        <AboutCard />
      ) : (
        <div className="max-w-xl mx-auto mt-10 mb-24">
          {messages.map((message, index) => (
            <div key={index} className="whitespace-pre-wrap flex mb-5">
              <div className={`${message.role === 'user' ? 'bg-slate-200 ml-auto' : 'bg-transparent'} p-2 rounded-lg`}>
                {message.content as string}
                {message.toolInvocations && message.toolInvocations.map((toolInvocation, toolIndex) => (
                  <div key={toolIndex} className="mt-2 p-2 bg-gray-100 rounded">
                    {/* Tool invocation result will be displayed here when available */}
                    <div className="text-sm text-gray-600">Tool executed: {toolInvocation.toolName || 'Unknown tool'}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="fixed inset-x-0 bottom-10 w-full ">
        <div className="w-full max-w-4xl mx-auto px-4">
          {/* Flight Search Filters */}
          <div className="mb-4">
            <Card className="p-4 shadow-lg border-0 glass-effect">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="p-2 gradient-primary rounded-xl shadow-lg">
                      <Plane className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full flex items-center justify-center">
                      <Zap className="h-2 w-2 text-accent-foreground" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Flight Preferences</h3>
                    <p className="text-xs text-muted-foreground">Customize your search</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="secondary"
                    className="text-xs font-semibold px-2 py-1 bg-accent/20 text-accent-foreground border-accent/30"
                  >
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Live
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Select value={filters.maxPrice} onValueChange={(value) => setFilters({ ...filters, maxPrice: value })}>
                  <SelectTrigger className="h-12 rounded-xl border-border/50 hover:border-primary/50 transition-colors bg-background/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-primary/10 rounded-lg">
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
                  <SelectTrigger className="h-12 rounded-xl border-border/50 hover:border-primary/50 transition-colors bg-background/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-accent/10 rounded-lg">
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
                  <SelectTrigger className="h-12 rounded-xl border-border/50 hover:border-primary/50 transition-colors bg-background/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-primary/10 rounded-lg">
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
                  <SelectTrigger className="h-12 rounded-xl border-border/50 hover:border-primary/50 transition-colors bg-background/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-accent/10 rounded-lg">
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
            </Card>
          </div>

          {/* Chat Input */}
          <Card className="p-2">
            <form onSubmit={handleSubmit}>
              <div className="flex">
                <Input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  className="w-[95%] mr-2 border-0 ring-offset-0 focus-visible:ring-0 focus-visible:outline-none focus:outline-none focus:ring-0 ring-0 focus-visible:border-none border-transparent focus:border-transparent focus-visible:ring-none"
                  placeholder='Search for your ideal flight time, place, and any other details'
                />
                <Button disabled={!input.trim()}>
                  <IconArrowUp />
                </Button>
              </div>
              {messages.length > 1 && (
                <div className="text-center">
                  {/* <Link href="/genui" className="text-xs text-blue-400">Try GenUI and streaming components &rarr;</Link> */}
                </div>
              )}
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
