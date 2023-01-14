const cleverbot = require('cleverbot-free'),
    express = require('express'),
    app = express(),
    cors = require('cors');


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const PORT = 8000;

app.post('/chatter', async (req, res) => {
    const { message } = req.body;
    const response = await cleverbot(message);
    res.json({
        response
    });
});
app.listen(PORT, (req, res) => {
    console.log('running');
});