import React from "react";

const Homepage = () => {
  return (
    <div className="max-h-[100vh] overflow-y-auto">    
        <div className="index-page ">
        {/* Header */}
        <header id="header" className="header flex items-center fixed-top bg-gray-800 text-white w-full z-10">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
            <a href="index.html" className="logo flex items-center me-auto">
                <h1 className="text-2xl font-bold">Logis</h1>
            </a>
            <nav id="navmenu" className="navmenu">
                <ul className="flex space-x-6">
                <li><a href="#" className="text-white hover:text-gray-300">Home</a></li>
                <li><a href="#" className="text-white hover:text-gray-300">About</a></li>
                <li><a href="#" className="text-white hover:text-gray-300">Services</a></li>
                <li><a href="#" className="text-white hover:text-gray-300">Pricing</a></li>
                <li className="relative">
                    <a href="#" className="text-white hover:text-gray-300">Dropdown <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                    <ul className="absolute bg-gray-800 text-white space-y-2 mt-2 left-0 hidden group-hover:block">
                    <li><a href="#" className="block px-4 py-2">Dropdown 1</a></li>
                    <li><a href="#" className="block px-4 py-2">Dropdown 2</a></li>
                    </ul>
                </li>
                <li><a href="#" className="text-white hover:text-gray-300">Contact</a></li>
                </ul>
                <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
            </nav>
            <a className="btn-getstarted bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700" href="#">Get a Quote</a>
            </div>
        </header>

        {/* Hero Section */}
        <section id="hero" className="hero section bg-dark text-white relative">
            <img src="assets/img/world-dotted-map.png" alt="" className="hero-bg absolute inset-0 w-full h-full object-cover opacity-20" data-aos="fade-in" />
            <div className="container mx-auto relative z-10">
            <div className="row flex flex-wrap justify-between">
                <div className="col-lg-6 flex flex-col justify-center text-center lg:text-left lg:w-1/2">
                <h2 className="text-3xl font-bold" data-aos="fade-up">Your Lightning Fast Delivery Partner</h2>
                <p className="mt-4" data-aos="fade-up" data-aos-delay="100">
                    Facere distinctio molestiae nisi fugit tenetur repellat non praesentium nesciunt optio quis sit odio nemo quisquam.
                </p>
                <form action="#" className="form-search flex items-center mt-6" data-aos="fade-up" data-aos-delay="200">
                    <input type="text" className="form-control px-4 py-2 w-full rounded-l-lg border border-gray-300" placeholder="Your ZIP code or City. e.g. New York" />
                    <button type="submit" className="btn btn-primary bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700">Search</button>
                </form>
                </div>
                <div className="col-lg-5 lg:w-1/2 mt-6 lg:mt-0" data-aos="zoom-out">
                <img src="assets/img/hero-img.svg" className="img-fluid" alt="" />
                </div>
            </div>
            </div>
        </section>

        {/* Footer */}
        <footer id="footer" className="footer bg-gray-800 text-white py-8">
            <div className="container mx-auto">
            <div className="row flex flex-wrap justify-between">
                <div className="col-lg-5 col-md-12 footer-about">
                <a href="index.html" className="logo flex items-center">
                    <span className="text-2xl font-bold">Logis</span>
                </a>
                <p className="mt-4">Some footer description...</p>
                <div className="social-links flex space-x-4 mt-4">
                    <a href="#" className="text-white hover:text-gray-300"><i className="bi bi-twitter"></i></a>
                    <a href="#" className="text-white hover:text-gray-300"><i className="bi bi-facebook"></i></a>
                    <a href="#" className="text-white hover:text-gray-300"><i className="bi bi-instagram"></i></a>
                    <a href="#" className="text-white hover:text-gray-300"><i className="bi bi-linkedin"></i></a>
                </div>
                </div>
                <div className="col-lg-2 col-6 footer-links">
                <h4 className="text-xl font-bold">Useful Links</h4>
                <ul className="space-y-2 mt-4">
                    <li><a href="#" className="text-white hover:text-gray-300">Home</a></li>
                    <li><a href="#" className="text-white hover:text-gray-300">About us</a></li>
                    <li><a href="#" className="text-white hover:text-gray-300">Services</a></li>
                    <li><a href="#" className="text-white hover:text-gray-300">Terms of service</a></li>
                    <li><a href="#" className="text-white hover:text-gray-300">Privacy policy</a></li>
                </ul>
                </div>
                <div className="col-lg-3 col-md-12 footer-contact text-center lg:text-left mt-6 lg:mt-0">
                <h4 className="text-xl font-bold">Contact Us</h4>
                <p className="mt-2">New York, NY 535022</p>
                <p className="mt-2"><strong>Phone:</strong> <span>+1 5589 55488 55</span></p>
                <p className="mt-2"><strong>Email:</strong> <span>info@example.com</span></p>
                </div>
            </div>
            </div>
        </footer>
        </div>
    </div>
  );
};

export default Homepage;
