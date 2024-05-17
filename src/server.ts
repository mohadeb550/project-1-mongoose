import config from './app/config';
import app from './app';

const mongoose = require('mongoose');

async function main() {
  try {
    // connecting with mongodb database
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Server is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
