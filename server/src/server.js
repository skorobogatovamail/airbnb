const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRouter');
const notesRouter = require('./routes/notesRouter');
const tokensRouter = require('./routes/tokensRouter');

const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/account', authRouter);
app.use('/api/notes', notesRouter);
app.use('/api/tokens', tokensRouter);

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
