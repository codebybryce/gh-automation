import { db } from '../config/dbConfig.js';
import dayjs from 'dayjs';
import { logger } from './loggerService.js';

db.run(`CREATE TABLE IF NOT EXISTS dailyProblem (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question TEXT,
  answered INT
)`);

// Create a table
db.run(`CREATE TABLE IF NOT EXISTS regexPatterns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    useCase TEXT UNIQUE,
    answered INT,
    date TEXT
  )`);

// Insert Data
const insertQuestion = (name, answered) => {
  db.run(`INSERT INTO dailyProblem (question, answered) VALUES (?, ?)`, [name, answered], function(err) {
    if (err) {
      return logger(err);
    }
    logger(`A row has been inserted with ID ${this.lastID}`);
  });
};


const insertRegex = (useCase, answered, date) => {
    db.run(`INSERT INTO regexPatterns (useCase, answered, date) VALUES (?, ?, ?)`, [useCase, answered, date], function(err) {
        if (err) {
          return console.error(err.message);
        }
        logger(`A row has been inserted with ID ${this.lastID}`);
      });
}

// Retrieve Data
export const getQuestions = () => {
  db.all(`SELECT * FROM dailyProblem`, [], (err, rows) => {
    if (err) {
      throw err;
    }
    logger(`${dayjs().format()} ${rows}`);
  });
};

export const getRegex = () => {
    return new Promise((resolve,reject)=> db.all(`SELECT * FROM regexPatterns WHERE answered = 0`, [], (err, rows) => {
      if (err) {
        reject(err)
      }
        resolve({rows:rows})
    }))
  }

export const updateRegexAnswered = async (id, answered) =>{
  db.run(`UPDATE regexPatterns SET answered = ? WHERE id = ?`,
  [answered, id],
  function (err) {
    if (err) {
      return console.error(err.message);
    }
    if (this.changes === 0) {
      logger(`No problem found with ID ${id}`);
    } else {
      logger(`Problem with ID ${id} updated.`);
    }
  });

}


export const updateQuestion = (id, answered) => {
    db.run(
      `UPDATE dailyProblem SET answered = ? WHERE id = ?`,
      [answered, id],
      function (err) {
        if (err) {
          return console.error(err.message);
        }
        if (this.changes === 0) {
          logger(`No problem found with ID ${id}`);
        } else {
          logger(`Problem with ID ${id} updated.`);
        }
      }
    );
  };
  

export const deleteQuestion = (id) => {
    db.run(`DELETE FROM dailyProblem WHERE id = ?`, [id], function(err) {
      if (err) {
        return console.error(err.message);
      }
      if (this.changes === 0) {
        logger(`No problem found with ID ${id}`);
      } else {
        logger(`Problem with ID ${id} deleted.`);
      }
    });
  };
// Close the database

process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    logger('Closed the database connection.')
    process.exit(0)
  });
});


