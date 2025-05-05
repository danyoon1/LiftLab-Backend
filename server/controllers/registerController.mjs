import { UserModel } from '../models/db.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const handleRegistration = async (req, res) => {
    const { user, password } = req.body;

    const duplicateUser = await UserModel.findOne({ username: user });
    if (duplicateUser) {
        return res.sendStatus(409);
    }

    console.log('user created')

    try {
        const hashedPwd = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            username: user,
            password: hashedPwd
        });

        res.status(201).json({ 'success': `${user} registered` });
    } catch (err) {
        res.status(500).json({ 'error': err.message });
    }
}

export {
    handleRegistration
};