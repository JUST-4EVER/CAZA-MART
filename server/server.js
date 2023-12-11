const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/UserRoutes');
const cookieParser = require('cookie-parser');
const userProfileRoutes = require('./routes/UserProfileRoutes');


const app = express();

const PORT_URL = process.env.PORT || 8800;

app.use(express.json());
app.use(cors());
app.use(cookieParser())
app.use('/api',userRoutes)
app.use('/api',userProfileRoutes)

app.listen(PORT_URL,() => {
    console.log(`listening on port ${PORT_URL}`);
})
