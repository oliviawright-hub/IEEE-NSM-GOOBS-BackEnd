const { User } = require('../mongo/userSchema');

function normalizeDateToISO(date) {
    const dateObj = new Date(date);
    dateObj.setHours(0, 0, 0, 0);
    return dateObj.toISOString().split('T')[0]; 
}


async function addProgress(id, progressData){
    const user = await User.findById(id);
    if(!user){
        throw new Error('User not found');
    }
    user.progress.push(progressData);
    await user.save();

    return user.progress;
}

async function getProgress(id, date) {
    const user = await User.findById(id);
    if (!user) {
        throw new Error('User not found');
    }

    const inputDateString = normalizeDateToISO(date);

    const progressFromDate = user.progress.filter(progress => {
        const progressDateString = normalizeDateToISO(progress.date);
        return progressDateString === inputDateString;
    });

    return progressFromDate;
}