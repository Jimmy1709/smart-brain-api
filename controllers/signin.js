
const handleSignIn = (req,res,db,bcrypt) => {

 const {email , password } = req.body;
  if(!email || !password){
  	return res.status(400).json('Incorrect Form Submission');
  }
  db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('user')
          .where('email', '=', email)
          .then(users => {
            res.json(users[0])
          })
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        res.status(400).json('wrong credentials')
      }
    })
    .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {

	handleSignIn :handleSignIn
};
