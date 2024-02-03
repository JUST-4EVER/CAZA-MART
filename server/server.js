const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/UserRoutes');
const cookieParser = require('cookie-parser');
const userProfileRoutes = require('./routes/UserProfileRoutes');
const customerRoutes = require('./routes/CustomerRoutes');
const CustomerProfileRoutes = require('./routes/CustomerProfileRoutes');
const productRoutes = require('./routes/ProductRoutes');
const orderRoutes = require('./routes/OrderRoutes');
const reviewRoutes = require('./routes/ReviewRoutes');
const CategoryRoutes = require('./routes/CategoryRoutes');
const taskRoutes = require('./routes/taskRoutes');
const paymentRoutes = require('./routes/PaymentRoutes');


const app = express();

const PORT_URL = process.env.PORT || 8800;

app.use(express.json());
app.use(cors());
app.use(cookieParser())
app.use('/api', userRoutes)
app.use('/api', userProfileRoutes)
app.use('/api', customerRoutes)
app.use('/api', CustomerProfileRoutes)
app.use('/api', productRoutes)
app.use('/api', orderRoutes)
app.use('/api', reviewRoutes)
app.use('/api', CategoryRoutes)
app.use('/api', taskRoutes)
app.use('/api', paymentRoutes)

app.listen(PORT_URL, () => {
    console.log(`listening on port ${PORT_URL}`);
})
