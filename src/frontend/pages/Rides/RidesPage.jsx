import React from 'react'



function RidesPage () {
    const currentDate = new Date();
    const formattedDate = currentDate.toDateString();
return(
    <>
    <header className ="ridesHeader">
        <img src={logo} alt="Logo" />
        <div >
          <h1>Rides At Cougar Park</h1>
          <div className="date">Today's Date: {formattedDate}</div>
        </div>
        <nav>
          <ul>
            <li><a href="http://localhost:5173/customer">Members</a></li>
            <li><a href="http://localhost:5173/rides">Rides</a></li>
            <li><a href="#">Maintenance</a></li>
            <li><a href="#">Admin</a></li>
            <li><a href="http://localhost:5173/login">Sign in</a></li>
          </ul>
        </nav>
    </header>
    <hr className="hrRide"></hr>

    <body className="ridesBody">

    
      
 
    </body>
    </>
);
}

export default RidesPage