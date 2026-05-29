import { BookingPanel } from "@/components/ride/BookingPanel";
import { MapCanvas } from "@/components/map/MapCanvas";

export default function RiderHomePage() {
  return (
    <div className="grid lg:grid-cols-[420px_1fr] gap-5 h-[calc(100vh-7rem)]">
      <BookingPanel />
      <MapCanvas className="h-full min-h-[640px]" />
    </div>
  );
}
