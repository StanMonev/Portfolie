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
class Board {

  constructor(values=[0,0,0,0,0,0,0,0,0]){
    this.values = values;
  }

  update(values){
    this.values = values;
  }

  getValueAt(index){
    return this.values[index];
  }

  toJSON(){
    return {board: this.values};
  }

}

module.exports = Board;