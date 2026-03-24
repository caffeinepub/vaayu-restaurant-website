import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle,
  Loader2,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  Wallet,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "../contexts/CartContext";
import { useActor } from "../hooks/useActor";

type Step = "cart" | "details" | "confirmation";

interface OrderDetails {
  name: string;
  phone: string;
  address: string;
  pincode: string;
}

interface ConfirmedOrder {
  orderId: number;
  details: OrderDetails;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  time: string;
}

export default function Order() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, clearCart, totalAmount } =
    useCart();
  const { actor } = useActor();
  const [step, setStep] = useState<Step>("cart");
  const [loading, setLoading] = useState(false);
  const [pincodeError, setPincodeError] = useState("");
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(
    null,
  );
  const [details, setDetails] = useState<OrderDetails>({
    name: "",
    phone: "",
    address: "",
    pincode: "",
  });

  const handleDetailChange = (field: keyof OrderDetails, value: string) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
    if (field === "pincode") setPincodeError("");
  };

  const validateAndProceed = () => {
    if (
      !details.name ||
      !details.phone ||
      !details.address ||
      !details.pincode
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    if (details.pincode !== "273165") {
      setPincodeError(
        "Sorry, we currently deliver only in Peppeganj, Gorakhpur (PIN: 273165)",
      );
      return;
    }
    handlePlaceOrder();
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      let orderId = Math.floor(1000 + Math.random() * 9000);

      if (actor) {
        try {
          const backendItems = items.map((item) => ({
            itemId: BigInt(item.itemId),
            name: item.name,
            quantity: BigInt(item.quantity),
            price: BigInt(item.price),
          }));
          const result = await (actor as any).placeOrder(
            details.name,
            details.phone,
            details.address,
            details.pincode,
            backendItems,
            BigInt(totalAmount),
          );
          if (result) orderId = Number(result);
        } catch {
          // use generated orderId
        }
      }

      const orderTime = new Date().toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      const orderItemsSnap = items.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        price: i.price,
      }));

      setConfirmedOrder({
        orderId,
        details,
        items: orderItemsSnap,
        total: totalAmount,
        time: orderTime,
      });

      // Build WhatsApp message
      const itemLines = orderItemsSnap
        .map((i) => `• ${i.name} x${i.quantity} = ₹${i.price * i.quantity}`)
        .join("\n");

      const waMessage = `🔔 NEW ORDER #${orderId}

Customer: ${details.name}
Phone: ${details.phone}
Address: ${details.address}
Pincode: ${details.pincode}

ORDER ITEMS:
${itemLines}

TOTAL: ₹${totalAmount}
Payment: Cash on Delivery

Time: ${orderTime}`;

      // Email notification
      const emailSubject = encodeURIComponent(
        `New Order #${orderId} - ${details.name}`,
      );
      const emailBody = encodeURIComponent(waMessage);
      window.open(
        `mailto:ashishshah@gmail.com?subject=${emailSubject}&body=${emailBody}`,
        "_blank",
      );

      // WhatsApp notification
      setTimeout(() => {
        window.open(
          `https://wa.me/917388280627?text=${encodeURIComponent(waMessage)}`,
          "_blank",
        );
      }, 500);

      clearCart();
      setStep("confirmation");
      toast.success("Order placed successfully!");
    } catch {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-foreground text-white py-12 px-4 text-center">
        <h1 className="font-display text-3xl md:text-5xl font-bold mb-2">
          Your Order
        </h1>
        {step !== "confirmation" && (
          <div className="flex justify-center gap-6 mt-4">
            {(["cart", "details", "confirmation"] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                    step === s
                      ? "bg-primary border-primary text-white"
                      : i < ["cart", "details", "confirmation"].indexOf(step)
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-white/40 text-white/40"
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={`text-xs font-medium capitalize hidden sm:block ${
                    step === s ? "text-white" : "text-white/40"
                  }`}
                >
                  {s === "cart"
                    ? "Cart"
                    : s === "details"
                      ? "Delivery"
                      : "Confirm"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* STEP 1: Cart */}
          {step === "cart" && (
            <motion.div
              key="cart"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {items.length === 0 ? (
                <div
                  className="text-center py-20"
                  data-ocid="order.empty_state"
                >
                  <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h2 className="font-display text-2xl font-bold mb-2">
                    Your cart is empty
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Add some delicious items from our menu!
                  </p>
                  <Button
                    className="bg-primary hover:bg-primary/90 text-white font-bold"
                    onClick={() => navigate({ to: "/menu" })}
                    data-ocid="order.primary_button"
                  >
                    Browse Menu
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <h2 className="font-display text-xl font-bold">
                    Cart Review
                  </h2>
                  <div
                    className="bg-white border border-border rounded-xl overflow-hidden"
                    data-ocid="order.table"
                  >
                    {items.map((item, i) => (
                      <div
                        key={item.id}
                        className={`flex items-center gap-3 p-4 ${
                          i < items.length - 1 ? "border-b border-border" : ""
                        }`}
                        data-ocid={`order.item.${i + 1}`}
                      >
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            ₹{item.price} each
                          </p>
                        </div>
                        <div className="flex items-center border border-border rounded-lg overflow-hidden">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="px-2 py-1 hover:bg-muted transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 py-1 text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-2 py-1 hover:bg-muted transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="font-bold text-primary w-16 text-right text-sm">
                          ₹{item.price * item.quantity}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          data-ocid={`order.delete_button.${i + 1}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="bg-accent border border-primary/20 rounded-xl p-4 flex justify-between items-center">
                    <span className="font-display font-bold text-lg">
                      Order Total
                    </span>
                    <span className="font-display font-bold text-2xl text-primary">
                      ₹{totalAmount}
                    </span>
                  </div>

                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3"
                    onClick={() => setStep("details")}
                    data-ocid="order.primary_button"
                  >
                    Proceed to Delivery Details
                  </Button>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 2: Delivery Details */}
          {step === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <button
                type="button"
                onClick={() => setStep("cart")}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                data-ocid="order.secondary_button"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Cart
              </button>

              <h2 className="font-display text-xl font-bold">
                Delivery Details
              </h2>

              <div
                className="bg-white border border-border rounded-xl p-5 space-y-4"
                data-ocid="order.panel"
              >
                <div className="space-y-1">
                  <Label htmlFor="od-name">Full Name *</Label>
                  <Input
                    id="od-name"
                    value={details.name}
                    onChange={(e) => handleDetailChange("name", e.target.value)}
                    placeholder="Your full name"
                    data-ocid="order.input"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="od-phone">Phone Number *</Label>
                  <Input
                    id="od-phone"
                    value={details.phone}
                    onChange={(e) =>
                      handleDetailChange("phone", e.target.value)
                    }
                    placeholder="+91 XXXXX XXXXX"
                    data-ocid="order.input"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="od-address">Full Delivery Address *</Label>
                  <Input
                    id="od-address"
                    value={details.address}
                    onChange={(e) =>
                      handleDetailChange("address", e.target.value)
                    }
                    placeholder="House no., street, area..."
                    data-ocid="order.input"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="od-pin">Pincode *</Label>
                  <Input
                    id="od-pin"
                    value={details.pincode}
                    onChange={(e) =>
                      handleDetailChange("pincode", e.target.value)
                    }
                    placeholder="273165"
                    data-ocid="order.input"
                  />
                  {pincodeError && (
                    <p
                      className="text-xs text-destructive mt-1"
                      data-ocid="order.error_state"
                    >
                      {pincodeError}
                    </p>
                  )}
                </div>
              </div>

              {/* Payment - COD only */}
              <div>
                <h3 className="font-display font-semibold text-base mb-3">
                  Payment Method
                </h3>
                <div
                  className="bg-white border-2 border-primary rounded-xl p-4 flex items-center gap-3"
                  data-ocid="order.panel"
                >
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">
                      Cash on Delivery (COD)
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Pay when your order arrives at your doorstep
                    </p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="font-display font-bold text-lg">Total</span>
                <span className="font-display font-bold text-2xl text-primary">
                  ₹{totalAmount}
                </span>
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3"
                onClick={validateAndProceed}
                disabled={loading}
                data-ocid="order.submit_button"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Placing
                    Order...
                  </>
                ) : (
                  "Place Order (COD)"
                )}
              </Button>
            </motion.div>
          )}

          {/* STEP 3: Confirmation */}
          {step === "confirmation" && confirmedOrder && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-5"
              data-ocid="order.success_state"
            >
              <div className="text-center py-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                </motion.div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-1">
                  Thank You!
                </h2>
                <p className="text-muted-foreground">
                  Your order has been placed successfully.
                </p>
              </div>

              <div className="bg-white border border-border rounded-xl overflow-hidden shadow-xs">
                <div className="bg-primary text-white px-5 py-3">
                  <p className="font-display font-bold text-lg">
                    Order #{confirmedOrder.orderId}
                  </p>
                  <p className="text-white/80 text-xs">{confirmedOrder.time}</p>
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">
                      Delivery To
                    </h4>
                    <p className="font-semibold">
                      {confirmedOrder.details.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {confirmedOrder.details.phone}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {confirmedOrder.details.address}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Gorakhpur, U.P — {confirmedOrder.details.pincode}
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">
                      Order Items
                    </h4>
                    <div className="space-y-2">
                      {confirmedOrder.items.map((item, idx) => (
                        <div
                          key={item.name}
                          className="flex justify-between text-sm"
                          data-ocid={`order.item.${idx + 1}`}
                        >
                          <span>
                            {item.name}{" "}
                            <span className="text-muted-foreground">
                              x{item.quantity}
                            </span>
                          </span>
                          <span className="font-semibold">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between">
                    <span className="font-display font-bold">Total Amount</span>
                    <span className="font-display font-bold text-primary text-xl">
                      ₹{confirmedOrder.total}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3">
                    <Wallet className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-700 font-medium">
                      Cash on Delivery
                    </span>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-center">
                    <p className="text-sm font-semibold text-primary">
                      🚴 Your order will reach you in{" "}
                      <strong>30–45 minutes</strong> at your doorstep!
                    </p>
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold"
                onClick={() => navigate({ to: "/menu" })}
                data-ocid="order.primary_button"
              >
                Order More
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
