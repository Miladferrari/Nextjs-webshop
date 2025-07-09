interface WooCommerceConfig {
  baseUrl: string;
  consumerKey: string;
  consumerSecret: string;
}

const config: WooCommerceConfig = {
  baseUrl: 'https://wordpress.restaurantmahzen.nl/wp-json/wc/v3',
  consumerKey: 'ck_6611c9935688b973c536fc2633565cdb1dda0262',
  consumerSecret: 'cs_b4b55890e3a947bb72305f80e304690e835820e0'
};

export interface Product {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  description: string;
  short_description: string;
  images: Array<{
    id: number;
    src: string;
    alt: string;
  }>;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  stock_status: string;
  stock_quantity: number | null;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image: {
    id: number;
    src: string;
    alt: string;
  } | null;
  count: number;
}

export interface Coupon {
  id: number;
  code: string;
  amount: string;
  discount_type: 'percent' | 'fixed_cart' | 'fixed_product';
  description: string;
  date_expires: string | null;
  usage_count: number;
  usage_limit: number | null;
  usage_limit_per_user: number | null;
  individual_use: boolean;
  product_ids: number[];
  excluded_product_ids: number[];
  minimum_amount: string;
  maximum_amount: string;
  email_restrictions: string[];
  used_by: string[];
}

// Cache implementation
class CacheManager {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly TTL = 5 * 60 * 1000; // 5 minutes

  set(key: string, data: any) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  get(key: string) {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > this.TTL;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  clear() {
    this.cache.clear();
  }
}

class WooCommerceAPI {
  private config: WooCommerceConfig;
  private cache = new CacheManager();

  constructor(config: WooCommerceConfig) {
    this.config = config;
  }

  private async fetchAPI<T>(endpoint: string, options?: RequestInit & { cache?: boolean }): Promise<T> {
    const cacheKey = `${endpoint}-${JSON.stringify(options || {})}`;
    const shouldCache = options?.cache !== false;

    // Check cache first
    if (shouldCache) {
      const cached = this.cache.get(cacheKey);
      if (cached) {
        return cached as T;
      }
    }

    const url = new URL(`${this.config.baseUrl}/${endpoint}`);
    
    const authString = `${this.config.consumerKey}:${this.config.consumerSecret}`;
    const encodedAuth = Buffer.from(authString).toString('base64');

    const response = await fetch(url.toString(), {
      ...options,
      headers: {
        'Authorization': `Basic ${encodedAuth}`,
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      // Next.js specific caching
      next: { 
        revalidate: 300 // Revalidate every 5 minutes
      }
    });

    if (!response.ok) {
      throw new Error(`WooCommerce API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Cache the response
    if (shouldCache) {
      this.cache.set(cacheKey, data);
    }

    return data;
  }

  async getProducts(params?: {
    per_page?: number;
    page?: number;
    orderby?: string;
    order?: 'asc' | 'desc';
    category?: string;
    include?: number[];
  }): Promise<Product[]> {
    const queryParams = new URLSearchParams();
    
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.orderby) queryParams.append('orderby', params.orderby);
    if (params?.order) queryParams.append('order', params.order);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.include) queryParams.append('include', params.include.join(','));

    const endpoint = `products${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    return this.fetchAPI<Product[]>(endpoint);
  }

  async getProduct(id: number): Promise<Product> {
    return this.fetchAPI<Product>(`products/${id}`);
  }

  async getCategories(params?: {
    per_page?: number;
    orderby?: string;
    order?: 'asc' | 'desc';
    hide_empty?: boolean;
  }): Promise<Category[]> {
    const queryParams = new URLSearchParams();
    
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params?.orderby) queryParams.append('orderby', params.orderby);
    if (params?.order) queryParams.append('order', params.order);
    if (params?.hide_empty !== undefined) queryParams.append('hide_empty', params.hide_empty.toString());

    const endpoint = `products/categories${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    return this.fetchAPI<Category[]>(endpoint);
  }

  async getCategory(id: number): Promise<Category> {
    return this.fetchAPI<Category>(`products/categories/${id}`);
  }

  async getProductsByCategory(categoryId: number, params?: {
    per_page?: number;
    page?: number;
    orderby?: string;
    order?: 'asc' | 'desc';
  }): Promise<Product[]> {
    const queryParams = new URLSearchParams();
    queryParams.append('category', categoryId.toString());
    
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.orderby) queryParams.append('orderby', params.orderby);
    if (params?.order) queryParams.append('order', params.order);

    const endpoint = `products?${queryParams.toString()}`;
    return this.fetchAPI<Product[]>(endpoint);
  }

  async searchProducts(search: string, params?: {
    per_page?: number;
    page?: number;
  }): Promise<Product[]> {
    const queryParams = new URLSearchParams();
    queryParams.append('search', search);
    
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params?.page) queryParams.append('page', params.page.toString());

    const endpoint = `products?${queryParams.toString()}`;
    return this.fetchAPI<Product[]>(endpoint, { cache: false }); // Don't cache search results
  }

  async createOrder(orderData: any): Promise<any> {
    return this.fetchAPI('orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
      cache: false
    });
  }

  async getCouponByCode(code: string): Promise<Coupon | null> {
    try {
      // WooCommerce API requires searching coupons by code
      const endpoint = `coupons?code=${encodeURIComponent(code)}`;
      const coupons = await this.fetchAPI<Coupon[]>(endpoint, { cache: false });
      
      // Return the first matching coupon or null if not found
      return coupons.length > 0 ? coupons[0] : null;
    } catch (error) {
      console.error('Error fetching coupon:', error);
      return null;
    }
  }

  async validateCoupon(code: string, cartTotal: number): Promise<{
    valid: boolean;
    coupon?: Coupon;
    error?: string;
  }> {
    try {
      const coupon = await this.getCouponByCode(code);
      
      if (!coupon) {
        return { valid: false, error: 'Ongeldige kortingscode' };
      }

      // Check if coupon is expired
      if (coupon.date_expires) {
        const expiryDate = new Date(coupon.date_expires);
        if (expiryDate < new Date()) {
          return { valid: false, error: 'Deze kortingscode is verlopen' };
        }
      }

      // Check usage limits
      if (coupon.usage_limit && coupon.usage_count >= coupon.usage_limit) {
        return { valid: false, error: 'Deze kortingscode is niet meer geldig' };
      }

      // Check minimum amount
      if (coupon.minimum_amount && cartTotal < parseFloat(coupon.minimum_amount)) {
        return { 
          valid: false, 
          error: `Minimaal bestelbedrag van €${coupon.minimum_amount} vereist` 
        };
      }

      // Check maximum amount
      if (coupon.maximum_amount && cartTotal > parseFloat(coupon.maximum_amount)) {
        return { 
          valid: false, 
          error: `Maximaal bestelbedrag van €${coupon.maximum_amount} overschreden` 
        };
      }

      return { valid: true, coupon };
    } catch (error) {
      console.error('Error validating coupon:', error);
      return { valid: false, error: 'Er is een fout opgetreden' };
    }
  }

  clearCache() {
    this.cache.clear();
  }
}

export const woocommerce = new WooCommerceAPI(config);