
const getHomePage = ((req, res) => {
    res.render('index');
})

const getContactPage = ((req, res) => {
  res.render('contactPage');
})

const getAboutPage = ((req, res) => {
  res.render('aboutPage');
})

module.exports = {
    getHomePage,
    getContactPage,
    getAboutPage
}