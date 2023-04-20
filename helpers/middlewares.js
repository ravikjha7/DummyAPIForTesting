function checkFieldsPost(req, res, next) {
    const { name, city } = req.body
    if (name && city) {
        next()
    } else {
        res.status(400).json({ message: 'fields are not good' })
    }
}

module.exports = {
    checkFieldsPost
}