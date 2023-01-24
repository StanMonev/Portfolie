const brain = require('brain.js/index')
const trainingData2 = require('./data/ticTacToeMulti.js')
const fs = require('fs')

/*
    Brain.js accepts training data as an array of objects of the shape:
    {
        input: [],
        output: [],
    }
    This step takes processes our training data into that form to feed into brain.js
*/
const preparedTrainingData = trainingData2.map(set => {
  return {
      input: set.slice(0, 9),
      output: set.slice(9, 18)
  }
});

console.log('📈 Data prepared\n')


/*
  Brain.js takes some config when you instantiate the NeuralNet
  more details can be found in the docs https://github.com/brainjs/brain.js
  These are the defaults. Maybe they're rubbish defaults...
*/

const config = {
  binaryThresh: 0.001,
  hiddenLayers: [20], // -better, [7, 5, 5, 7], - works
  activation: 'tanh'
};

const net = new brain.NeuralNetwork(config);

console.log('🏃‍♀️ Start training -  this could take some time...\n');

net.train(preparedTrainingData, { 
  iterations: 20000, 
  learningRate: 0.001, 
  errorThrash: 0.0001,
  log: true,
  logInterval: 10,
});

let arr = net.run([1,-1,1,0,-1,0,-1,0,1]);
console.log(arr.indexOf(Math.max(...arr)));
arr = net.run([1,1,0,0,-1,0,-1,0,0]);
console.log(arr.indexOf(Math.max(...arr)));



/*
  We can output our trained Neural net as either a function or json and write it to a file.
*/

fs.writeFileSync('public/assets/trainedNet2.js', `exports.botBrain = ${ net.toFunction().toString() };`);

console.log('🏁 Training finished - model created\n')

process.exit(0);