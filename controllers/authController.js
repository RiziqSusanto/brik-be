const { Users } = require('../models');
const jwtConfig = require('../config/jwtConfig');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Users.create({
            id: uuidv4(),
            email,
            password: hashedPassword,
            name,
        });

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ where: { email } });

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid password' });
            return;
        }

        const token = jwt.sign(
            {
                userId: user.id,
                name: user.name,
                email: user.email
            }, jwtConfig.secretKey,
            { expiresIn: jwtConfig.expiresIn });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    register,
    login,
};
