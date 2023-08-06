// initalize bcrypt for password saftey
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;

const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR); // generate the random salt
    return bcrypt.hashSync(password, salt); // hash the user password and the random salt
}

const comparePassword = (candidatePassword, storedPassword) => {
    return bcrypt.compareSync(candidatePassword, storedPassword); // compare what the user enters for their password with that the stored password is
}

module.exports = { 
    encryptPassword,
    comparePassword,
}