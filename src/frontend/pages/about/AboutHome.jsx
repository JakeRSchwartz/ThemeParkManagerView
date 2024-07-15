import React from "react";
import LinksAbout from "./AboutLinks.jsx";
import logo from "../../assets/Mainlogo.png";
import UH from "../../assets/UH.jpg";
import Footer from "./AboutFooter.jsx";
import "../../styles/about.styles/about.css";

function About() {
  const currentDate = new Date();
  const formattedDate = currentDate.toDateString();

  return (
    <div>
      <header className="CustomerHeaderPage">
        <img src={logo} alt="Logo" />
        <div>
          <h1>Cougar Park About</h1>
          <div className="CustomerPageDate">Today's Date: {formattedDate}</div>
        </div>
        <div className="Customerlinks-container">
          <LinksAbout />
        </div>
      </header>
      <hr className="CustomerPageHr"></hr>
      <div>
        <body>
          <img
            src={UH}
            alt="UH front building"
            className="CustomerPageFull-width-image"
          />
          <hr className="CustomerPageHr"></hr>
          <h1 className="centered-heading">
            How did we get our inspiration to create Cougar Park?
          </h1>
          <div className="centered-text">
            <p>
              Inspired by Frontier Fiesta and the spirited culture of the
              University of Houston, Cougar Park embodies a nostalgic themed
              park, where everything is centered around UH and the infamous
              Frontier Fiesta. It serves as a vibrant carnival park, celebrating
              the essence and heritage of the university
            </p>
          </div>
          <h1 className="centered-heading">The history of Frontier Fiesta.</h1>
          <div className="centered-text">
            <p>
              Frontier Fiesta was founded in 1939. The event was discontinued
              during the War years (WWII) and resumed in 1947 through 1959. The
              current Frontier Fiesta was re–started in 1991 and continues to
              today. The revival of the event would take place in the spring of
              1992 as a student and alumni event. With the help of enthusiastic
              alumni such as Rusty Hruska and Glenn Lilie. David Keith supplied
              the food, BBQ’ing on his own personal grill. Glenn Lilie sponsored
              labor from his personal company to get Frontier Fiesta City Built.
              Frontier Fiesta was held behind the Baptist Student Ministries
              building in 1995–1996. In 1997 Frontier Fiesta was transferred to
              the southeast corner of University Blvd. and Calhoun, the current
              location of the Campus Recreation & Wellness Center (CRWC). The
              rugged, unpaved terrain provided a level of authenticity that was
              only unappreciated when it rained. A wooden pedestrian bridge with
              engraved name plates was built on the site to honor past Frontier
              Fiesta Chairmen. Part of the program expansion included a petting
              zoo, wagon rides and Little Wrangler Day which flourished as bus
              loads of elementary and middle school students would come to be
              entertained on Saturday of Frontier Fiesta weekend. The University
              started to participate with several colleges participating and
              hosting receptions during Frontier Fiesta.
            </p>
          </div>
          <div className="centered-text">
            <p>
              In 2001 Frontier Fiesta moved to the west side of Robertson
              Stadium to make room for the construction of the Campus Recreation
              and Wellness Center. Over time, the tailgating Pavilions were used
              during Frontier Fiesta and fall football games. Despite the many
              changes in venue and themes and challenges over the years,
              Frontier Fiesta continues to be a cherished tradition at the
              University of Houston. Now, many years since the events inception,
              and 20 years since its revival in 1991, the University of Houston
              again invites the community to join in the celebration. Frontier
              Fiesta celebrates everything that makes the University of Houston
              important to the Houston community today. The talent and
              leadership ability of its students, the opportunity to educate
              Houston’s future leaders, and providing scholarship opportunities
              for deserving students are just a few ways that Frontier Fiesta
              gives back.
            </p>
          </div>
        </body>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default About;
