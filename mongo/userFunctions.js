const User = require('./mongo/userSchema');


async function createUser(userData){
    try {
        const user = new User(userData);
        await user.save();
        console.log('Account created:', user);
        return user;
    } catch (error) {
        console.error('Error creating account.');
        throw error;
    }
}