// import React from "react";
// import Navbar from "../components/Navbar";


// const Home = () => {


// // const selectFromStation = document.querySelector('#stationFrom')
// // var placeholderOption = document.createElement("option");
// // placeholderOption.value = "";
// // placeholderOption.textContent = "Select Station From";
// // placeholderOption.disabled = true;
// // placeholderOption.selected = true;
// // selectFromStation.appendChild(placeholderOption);
// // fetch('../api/formatted_bus_routes')
// //   .then(res => res.json())
// //   .then(data => {
// //     data.forEach((item) => {
// //       const Rno = item.route_number;
// //       const From = item.start;
// //       const option = document.createElement("option")
// //       option.value = From;
// //       option.textContent = `${Rno} ${From}`;
// //       selectFromStation.appendChild(option)
// //     });
// //   })





  

// // const selectToStation = document.querySelector('#selectToStation')
// // var placeholderOption = document.createElement("option");
// // placeholderOption.value = "";
// // placeholderOption.textContent = "Select Station To";
// // placeholderOption.disabled = true;
// // placeholderOption.selected = true;
// // selectToStation.appendChild(placeholderOption);
// // fetch('../api/formatted_bus_routes')
// //   .then(res => res.json())
// //   .then(data => {
// //     data.forEach((item) => {
// //       const To = item.start;
// //       const option = document.createElement("option")
// //       option.value = To;
// //       option.textContent = To;
// //       selectToStation.appendChild(option)
// //     });
// //   })




//   return (
//     <>
//     <Navbar />
//       <section className="hero">
//         <div className="slideshow-container">
//           <div className="slider">
//             <div className="slider-content">
//               <div className="text welcome-text">
//                 <h1 className="slider-ctu-welcome">
//                   Welcome to Chandigarh Transport Undertaking
//                 </h1>
//                 <p className="welcome-p">
//                   Chandigarh Transport Undertaking came into existence on
//                   01.11.1966 with a fleet strength of 30 buses only, as a result
//                   of trifurcation of Punjab Roadways at the time of
//                   re-organisation of Punjab State. Presently, Headquarters are
//                   at Plot No.701 in Industrial Area, Phase-I, Chandigarh, with
//                   other Depots and Workshops at Industrial Area & Sector 25. The
//                   workshop for JNnurm Buses is located adjoining to the
//                   ISBT-43.
//                 </p>
//               </div>
//             </div>

//             <div className="search-buses">
//               <form action="">
//                 <fieldset>
//                   <legend>Search Buses By Bus Stops</legend>
//                   <label htmlFor="from">From</label>
//                   <select id="stationFrom" ></select>
//                   <label htmlFor="to">To</label>
//                   <select id="selectToStation"></select>
//                   <input type="submit" className="search-btn" value="Search" />
//                 </fieldset>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Home;


import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import busRoutes from "../api/formatted_bus_routes.json"; // ✅ Import JSON file

const Home = () => {
  const [stationsFrom, setStationsFrom] = useState([]);
  const [stationsTo, setStationsTo] = useState([]);

  useEffect(() => {
    // Since data is already imported, directly set it to state
    const fromOptions = busRoutes.map((item) => ({
      value: item.start,
      label: `${item.route_number} ${item.start}`,
    }));

    const toOptions = busRoutes.map((item) => ({
      value: item.start,
      label: item.start,
    }));

    setStationsFrom(fromOptions);
    setStationsTo(toOptions);
  }, []);

  return (
    <>
      <Navbar />
      <section className="hero">
        <div className="slideshow-container">
          <div className="slider">
            <div className="slider-content">
              <div className="text welcome-text">
                <h1 className="slider-ctu-welcome">
                  Welcome to Chandigarh Transport Undertaking
                </h1>
                <p className="welcome-p">
                Chandigarh Transport Undertaking came into existence on 01.11.1966 with a fleet
              strength of 30 buses only, as a result of trifurcation of Punjab Roadways at the time of re-organisation
              of Punjab State. Presently Head Quarters at Plot No.701 in Industrial Area, Phase-I, Chandigarh with other
              Depots and Workshops at Industrial Area & Sector 25. The workshop for JNnurm Buses is located adjoining to
              the ISBT-43.
                </p>
              </div>
            </div>

            <div className="search-buses w-full">

              <form>
                <fieldset>
                  <legend>Search Buses By Bus Stops</legend>

                  <label htmlFor="from">From</label>
                  <select id="stationFrom">
                    <option value="" disabled selected>
                      Select Station From
                    </option>
                    {stationsFrom.map((station, index) => (
                      <option key={index} value={station.value}>
                        {station.label}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="to">To</label>
                  <select id="selectToStation">
                    <option value="" disabled selected>
                      Select Station To
                    </option>
                    {stationsTo.map((station, index) => (
                      <option key={index} value={station.value}>
                        {station.label}
                      </option>
                    ))}
                  </select>

                  <input type="submit" className="search-btn w-48 px-6 py-2  text-white  rounded cursor-pointer hover:bg-blue-700 transition" value="Search" />
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
