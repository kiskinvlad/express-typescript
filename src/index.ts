import 'dotenv/config';
import { logger } from "./config";
import app from './App';

const port = process.env.PORT || 3000; 

app.listen(port, (err) => { 
  if (err) { 
    return logger.error(err) 
  } 
  return logger.info(`Server is listening on port ${port}`);
})