module.exports.randomStr = (length) => {
    let string = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        string += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return string;
};
