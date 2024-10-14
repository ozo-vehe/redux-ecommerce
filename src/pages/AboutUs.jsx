const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-[5%]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">About Us</h1>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 sm:p-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              At our core, we are dedicated to revolutionizing the way people interact with technology. Our mission is to create innovative solutions that simplify complex problems and enhance the quality of life for individuals and businesses alike.
            </p>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Team</h2>
            <p className="text-gray-600 mb-6">
              We are a diverse group of passionate individuals, bringing together expertise from various fields including software engineering, design, and artificial intelligence. Our team is united by a common goal: to push the boundaries of what&apos;s possible in technology.
            </p>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
            <ul className="list-disc list-inside text-gray-600 mb-6">
              <li>Innovation: We constantly strive to think outside the box and create groundbreaking solutions.</li>
              <li>Integrity: We believe in transparency and ethical practices in all our endeavors.</li>
              <li>Collaboration: We foster a culture of teamwork and open communication.</li>
              <li>User-Centric: Our users are at the heart of everything we do.</li>
            </ul>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Journey</h2>
            <p className="text-gray-600">
              Founded in 2023, our company has grown from a small startup to a leading force in the tech industry. We&apos;ve overcome challenges, celebrated victories, and learned valuable lessons along the way. As we look to the future, we&apos;re excited about the endless possibilities that lie ahead and the positive impact we can make on the world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
