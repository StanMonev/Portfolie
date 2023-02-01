const brain = require('brain.js/index')
const trainingData = require('../data/ticTacToeMulti')
const fs = require('fs')

/*
    Brain.js accepts training data as an array of objects of the shape:
    {
        input: [],
        output: [],
    }
    This step takes processes our training data into that form to feed into brain.js
*/
const preparedTrainingData = trainingData.map(set => {
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
  hiddenLayers: [90, 90], // -better, [7, 5, 5, 7], - works
  activation: 'tanh'
};

const net = new brain.NeuralNetwork(config);

console.log('🏃‍♀️ Start training -  this could take some time...\n');

net.train(preparedTrainingData, { 
  iterations: 300, 
  learningRate: 0.005, 
  errorThrash: 0.001,
  log: true,
  logInterval: 100,
});

let arr = net.run([1,-1,1,0,-1,0,-1,0,1]);
console.log(arr.indexOf(Math.max(...arr))); // 5
arr = net.run([1,1,0,0,-1,0,-1,0,0]);
console.log(arr.indexOf(Math.max(...arr))); // 2
arr = net.run([0, -1, -1, 1, 0, 0, 0, 0, 0]);
console.log(arr.indexOf(Math.max(...arr))); // 0



/*
  We can output our trained Neural net as either a function or json and write it to a file.
*/

fs.writeFileSync('public/assets/botBrain.js', `exports.decide = ${ net.toFunction().toString() };`);

console.log('🏁 Training finished - model created\n')

process.exit(0);