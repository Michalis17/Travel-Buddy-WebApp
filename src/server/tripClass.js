module.exports = class Trip {
    constructor(city, country, geonameID, weather, picture, departure) {
      this.city = city;
      this.country = country;
      this.geoName_ID = geonameID;
      this.weather = weather;
      this.picture = picture;
      this.departure = departure;
    }
  }
 