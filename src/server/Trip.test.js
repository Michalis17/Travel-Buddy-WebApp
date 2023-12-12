var Trip = require("./tripClass");

describe('Trip', () => {

    // Trip object can be created with valid city, country, geonameID, weather, picture, and departure inputs
    it('should create a Trip object with valid inputs', () => {
      const trip = new Trip('New York', 'United States', 12345, 'sunny', 'image.jpg', '2022-01-01');
      expect(trip.city).toBe('New York');
      expect(trip.country).toBe('United States');
      expect(trip.geoName_ID).toBe(12345);
      expect(trip.weather).toBe('sunny');
      expect(trip.picture).toBe('image.jpg');
      expect(trip.departure).toBe('2022-01-01');
    });

    // Trip object properties can be accessed and modified
    it('should access and modify Trip object properties', () => {
      const trip = new Trip('New York', 'United States', 12345, 'sunny', 'image.jpg', '2022-01-01');
      expect(trip.city).toBe('New York');
      expect(trip.country).toBe('United States');
      expect(trip.geoName_ID).toBe(12345);
      expect(trip.weather).toBe('sunny');
      expect(trip.picture).toBe('image.jpg');
      expect(trip.departure).toBe('2022-01-01');

      trip.city = 'Los Angeles';
      trip.country = 'United States';
      trip.geoName_ID = 54321;
      trip.weather = 'cloudy';
      trip.picture = 'image2.jpg';
      trip.departure = '2022-02-01';

      expect(trip.city).toBe('Los Angeles');
      expect(trip.country).toBe('United States');
      expect(trip.geoName_ID).toBe(54321);
      expect(trip.weather).toBe('cloudy');
      expect(trip.picture).toBe('image2.jpg');
      expect(trip.departure).toBe('2022-02-01');
    });

    // Trip object can be converted to JSON format
    it('should convert Trip object to JSON format', () => {
      const trip = new Trip('New York', 'United States', 12345, 'sunny', 'image.jpg', '2022-01-01');
      const json = JSON.stringify(trip);
      const expectedJson = '{"city":"New York","country":"United States","geoName_ID":12345,"weather":"sunny","picture":"image.jpg","departure":"2022-01-01"}';
      expect(json).toBe(expectedJson);
    });

    

    // Trip object cannot be created with invalid departure date format
    // it('should throw an error when creating Trip object with invalid departure date format', () => {
    //   expect(() => new Trip('New York', 'United States', 12345, 'sunny', 'image.jpg', '01-01-2022')).toThrow();
    //   expect(() => new Trip('New York', 'United States', 12345, 'sunny', 'image.jpg', '2022/01/01')).toThrow();
    //   expect(() => new Trip('New York', 'United States', 12345, 'sunny', 'image.jpg', '2022-13-01')).toThrow();
    //   expect(() => new Trip('New York', 'United States', 12345, 'sunny', 'image.jpg', '2022-01-32')).toThrow();
    //   expect(() => new Trip('New York', 'United States', 12345, 'sunny', 'image.jpg', '2022-01-01')).not.toThrow();
    // });

    // Trip object cannot be compared to non-Trip objects
    it('should throw an error when comparing Trip object to non-Trip objects', () => {
      const trip = new Trip('New York', 'United States', 12345, 'sunny', 'image.jpg', '2022-01-01');
      expect(() => trip.equals('other')).toThrow();
      expect(() => trip.equals(123)).toThrow();
      expect(() => trip.equals({})).toThrow();
      expect(() => trip.equals(null)).toThrow();
      expect(() => trip.equals(undefined)).toThrow();
    });
});
