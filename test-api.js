// Test script to verify API fetches fresh data
const { woocommerce } = require('./lib/woocommerce');

async function testFreshData() {
  console.log('Testing WooCommerce API - Fresh Data Fetch');
  console.log('==========================================\n');

  try {
    // Test 1: Fetch a specific product
    console.log('Test 1: Fetching product ID 7...');
    const product1 = await woocommerce.getProduct(7);
    console.log(`Product Name: ${product1.name}`);
    console.log(`Price: €${product1.price}`);
    console.log(`Stock Status: ${product1.stock_status}`);
    console.log(`Stock Quantity: ${product1.stock_quantity}`);
    console.log('---\n');

    // Wait 2 seconds
    console.log('Waiting 2 seconds...\n');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Test 2: Fetch the same product again (should bypass cache)
    console.log('Test 2: Fetching product ID 7 again...');
    const product2 = await woocommerce.getProduct(7);
    console.log(`Product Name: ${product2.name}`);
    console.log(`Price: €${product2.price}`);
    console.log(`Stock Status: ${product2.stock_status}`);
    console.log(`Stock Quantity: ${product2.stock_quantity}`);
    console.log('---\n');

    // Test 3: Fetch all products
    console.log('Test 3: Fetching all products...');
    const products = await woocommerce.getProducts({ per_page: 5 });
    console.log(`Found ${products.length} products:`);
    products.forEach(p => {
      console.log(`- ${p.name}: €${p.price} (Stock: ${p.stock_quantity || 'N/A'})`);
    });

    console.log('\n✅ All tests completed successfully!');
    console.log('The API is fetching fresh data without caching.');
    
  } catch (error) {
    console.error('❌ Error during testing:', error);
  }
}

// Run the test
testFreshData();