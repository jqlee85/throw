


//Loop until location is set, returns location
function readLocation() {

  //Values from the X and Y sensors, each array will have 36 values, defaulting to false, true means a sensor is tripped
  let xInputs = array();
  let yInputs = array();

  //Array of all the readings from this round
  let readings = array();

  //Which sensors are tripped
  let xTripped = array();
  let yTripped = array();

  //The final read location, when readings are done and validated, most accurate reading is stored as x,y coords
  let location = false;

  //Main While Loop
  while ( location == false ) {

    //Initialize reading
    let reading = array();

    //Scan X axis
    foreach ( xInputs as xKey => xInput ) {
      if ( xInput ) {
        xTripped.push(xKey);
        readingsStarted = true;
      }
    }

    //If an X beam was tripped, scan for Y
    if ( xTripped.count() > 0 ) {
      foreach ( yInputs as yKey => xInput ) {
        if ( yInput ) {
          yTripped.push(yKey);
        }
      }

      //If a Y beam was also tripped, store all tripped beams in reading and add to array
      if ( yTripped.count() > 0 ) {
        reading['x'] = xTripped;
        reading['y'] = yTripped;
        reading['trip count'] = xTripped.count() + yTripped.count();
        readings.push();
      }

    } else if ( readings.count() > 0 ) {
      //No beam was tripped, and there are readings, so check to see if valid and what the most accurate reading is

      //Order readings by 'trip count' in descending order
      let sortedReadings = readings.sort( mostTripped() );

      //Check each reading and once valid reading is found, set location
      foreach ( sortedreadings as readingToCheck ) {

        //Run validation on reading
        let validLocation = getValidLocation( readingToCheck );

        if ( validLocation ) {
          location = validLocation;
        }
      }

    }

  } //End While Loop

  //Return the determined location
  return location;

}

//Returns x,y coordinate if valid reading, false if can't get a location from the data
function getValidLocation( reading ) {
  //Logic for determining if tripped sensors can result in a valid x,y plotting

  //Get all groups of consecutive trips for X
  //If there is more than one group return false

  //Get all groups of consecutive trips for Y
  //If there is more than one group return false

  //If exactly 1 group consecutive trips for X and Y, get midpoint for both X and Y
  // If odd number of consective trips, set coord to middle one
  // If even number of consecutive trips, set coord to midpoint of the two middle ones

  //If X and Y coord set return true
  //Else return false

}

//Comparison function for sorting readings by the 'trip count'
function mostTripped(a,b) {
  if ( a['count'] < b['count'] ) { return -1; }
  if ( a['count'] > b['count'] ) { return 1; }
  return 0;
}
