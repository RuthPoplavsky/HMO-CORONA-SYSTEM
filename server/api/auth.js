const express = require('express');
const router = express.Router();
const MemberRoute = require('../routes/member.route');
const memberRoute = new MemberRoute()
const logger = require('../middlewares/logger');
const errorMW = require('../middlewares/errors');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// // Register
// router.post("/register", async (req, res, next) => {
//     try {
//         // Check if User exists 
//         const existingMember = await memberRoute.validateById(req.body.id);
//         if (existingMember) {
//             return res.status(400).json({ error: 'Member already exists' });
//         }

//         // Encrypt user password
//         const encryptedPassword = await bcrypt.hash(req.body.password, 10);
//         const user = { ...req.body, password: encryptedPassword };

//         // Register the user
//         const result = await memberRoute.insert(user);
//         if (result.error) {
//             return res.status(400).json({ error: result.error });
//         }

//         // Create and send the token
//         const token = jwt.sign(
//             { userId: result.id, userName: result.name },
//             process.env.TOKEN_KEY,
//             { expiresIn: "2h" }
//         );

//         res.status(201).json({ token, result });
//     } catch (error) {
//         next(error);
//     }
// });



// Login
router.post("/login", async (req, res, next) => {
    try {
        console.log("try!!!!!!!!!!!!!!11");
        systemPassword = process.env.SYSTEM_PASSWORD
        // Get password
        const { password } = req.body;

        // Validate password
        if (!password) {
            return res.status(400).send("System password is required");
        }

        // const isPasswordValid = await bcrypt.compare(password, systemPassword);

        // if (!isPasswordValid) {
        //     return res.status(400).send("Invalid Credentials");
        // }
        // systemPassword = password;
        if (password != systemPassword) {
            return res.status(400).send("Invalid Credentials");
        }

        // Create and send the token
        const token = jwt.sign(
            { systemPassword: systemPassword},
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        // Include the token in the response
        res.status(200).json({token});
    } catch (err) {
        // Handle other errors gracefully
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.use(errorMW);
module.exports = router;

