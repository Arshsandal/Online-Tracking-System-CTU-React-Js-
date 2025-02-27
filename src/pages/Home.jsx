import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {


// const selectFromStation = document.querySelector('#stationFrom')
// var placeholderOption = document.createElement("option");
// placeholderOption.value = "";
// placeholderOption.textContent = "Select Station From";
// placeholderOption.disabled = true;
// placeholderOption.selected = true;
// selectFromStation.appendChild(placeholderOption);
// fetch('../api/formatted_bus_routes')
//   .then(res => res.json())
//   .then(data => {
//     data.forEach((item) => {
//       const Rno = item.route_number;
//       const From = item.start;
//       const option = document.createElement("option")
//       option.value = From;
//       option.textContent = `${Rno} ${From}`;
//       selectFromStation.appendChild(option)
//     });
//   })





  

// const selectToStation = document.querySelector('#selectToStation')
// var placeholderOption = document.createElement("option");
// placeholderOption.value = "";
// placeholderOption.textContent = "Select Station To";
// placeholderOption.disabled = true;
// placeholderOption.selected = true;
// selectToStation.appendChild(placeholderOption);
// fetch('../api/formatted_bus_routes')
//   .then(res => res.json())
//   .then(data => {
//     data.forEach((item) => {
//       const To = item.start;
//       const option = document.createElement("option")
//       option.value = To;
//       option.textContent = To;
//       selectToStation.appendChild(option)
//     });
//   })




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
                  Chandigarh Transport Undertaking came into existence on
                  01.11.1966 with a fleet strength of 30 buses only, as a result
                  of trifurcation of Punjab Roadways at the time of
                  re-organisation of Punjab State. Presently, Headquarters are
                  at Plot No.701 in Industrial Area, Phase-I, Chandigarh, with
                  other Depots and Workshops at Industrial Area & Sector 25. The
                  workshop for JNnurm Buses is located adjoining to the
                  ISBT-43.
                </p>
              </div>
            </div>

            <div className="search-buses">
              <form action="">
                <fieldset>
                  <legend>Search Buses By Bus Stops</legend>
                  <label htmlFor="from">From</label>
                  <select id="stationFrom" ></select>
                  <label htmlFor="to">To</label>
                  <select id="selectToStation"></select>
                  <input type="submit" className="search-btn" value="Search" />
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
