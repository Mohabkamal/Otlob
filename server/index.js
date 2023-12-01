// express : node framework
const express = require('express')
const app = express()
const port = 3000


// routes  (request, respond)
app.get('/', (req, res) => {
  res.send('Hello World!')
})


console.log('hello world test')

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


