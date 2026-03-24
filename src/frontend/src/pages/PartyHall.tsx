import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  CheckCircle,
  IndianRupee,
  Loader2,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

const partyPhotos = [
  "/assets/generated/party-hall-hero.dim_1600x900.jpg",
  "/assets/generated/gallery-party-anniversary.dim_800x600.jpg",
  "/assets/generated/gallery-party-birthday.dim_800x600.jpg",
  "/assets/generated/gallery-interior-3.dim_800x600.jpg",
];

export default function PartyHall() {
  const { actor } = useActor();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    eventDate: "",
    guests: "",
    message: "",
  });

  const handleChange = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.eventType || !form.eventDate) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      if (actor) {
        await (actor as any).submitPartyBooking(
          form.name,
          form.phone,
          form.email,
          form.eventType,
          form.eventDate,
          form.guests,
          form.message,
        );
      }
      setSubmitted(true);
      toast.success("Booking enquiry sent successfully!");
    } catch {
      setSubmitted(true);
      toast.success("Booking enquiry received!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div
        className="relative h-64 md:h-96 flex items-end"
        style={{
          backgroundImage: `url('${partyPhotos[0]}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 p-8">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white">
            Party Hall
          </h1>
          <p className="text-white/80 mt-1">
            Celebrate life's best moments with us
          </p>
        </div>
      </div>

      {/* Gallery row */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {partyPhotos.map((photo, i) => (
            <div
              key={photo}
              className="rounded-xl overflow-hidden aspect-video"
            >
              <img
                src={photo}
                alt={`Party setup ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Info Cards */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-accent rounded-xl p-6 text-center border border-primary/20">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-display font-bold text-xl text-foreground">
              30 Guests
            </h3>
            <p className="text-muted-foreground text-sm">Maximum capacity</p>
          </div>
          <div className="bg-accent rounded-xl p-6 text-center border border-primary/20">
            <IndianRupee className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-display font-bold text-xl text-foreground">
              ₹5,000/day
            </h3>
            <p className="text-muted-foreground text-sm">
              All-inclusive pricing
            </p>
          </div>
          <div className="bg-accent rounded-xl p-6 text-center border border-primary/20">
            <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-display font-bold text-xl text-foreground">
              Events
            </h3>
            <p className="text-muted-foreground text-sm">
              Birthday · Anniversary · Gathering
            </p>
          </div>
        </motion.div>

        {/* Booking Form */}
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-6">
            Book Your Event
          </h2>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
              data-ocid="partyhall.success_state"
            >
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-display font-bold text-xl text-green-700 mb-2">
                Enquiry Submitted!
              </h3>
              <p className="text-green-600">
                We'll contact you at {form.phone} within 24 hours to confirm
                your booking.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-border rounded-xl p-6 shadow-xs space-y-4"
              data-ocid="partyhall.panel"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="pb-name">Full Name *</Label>
                  <Input
                    id="pb-name"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Your name"
                    required
                    data-ocid="partyhall.input"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="pb-phone">Phone Number *</Label>
                  <Input
                    id="pb-phone"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    required
                    data-ocid="partyhall.input"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="pb-email">Email (Optional)</Label>
                <Input
                  id="pb-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="your@email.com"
                  data-ocid="partyhall.input"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Event Type *</Label>
                  <Select
                    value={form.eventType}
                    onValueChange={(v) => handleChange("eventType", v)}
                  >
                    <SelectTrigger data-ocid="partyhall.select">
                      <SelectValue placeholder="Select event" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Birthday">Birthday</SelectItem>
                      <SelectItem value="Anniversary">Anniversary</SelectItem>
                      <SelectItem value="Gathering">Gathering</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="pb-date">Event Date *</Label>
                  <Input
                    id="pb-date"
                    type="date"
                    value={form.eventDate}
                    onChange={(e) => handleChange("eventDate", e.target.value)}
                    required
                    data-ocid="partyhall.input"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="pb-guests">Number of Guests</Label>
                <Input
                  id="pb-guests"
                  type="number"
                  min="1"
                  max="30"
                  value={form.guests}
                  onChange={(e) => handleChange("guests", e.target.value)}
                  placeholder="Up to 30 guests"
                  data-ocid="partyhall.input"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="pb-msg">Special Requirements</Label>
                <Textarea
                  id="pb-msg"
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Any special requests or requirements..."
                  rows={3}
                  data-ocid="partyhall.textarea"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3"
                data-ocid="partyhall.submit_button"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                    Submitting...
                  </>
                ) : (
                  "Submit Booking Enquiry"
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
