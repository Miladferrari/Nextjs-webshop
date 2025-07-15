import { NextRequest, NextResponse } from "next/server";

// WooCommerce REST API credentials (these should be in environment variables)
const WC_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  "https://your-wordpress-site.com";
const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY || "";
const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || "";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency, customer, items, coupon, shipping } = body;

    // Create a pending order in WooCommerce first
    const orderData = {
      payment_method: "woocommerce_payments",
      payment_method_title: "Card Payment",
      set_paid: false,
      billing: {
        first_name: customer.firstName,
        last_name: customer.lastName,
        address_1: customer.address,
        address_2: "",
        city: customer.city,
        state: "",
        postcode: customer.postalCode,
        country: customer.country,
        email: customer.email,
        phone: customer.phone,
      },
      shipping: {
        first_name: customer.shipping_same
          ? customer.firstName
          : customer.shippingFirstName,
        last_name: customer.shipping_same
          ? customer.lastName
          : customer.shippingLastName,
        address_1: customer.shipping_same
          ? customer.address
          : customer.shippingAddress,
        address_2: "",
        city: customer.shipping_same ? customer.city : customer.shippingCity,
        state: "",
        postcode: customer.shipping_same
          ? customer.postalCode
          : customer.shippingPostalCode,
        country: customer.shipping_same
          ? customer.country
          : customer.shippingCountry,
      },
      line_items: items.map((item: any) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
      shipping_lines: [
        {
          method_id:
            shipping.method === "express" ? "flat_rate:2" : "flat_rate:1",
          method_title:
            shipping.method === "express"
              ? "Express verzending"
              : "Standaard verzending",
          total: shipping.cost.toString(),
        },
      ],
      coupon_lines: coupon
        ? [
            {
              code: coupon.code,
            },
          ]
        : [],
    };

    // For development, use mock data
    if (
      process.env.NODE_ENV === "development" ||
      !WC_CONSUMER_KEY ||
      !WC_CONSUMER_SECRET
    ) {
      console.log("Using mock data for development");
      const mockOrderId = Date.now();

      return NextResponse.json({
        id: "pi_mock_" + mockOrderId,
        client_secret: "pi_mock_secret_" + mockOrderId,
        order_id: mockOrderId,
        amount: amount,
        currency: currency || "eur",
        status: "requires_payment_method",
      });
    }

    // Create order in WooCommerce (production only)
    const orderResponse = await fetch(`${WC_URL}/wp-json/wc/v3/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString(
            "base64"
          ),
      },
      body: JSON.stringify(orderData),
    });

    if (!orderResponse.ok) {
      const error = await orderResponse.text();
      console.error("WooCommerce order creation error:", error);
      throw new Error("Failed to create order");
    }

    const order = await orderResponse.json();

    // Create payment intent using WooCommerce Payments API
    const paymentIntentData = {
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency,
      order_id: order.id,
      customer_id: order.customer_id,
      payment_method_types: ["card"],
      capture_method: "automatic",
      metadata: {
        order_id: order.id,
        order_number: order.number,
      },
    };

    // Call WooCommerce Payments intent endpoint
    const intentResponse = await fetch(
      `${WC_URL}/wp-json/wc/v3/payments/create_intent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString(
              "base64"
            ),
        },
        body: JSON.stringify(paymentIntentData),
      }
    );

    if (!intentResponse.ok) {
      const error = await intentResponse.text();
      console.error("Payment intent creation error:", error);

      throw new Error("Failed to create payment intent: " + error);
    }

    const paymentIntent = await intentResponse.json();

    return NextResponse.json({
      id: paymentIntent.id,
      client_secret: paymentIntent.client_secret,
      order_id: order.id,
      amount: amount,
      currency: currency,
      status: paymentIntent.status,
    });
  } catch (error: any) {
    console.error("Payment intent creation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
