const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const authFirebase = require('./routes/authRouterFirebase');
const tokensRouter = require('./routes/tokensRouter');
const entriesRouteFirebase = require('./routes/entriesRouterFirebase');

const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/authFirebase', authFirebase);
app.use('/api/tokens', tokensRouter);
app.use('/api/entriesFirebase', entriesRouteFirebase);

app.listen(PORT, () => console.log());
