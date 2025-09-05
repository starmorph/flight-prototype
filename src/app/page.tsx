import Chat from "@/components/chat";
import FlightSearchInterface from "@/components/flight-search-interface";

export default function Home() {
  return (
    <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden pb-10 flex-col">
      <Chat />
      {/* <FlightSearchInterface/> */}
    </div>
  );
}
