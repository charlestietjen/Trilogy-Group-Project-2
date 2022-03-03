const router = require('express').Router();
const { User, Post, Like, Hide } = require('../../models/');
const { validateEmail, validatePassword } = require('../../utils/validators');

//Get users
router.get('/', (req, res) => {
   User.findAll({
      attributes: { exclude: ['password'] },
   })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});

// Get a single user
router.get('/:id', (req, res) => {
   User.findOne({
      attributes: { exclude: ['password'] },
      where: {
         id: req.params.id,
      },
      include: [
         {
            model: Post,
            attributes: ['id', 'text'],
         },
         {
            model: Post,
            attributes: ['text'],
            through: Like,
            as: 'liked_posts',
         },
      ],
   })
      .then((dbUserData) => {
         if (!dbUserData) {
            res.status(404).json({ message: 'User not found' });
            return;
         }
         res.json(dbUserData);
      })
      .catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});

//Account creation expects {email: 'test@test.cool', password: 'goodpassword'}
router.post('/', (req, res) => {
   //validate email
   if (!validateEmail(req.body.email)){
      res.status(400).json({ message: 'Please enter a valid email!' });
      return;
   }
   if (!validatePassword(req.body.password)){
      res.status(400).json({ message: 'Password must contain 6 to 16 letters. One Uppercase, One Number and One special character.' });
      return;
   }

   User.create({
      email: req.body.email,
      password: req.body.password,
   })
      .then((dbUserData) => {
         req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.email = dbUserData.email;
            req.session.loggedIn = true;
            res.json(dbUserData);
         });
      })
      .catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});

//Login route expects {email: 'test@test.cool', password: 'goodpassword'}
router.post('/login', (req, res) => {
   User.findOne({
      where: {
         email: req.body.email,
      },
   }).then((dbUserData) => {
      if (!dbUserData) {
         res.status(400).json({ message: 'Username or password incorrect.' });
         return;
      }
      const validPassword = dbUserData.checkPassword(req.body.password);
      if (!validPassword) {
         res.status(400).json({ message: 'Username or password incorrect.' });
         return;
      }
      req.session.save(() => {
         req.session.user_id = dbUserData.id;
         req.session.email = dbUserData.email;
         req.session.loggedIn = true;
         res.json({ user: dbUserData, message: 'Logged in successfully.' });
      });
   });
});

//Logout route
router.post('/logout', (req, res) => {
   if (req.session.loggedIn) {
      req.session.destroy(() => {
         res.status(204).end();
      });
   } else {
      res.status(404).end();
   }
});

//User update - only update data received
router.put('/:id', (req, res) => {
   User.update(req.body, {
      individualHooks: true,
      where: {
         id: req.params.id,
      },
   })
      .then((dbUserData) => {
         if (!dbUserData) {
            res.status(404).json({ message: 'User not found.' });
            return;
         }
         res.json(dbUserData);
      })
      .catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});

//Delete user route
router.delete('/:id', (req, res) => {
   User.destroy({
      where: {
         id: req.params.id,
      },
   })
      .then((dbUserData) => {
         if (!dbUserData) {
            res.status(404).json({ message: 'User not found' });
            return;
         }
         res.json(dbUserData);
      })
      .catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});

module.exports = router;
