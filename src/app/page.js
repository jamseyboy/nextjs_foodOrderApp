// app/page.js
"use client";
import Link from "next/link"; // Import Link from Next.js
import logo from '../css/logo.css'

export default function Home() {
  return (
    <div className="background min-h-screen flex items-center justify-center">
            <div
                className="container mx-auto border-4 border-gray-200 p-8 rounded-lg shadow-lg relative bg-center bg-no-repeat bg-cover min-h-[80vh]"
                style={{ backgroundImage: 'url("/path-to-logo.jpg")' }} // Update with your logo's path
            >
                <div className="overlay flex flex-col items-center justify-center h-full space-y-8">
                    <main className="text-center space-y-4">
                        <div>
                            <h1 className="text-4xl font-bold text-white">HCFP KTP</h1>
                            <h2 className="text-4xl font-semibold text-white">Food Ordering Homepage</h2>
                        </div>
                        {/* Buttons Section */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-4 items-center">
                            <Link href="/orders/createCustomer">
                                <div className="text-center">
                                    <h2 className="text-xl font-semibold text-white mb-2">
                                        Go to Order Page (Customer)
                                    </h2>
                                    <button className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition">
                                        Submit
                                    </button>
                                </div>
                            </Link>
                            <Link href="/foods">
                                <div className="text-center">
                                    <h2 className="text-xl font-semibold text-white mb-2">
                                        Create Food Items for Today (Seller)
                                    </h2>
                                    <button className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition">
                                        Submit
                                    </button>
                                </div>
                            </Link>
                            <Link href="/TodayorderDetails">
                                <div className="text-center">
                                    <h2 className="text-xl font-semibold text-white mb-2">
                                        See Order List for Today (Seller)
                                    </h2>
                                    <button className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition">
                                        Submit
                                    </button>
                                </div>
                            </Link>
                        </div>
                    </main>

                    {/* Footer Section */}
                    <footer className="text-center text-white mt-8 py-4 border-t border-white-300">
                        <p>&copy; {new Date().getFullYear()} James Lalringsan. All rights reserved.</p>
                    </footer>
                </div>
            </div>
        </div>
  );
}
