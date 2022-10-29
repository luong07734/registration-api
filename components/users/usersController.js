const usersService = require('./usersService');
const User = require('./usersModel');

module.exports.profile = (req, res) => {
  res.json(usersService.profile(1));
}

module.exports.register = async (req, res) => {
  try {
    const { fullname, email, password} = req.body;
    // User input validation
    // ...
    // User input validation in frontend

    const findByEmailUsers = await usersService.findUserByEmail(email);
    if(!findByEmailUsers){
      await usersService.register(fullname, email, password);
      res.status(200).send('success');
    }else{
      res.status(409).send('email has already been used');
    }
    
  } catch (e) {
    res.status(400).json({errorMessage: e.message ?? 'Unknown error'});
  }
};