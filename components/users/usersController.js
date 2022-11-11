const usersService = require('./usersService');
const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports.profile = (req, res) => {
  console.log(req.user )
  res.json({ user: req.user });
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

module.exports.login = (req, res) => {
  const {_id, email, fullname} = req.user;

  
  const accessToken = jwt.sign({id: _id, email, fullname}, config.JWT_SECRET, {expiresIn: '15m'});
  res.json({
    _id,
    email,
    fullname,
    accessToken
  });

}
