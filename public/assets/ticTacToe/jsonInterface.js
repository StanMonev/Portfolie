export default class JSONInterface {
  toJSON(){
    throw new TypeError("toJSON() method must be implemented by child classes.");
  }
}