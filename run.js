import app from "./app.js";
import { dataBaseRun } from "./db.js";

const { PORT } = process.env;

const startServer = async () => {
  try {
    await dataBaseRun();
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();