import 'dotenv/config';
import { logger } from "./config";
import app from './App';

//require.main.filename = 'index.js'
const port = process.env.PORT || 3000; 
const name = process.env.NAME

app.listen(port, (err) => { 
  if (err) { 
    return logger.error(err) 
  } 
  return logger.info(`Hello ${name}, server is listening on port ${port}`);
})