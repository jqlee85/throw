# throw
Code for determining the location of a ball thrown through a laser sensing grid.

Hardware Specs/Limitations
===========================================================

Phototransistor from Mouser
--------------
512-QSD123
QSD123
4mA PHOTO TRANS
Rise/Fall time = 7 Microseconds (should be fast enough...)


Software Specs/Limitations
===========================================================

readLocation()
-----------
72 sensors need to be read for a full reading
From beginning of the while loop to the end of reading 72 sensors needs to run in about 1 millisecond.
A JavaScript simulation without the time of reading sensors ran this in about 30 microseconds

analogRead() [Arduino]
------------
Takes about 100 microseconds to read, plus whatever processing we have to do with information.
This will likely be the issue, if done once per sensor, this is 7.2 ms
even once per shift register is 900 microseconds, which only leaves 100 microseconds for the rest of the processing. Which actually might be possible.
