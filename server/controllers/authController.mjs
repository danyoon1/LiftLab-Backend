import { UserModel } from '../models/db.mjs';
import bcrypt from 'bcrypt';

const handleLogin = async (req, res) => {

    // check body for valid user/pwd
    const { user, password } = req.body;
    if (!user || !password) {
        return res.status(400).json({ 'message': 'Username and password are required' });
    }
    // check and set foundUser
    const foundUser = await UserModel.findOne({ username: user });
    if (!foundUser) {
        return res.sendStatus(401); // unauthorized
    }

    // if password matches
    if (await bcrypt.compare(password, foundUser.password)) {
        return res.status(200).json({ 'success': 'password matches' });
    } else {
        console.log('unfound')
        return res.sendStatus(401); // unauthorized
    }
}

export {
    handleLogin
};