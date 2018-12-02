import app from './App';
import * as dotenv from "dotenv"; 
import { logger } from "./config";

dotenv.config();
const port = process.env.PORT || 3000 

app.listen(port, (err) => { 
  if (err) { 
    return logger.error(err) 
  } 
  return logger.info(`Server is listening on port ${port}`);
})