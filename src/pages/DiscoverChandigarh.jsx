import React from 'react';
import Navbar from '../components/Navbar';
import Svg from '../components/Svg';
import Copyright from '../components/Copyright';

const DiscoverChandigarh = () => {
  const imageSources = [
    'https://static.dezeen.com/uploads/2016/08/capitol-complex-le-corbusier-chandigarh-india-benjamin-hosking_dezeen_936_0.jpg',
    'https://images-production.gardenvisit.com/uploads/images/114976/nek_chand_rock_garden_chandigarh2_large.jpg',
    'https://images-production.gardenvisit.com/uploads/images/114985/nek_chand_rock_garden5_large.jpg',
    'https://s7ap1.scene7.com/is/image/incredibleindia/sukhna-lake-chandigarh-chandigarh-2-attr-hero?qlt=82&ts=1727353661631',
  ];

  const chandigarhSections = [
    {
      title: 'Embark on a Journey of Architectural Marvels',
      desc: "Chandigarh's cityscape is a canvas of architectural masterpieces, with the Capitol Complex serving as its crown jewel. The Secretariat, the Legislative Assembly, and the High Court, all designed by Le Corbusier, showcase his visionary approach to urban planning. The Open Hand Monument, symbolizing the city's welcoming spirit, stands tall as a testament to its progressive ethos.",
    },
    {
      title: 'Explore the Vibrant Culture and Heritage',
      desc: "Beyond its architectural wonders, Chandigarh pulsates with a vibrant cultural tapestry. Immerse yourself in the city's rich heritage at the Government Museum and Art Gallery, which houses an extensive collection of artifacts and artworks. The Rock Garden, a whimsical creation of Nek Chand, offers a unique blend of art and nature, showcasing the ingenuity of the human spirit.",
    },
    {
      title: 'Indulge in Culinary Delights',
      desc: "Chandigarh's culinary scene is a delightful fusion of flavors, offering a gastronomic journey for food enthusiasts. From traditional Punjabi dishes like butter chicken and sarson ka saag to international cuisines, the city caters to every palate. Don't miss the opportunity to savor street food delicacies like chole bhature and samosas, which offer a true taste of local flavors.",
    },
    {
      title: 'Embrace the Tranquility of Nature',
      desc: "Chandigarh's commitment to green spaces is evident in its numerous parks and gardens. The Rose Garden, boasting a vast collection of roses, offers a visual spectacle, while the Japanese Garden provides a serene escape. The Sukhna Lake, surrounded by lush greenery, offers opportunities for boating and picnicking, providing a tranquil retreat from the city's bustle.",
    },
    {
      title: 'Experience the Warmth of Local Hospitality',
      desc: "The people of Chandigarh are known for their warm hospitality and welcoming nature. Engage with the locals, explore the bustling markets, and soak in the city's vibrant atmosphere. Whether you're seeking cultural immersion, architectural marvels, or simply a peaceful getaway, Chandigarh promises an unforgettable experience.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#a2e53f] via-[#a2e53f] to-[#a2e53f]">
      <Svg />
        <div className="relative max-w-7xl w-full mx-auto px-6 py-12">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Discover Chandigarh</h1>
            <p className="text-lg opacity-90">A City of Modern Marvels and Timeless Charm.</p>
          </div>
          <div className="flex justify-center md:grid-cols-2 gap-4 mt-8"> {/* decreased gap */}
            {imageSources.map((src, index) => (
              <div key={index} className="aspect-w-16 aspect-h-9">
                <img
                  src={src}
                  alt={`Chandigarh ${index + 1}`}
                  className="rounded-lg shadow-lg h-full object-cover"
                  style={{ maxWidth: '300px', margin: '0 auto' }} // decreased max width
                />
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
            {chandigarhSections.map((item, index) => (
              <div key={index} className="bg-white bg-opacity-80 backdrop-blur-lg shadow-xl rounded-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-105">
                <h2 className="text-xl font-semibold text-indigo-700">{item.title}</h2>
                <p className="text-gray-700 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
            <Copyright />
        </div>
      </div>
    </>
  );
};

export default DiscoverChandigarh;