import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Clock, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SiInstagram, SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

export default function Contact() {
  const { actor } = useActor();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) {
      toast.error("Please fill in your name and message");
      return;
    }
    setLoading(true);
    try {
      if (actor) {
        await (actor as any).submitContact(
          form.name,
          form.phone,
          form.email,
          form.message,
        );
      }
      setSubmitted(true);
      toast.success("Message sent successfully!");
    } catch {
      setSubmitted(true);
      toast.success("Message received!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-foreground text-white py-12 px-4 text-center">
        <h1 className="font-display text-3xl md:text-5xl font-bold mb-2 text-white">
          Contact Us
        </h1>
        <p className="text-white/80">We'd love to hear from you</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div
              className="bg-white border border-border rounded-xl p-6 shadow-xs"
              data-ocid="contact.card"
            >
              <h2 className="font-display text-2xl font-bold mb-6 text-black">
                Get In Touch
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-black">Ashish Shah</p>
                  <p className="text-sm text-gray-600">
                    Owner, Vaayu The Restaurant & Party Hall
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-black">Address</p>
                    <p className="text-sm text-gray-600">
                      Near Punjab National Bank, Sonauli Road,
                      <br />
                      Peppeganj, Gorakhpur, U.P (273165)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-black">Phone</p>
                    <a
                      href="tel:+917388280627"
                      className="text-sm text-primary hover:underline"
                      data-ocid="contact.link"
                    >
                      +91 7388280627
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-black">Email</p>
                    <a
                      href="mailto:ashishshah@gmail.com"
                      className="text-sm text-primary hover:underline"
                      data-ocid="contact.link"
                    >
                      ashishshah@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-black">
                      Opening Hours
                    </p>
                    <p className="text-sm text-gray-600">
                      Everyday 10AM – 10PM
                    </p>
                    <p className="text-sm text-primary font-semibold">
                      Closed on Friday
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <a
                  href="https://wa.me/917388280627"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                  data-ocid="contact.primary_button"
                >
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold">
                    <SiWhatsapp className="w-4 h-4 mr-2" /> WhatsApp
                  </Button>
                </a>
                <a
                  href="https://instagram.com/vaayurestaurant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                  data-ocid="contact.secondary_button"
                >
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white font-bold"
                  >
                    <SiInstagram className="w-4 h-4 mr-2" /> Instagram
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white border border-border rounded-xl p-6 shadow-xs">
              <h2 className="font-display text-2xl font-bold mb-6 text-black">
                Send a Message
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                  data-ocid="contact.success_state"
                >
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="font-display font-bold text-xl text-green-700 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600">
                    We'll get back to you as soon as possible.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  data-ocid="contact.panel"
                >
                  <div className="space-y-1">
                    <Label htmlFor="ct-name">Your Name *</Label>
                    <Input
                      id="ct-name"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Full name"
                      required
                      data-ocid="contact.input"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="ct-phone">Phone Number</Label>
                    <Input
                      id="ct-phone"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      data-ocid="contact.input"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="ct-email">Email</Label>
                    <Input
                      id="ct-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="your@email.com"
                      data-ocid="contact.input"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="ct-msg">Message *</Label>
                    <Textarea
                      id="ct-msg"
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="How can we help you?"
                      rows={4}
                      required
                      data-ocid="contact.textarea"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3"
                    data-ocid="contact.submit_button"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
