// CommercialTemplate.js
import React from 'react';

const Template4 = () => {
  return (
    <div className="font-sans text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4 py-4">
          <div className="text-3xl font-bold text-blue-600">ShopEasy</div>
          <nav className="space-x-6">
            <a href="#" className="hover:text-blue-600">Home</a>
            <a href="#" className="hover:text-blue-600">Products</a>
            <a href="#" className="hover:text-blue-600">Deals</a>
            <a href="#" className="hover:text-blue-600">Support</a>
            <a href="#" className="hover:text-blue-600">Contact</a>
          </nav>
          <div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">Sign In</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[url('https://plus.unsplash.com/premium_photo-1677995700941-100976883af7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2hvcHBpbmclMjB3ZWJzaXRlJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D')] bg-cover bg-center h-96 flex items-center justify-center">
        <div className="bg-white bg-opacity-70 p-8 rounded-lg text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to ShopEasy</h1>
          <p className="text-lg mb-6">Your one-stop shop for everything you need!</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">Shop Now</button>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Category 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <img src=''/>
              <h3 className="text-xl font-semibold">Electronics</h3>
            </div>
            {/* Category 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <img src=''/>
              <h3 className="text-xl font-semibold">Fashion</h3>
            </div>
            {/* Category 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <img src=''/>
              <h3 className="text-xl font-semibold">Home & Kitchen</h3>
            </div>
            {/* Category 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpPGyrihxQRZJ9uA6A3R1w6SfedH64pOCeYQ&s" alt="Sports" className="w-full h-32 object-cover mb-4 rounded" />
              <h3 className="text-xl font-semibold">Sports</h3>
            </div>
          </div>
        </div>
      </section>
{/* Featured Products Section */}
<section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Product 1 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <img src="https://images.samsung.com/is/image/samsung/assets/in/home/Galaxy-Book4_330x330.jpg?$330_330_JPG$" alt="Product 1" className="w-full object-cover mb-4 rounded" />
              <h3 className="text-xl font-semibold mb-2">Gaming Laptop</h3>
              <p className="text-gray-700 mb-2">$1,299.99</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">Add to Cart</button>
            </div>
            {/* Product 2 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <img src="https://images.samsung.com/is/image/samsung/assets/in/home/Small-Tile_330x330-B6-Blue-2.png?$330_330_PNG$" alt="Product 2" className="w-full object-cover mb-4 rounded" />
              <h3 className="text-xl font-semibold mb-2">Smartphone</h3>
              <p className="text-gray-700 mb-2">$799.99</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">Add to Cart</button>
            </div>
            {/* Product 3 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <img src="https://images.samsung.com/is/image/samsung/assets/in/home/240905/Buds3_330X330.jpg?$330_330_JPG$" alt="Product 3" className="w-full  object-cover mb-4 rounded" />
              <h3 className="text-xl font-semibold mb-2">Wireless Headphones</h3>
              <p className="text-gray-700 mb-2">$199.99</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">Add to Cart</button>
            </div>
            {/* Product 4 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <img src="https://images.samsung.com/is/image/samsung/p6pim/in/2407/gallery/in-galaxy-watch7-l315-sm-l315fzgains-thumb-542367168?$216_216_PNG$" alt="Product 4" className="w-full object-cover mb-4 rounded" />
              <h3 className="text-xl font-semibold mb-2">Smartwatch</h3>
              <p className="text-gray-700 mb-2">$249.99</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">Add to Cart</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="text-lg font-semibold">ShopEasy © 2024</div>
            <nav className="space-x-6 mt-4">
              <a href="#" className="hover:text-gray-400">Privacy Policy</a>
              <a href="#" className="hover:text-gray-400">Terms of Service</a>
              <a href="#" className="hover:text-gray-400">Contact Us</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Template4;