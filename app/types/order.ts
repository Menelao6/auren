export interface Order {
  id: string;
  user_id: string | null;
  status: 'pending' | 'paid' | 'failed' | 'fulfilled' | 'cancelled' | 'refunded';
  currency: string;
  subtotal_cents: number;
  discount_total_cents: number;
  shipping_cost_cents: number;
  tax_cents: number;
  total_cents: number;
  customer_email: string;
  ship_name: string;
  ship_phone: string | null;
  ship_address1: string;
  ship_address2: string | null;
  ship_city: string;
  ship_state: string;
  ship_zip: string;
  ship_country: string;
  paypal_order_id: string | null;
  paypal_capture_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  title_snapshot: string;
  unit_price_cents_snapshot: number;
  discount_percent_snapshot: number;
  qty: number;
  image_url_snapshot: string | null;
  category_snapshot: string | null;
  created_at: string;
}

export interface ShippingInfo {
  name: string;
  phone?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface CheckoutData {
  email: string;
  shipping: ShippingInfo;
}
