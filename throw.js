


//Loop until location is set, returns location
function readLocation() {

  /*  Testing */
  //Set start time
  var startTime = performance.now();
  var j = 0;
  //Values from the X and Y sensors, each array will have 36 values, defaulting to false, true means a sensor is tripped
  var xInputs = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true];
  var yInputs = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true];
  /*  Testing */


  //Array of all the readings from this round
  var readings = [];

  //Which sensors are tripped
  var xTripped = [];
  var yTripped = [];

  //The final read location, when readings are done and validated, most accurate reading is stored as x,y coords
  var location = false;

  //Main While Loop
  while ( location == false && j < 5 ) {

    /*  Testing */
    j++;
    if ( j > 1 ) {
      xInputs[35] = false;
      yInputs[35] = false;
    }
    /*  Testing */

    //Initialize reading
    var reading = [];



    //Scan X axis
    xTripped = [];
    yTripped = [];
    for (var i = 0, len = xInputs.length; i < len; i++ ) {

      if ( xInputs[i] ) {
        xTripped.push(i);
      }

      // sleepFor(.007);

    }

    //If an X beam was tripped, scan for Y
    if ( xTripped.length > 0 ) {

      for (var i = 0, len = yInputs.length; i < len; i++ ) {

        if ( xInputs[i] ) {
          yTripped.push(i);
        }
        // sleepFor(.007);

      }

      //If a Y beam was also tripped, store all tripped beams in reading and add to array
      if ( yTripped.length > 0 ) {

        reading['x'] = xTripped;
        reading['y'] = yTripped;
        reading['count'] = xTripped.length + yTripped.length;
        readings.push(reading);
        var executionTime = performance.now() - startTime;
        console.log('Location read took ' + executionTime + ' milliseconds');
      }

    }

    //If no beam was tripped, and there are readings, so check to see if valid and what the most accurate reading is
    if ( readings.length > 0 && ( xTripped.length < 1 || yTripped.length < 1 ) ) {

      //Order readings by 'trip count' in descending order
      if (readings.length > 1) {
        var sortedReadings = readings.sort( mostTripped() );
      } else var sortedReadings = readings;
      //Check each reading and once valid reading is found, set location
      for (var i = 0, len = sortedReadings.length; i < len; i++ ) {

        //Run validation on reading
        var validLocation = getValidLocation( sortedReadings[i] );

        if ( validLocation ) {
          location = validLocation;
        }
      }

    }

  } //End While Loop

  // console.log(readings);



  //Return the determined location
  console.log(location);
  return location;

}

//Returns x,y coordinate if valid reading, false if can't get a location from the data
function getValidLocation( reading ) {

  if ( reading['x'].length > 0  && reading['y'].length > 0 ) {
    return 'X:' + reading['x'][0] + ' and Y:' + reading['y'][0];
  }
  else { return false; }
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

function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ }
}

(function() {
  readLocation();
})();
