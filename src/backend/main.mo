import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Time "mo:base/Time";

actor {

  // ---- Types ----

  public type OrderItem = {
    itemId: Nat;
    name: Text;
    quantity: Nat;
    price: Nat;
  };

  public type Order = {
    id: Nat;
    customerName: Text;
    customerPhone: Text;
    customerAddress: Text;
    pincode: Text;
    items: [OrderItem];
    totalAmount: Nat;
    timestamp: Int;
  };

  public type PartyBooking = {
    id: Nat;
    name: Text;
    phone: Text;
    email: Text;
    eventType: Text;
    eventDate: Text;
    guestCount: Text;
    message: Text;
    timestamp: Int;
  };

  public type ContactMsg = {
    id: Nat;
    name: Text;
    phone: Text;
    email: Text;
    message: Text;
    timestamp: Int;
  };

  // ---- State ----

  stable var orders: [Order] = [];
  stable var nextOrderId: Nat = 1;

  stable var partyBookings: [PartyBooking] = [];
  stable var nextBookingId: Nat = 1;

  stable var contactMsgs: [ContactMsg] = [];
  stable var nextContactId: Nat = 1;

  // ---- Orders ----

  public func placeOrder(
    customerName: Text,
    customerPhone: Text,
    customerAddress: Text,
    pincode: Text,
    items: [OrderItem],
    totalAmount: Nat
  ) : async Nat {
    let id = nextOrderId;
    nextOrderId += 1;
    let order: Order = {
      id;
      customerName;
      customerPhone;
      customerAddress;
      pincode;
      items;
      totalAmount;
      timestamp = Time.now();
    };
    orders := Array.append(orders, [order]);
    id
  };

  public query func getOrders() : async [Order] {
    orders
  };

  public query func getOrder(id: Nat) : async ?Order {
    Array.find<Order>(orders, func(o) { o.id == id })
  };

  // ---- Party Bookings ----

  public func submitPartyBooking(
    name: Text,
    phone: Text,
    email: Text,
    eventType: Text,
    eventDate: Text,
    guestCount: Text,
    message: Text
  ) : async Nat {
    let id = nextBookingId;
    nextBookingId += 1;
    let booking: PartyBooking = {
      id; name; phone; email; eventType; eventDate; guestCount; message;
      timestamp = Time.now();
    };
    partyBookings := Array.append(partyBookings, [booking]);
    id
  };

  public query func getPartyBookings() : async [PartyBooking] {
    partyBookings
  };

  // ---- Contact ----

  public func submitContact(
    name: Text,
    phone: Text,
    email: Text,
    message: Text
  ) : async Nat {
    let id = nextContactId;
    nextContactId += 1;
    let msg: ContactMsg = {
      id; name; phone; email; message;
      timestamp = Time.now();
    };
    contactMsgs := Array.append(contactMsgs, [msg]);
    id
  };

  public query func getContactMsgs() : async [ContactMsg] {
    contactMsgs
  };

};
