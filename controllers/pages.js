
const getHomePage = ((req, res) => {
    res.render('index');
})

const getContactPage = ((req, res) => {
  res.render('contactPage');
})

const getAboutPage = ((req, res) => {
  res.render('aboutPage');
})

const getTTTPage = ((req, res) => {
  res.render('ticTacToePage');
})

const sendEmail = ( (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ msg: "Success" }));
})

module.exports = {
    getHomePage,
    getContactPage,
    getAboutPage,
    getTTTPage,
    sendEmail
}