module.exports = {
    firstUpper: fullname => {
        const name = fullname.toLowerCase();
        return name.charAt(0).toUpperCase() + name.slice(1)
    },
    lowerCase: enrollment => {
        return enrollment.toLowerCase();
    }
}