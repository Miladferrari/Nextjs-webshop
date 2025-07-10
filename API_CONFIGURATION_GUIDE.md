# API Configuration Guide

## Current API Locations

Your WooCommerce API credentials are stored in two places:

### 1. General WooCommerce API
**File:** `/lib/woocommerce.ts`
- Used for: Products, Categories, Orders
- Current URL: `https://wordpress.restaurantmahzen.nl/wp-json/wc/v3`

### 2. Coupon Validation API  
**File:** `/app/api/coupons/validate/route.ts`
- Used for: Coupon validation only
- Current URL: Same as general API

## How to Switch to Another WordPress Backend

### Method 1: Direct Edit (Quick)

1. **Edit General API:**
   ```typescript
   // /lib/woocommerce.ts
   const config: WooCommerceConfig = {
     baseUrl: 'https://YOUR-NEW-SITE.com/wp-json/wc/v3',
     consumerKey: 'ck_YOUR_NEW_KEY',
     consumerSecret: 'cs_YOUR_NEW_SECRET'
   };
   ```

2. **Edit Coupon API:**
   ```typescript
   // /app/api/coupons/validate/route.ts
   const WOOCOMMERCE_URL = 'https://YOUR-NEW-SITE.com/wp-json/wc/v3';
   const CONSUMER_KEY = 'ck_YOUR_NEW_KEY';
   const CONSUMER_SECRET = 'cs_YOUR_NEW_SECRET';
   ```

### Method 2: Environment Variables (Recommended)

1. **Copy `.env.local.example` to `.env.local`**
2. **Fill in your credentials**
3. **Update the code files to use env variables:**

   ```typescript
   // /lib/woocommerce.ts
   const config: WooCommerceConfig = {
     baseUrl: process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || 'default-url',
     consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY || '',
     consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET || ''
   };
   ```

## Getting WooCommerce API Credentials

1. Log into your WordPress Admin
2. Go to: **WooCommerce → Settings → Advanced → REST API**
3. Click "Add key"
4. Set permissions to "Read/Write"
5. Copy the Consumer Key and Consumer Secret

## Why Two Different APIs?

You provided two sets of credentials:
- **General API**: For public data (products, categories)
- **Coupon API**: For sensitive operations (validation, discounts)

This separation allows you to:
- Use different permission levels
- Track usage separately
- Enhance security

## Testing Your New Backend

After changing credentials:
1. Clear Next.js cache: `rm -rf .next`
2. Restart the server: `npm run dev`
3. Test a product page
4. Test coupon validation

## Important Notes

- Both APIs must point to the same WooCommerce store
- API version must be v3 (`/wp-json/wc/v3`)
- HTTPS is required for production
- Keep credentials secure (use .env.local)