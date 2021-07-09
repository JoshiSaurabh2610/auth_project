const Mailjet = (options) => {
    const mailjet = require('node-mailjet').connect(
        process.env.MJ_APIKEY,
        process.env.MJ_APISECRET
    )
    const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
            {
                From: {
                    Email: process.env.EMAIL_FROM,
                    Name: process.env.EMAIL_FROM_NAME
                },
                To: [
                    {
                        Email: options.toEmail,
                        Name: options.toName,
                    },
                ],
                Subject: options.subject,
                TextPart: 'Greetings from Mailjet!',
                HTMLPart: options.text
            },
        ],
    })
    request
        .then(result => {
            console.log(result.body)
        })
        .catch(err => {
            console.log(err.statusCode)
        })
};

export default Mailjet;