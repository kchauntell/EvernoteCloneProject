const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// Sign up
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;
    const user = await User.signup({ firstName, lastName, email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user
    });
  })
);

//Testing Sign Up
// fetch('/api/users', {
//   method: 'POST',
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
//   },
//   body: JSON.stringify({
//     firstName: 'Spider',
//     lastName: 'Man',
//     email: 'spidey@spider.man',
//     username: 'Spidey',
//     password: 'p@sswordSpider1'
//   })
// }).then(res => res.json()).then(data => console.log(data));

module.exports = router;
