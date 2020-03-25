exports.getMessages = (req, res) => {
    res.status(200).json({
        _id: '45',
        messageTo: "pero.kero01@gmail.com",
        messageFrom: "test@test.js",
        messageTitle: "Hello",
        messgeDate: new Date().toISOString() 
    })
}

exports.postMessages = (req, res) => {
    const {
        messageTitle, 
        messageContent
    } = req.body;
    //creat it into db 
    res.status(200).json({
        message: messageContent,
        title: messageTitle,
        date: new Date()
    })
}