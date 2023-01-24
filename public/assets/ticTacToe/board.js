import JSONInterface from "./JSONInterface";

  /** 
   * Board of the type:
   * 
   * | (TL) | (TM) | (TR) |
   * --------------------
   * | (CL) | (CM) | (CR) |
   * --------------------
   * | (BL) | (BM) | (BR) |
   * --------------------
   * 
   * Will be represented as an array of type:
   * 
   * [(TL), (TM), (TR), (CL), (CM), (CR), (BL), (BM), (BR)]
   * -----------------------------------------------------
   * 
   */
class Board extends JSONInterface {

  constructor(values=[0,0,0,0,0,0,0,0,0]){
    this = values;
  }

  update(newBoard){
    this = newBoard;
  }

  toJSON(){
    return {board: this};
  }

}