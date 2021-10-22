module.exports = {
    cleanText: text => text.trim(),
    capitalizeText: text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
    isAccepted: (array, loggedUser) => {
        return !loggedUser ? false : array.map(elm => loggedUser.role === elm).some(e => e === true)
    },
 
}