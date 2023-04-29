const express = require("express")
const cors = require("cors")
const stripe = require('stripe')("sk_test_51MEHzBSJrk6wKKLa0TgHLkR98RLqpRZEfkRfVs7HdCBd4D9tNgShUIuBWq4tRSqWgBbRZz65w5Kdyg8DnbyevTVi00ue5eWSMB")

//API

//App config
const app = express();


//MiddleWare
app.use(cors({ origin: true }))
app.use(express.json())
//API Routes
app.get("/", (req, res) => {
    res.status(200).send("Hello World!! India here!!")
})
app.post('/payments/create', async (req, res) => {
    const total = req.query.total;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "inr",
    });
    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

app.listen(process.env.PORT || 4000, (err) => {
    if (err) console.log(err);
    console.log("Server is up and running")
})