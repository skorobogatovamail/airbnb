const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRouter');
const authFirebase = require('./routes/authRouterFirebase');
const tokensRouter = require('./routes/tokensRouter');
const entriesRouter = require('./routes/entriesRouter');

const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/authFirebase', authFirebase);
app.use('/api/tokens', tokensRouter);
app.use('/api/entries', entriesRouter);

app.listen(PORT, () => console.log());
