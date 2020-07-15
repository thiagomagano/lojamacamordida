const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config()


const app = express();

app.use(cors());
app.use(express.json())



app.post('/subscribe', async (req, res) => {

    const data = {
        members: [{
            email_address: req.body.email,
            status: "subscribed",
            merge_fields: {
                NAME: req.body.name,
                PHONE: req.body.phone,
                GENDER: req.body.gender,
            }
        }]
    };

    //cria URL DO REQUEST
    const url = "https://us10.api.mailchimp.com/3.0/lists/" + process.env.AUDIENCE_ID;

    await axios({
        method: 'post',
        url: url,
        data: JSON.stringify(data),
        auth: {
            username: "macamordida",
            password: process.env.API_KEY
        },
        header: {
            contentType: "application/json"
        },
    }).then(response => {
        console.log(response.status)
        res.json(data)
    }).catch(err => console.log(err));

})


app.listen(3333, () => console.log('Sever up on port: http://localhost:3333'))