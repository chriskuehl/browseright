#!/bin/bash
curl http://federalgovernmentzipcodes.us/free-zipcode-database-Primary.csv > zipcodes.csv
dos2unix zipcodes.csv
