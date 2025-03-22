const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Social') // need to switch to come from a config file
 .then(() => {console.log('Connected to MongoDB');
 createUser();
 }) // better to use debug module for this
 .catch(err => console.error('Could not connect to MongoDB...', err))

const User = require('./userSchema');


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

/*async function createUser(){
    const user = new User({
        name: 'Silly Goober',
        username: 'hwhoefwoiewhnf',
        password: 'dhkfnljsfnle',
        email: 'esfeis@gmail.com',
        weight: 1
    });

    const result = await user.save();
    console.log(result);
}
*/
