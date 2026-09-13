import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info', // minimum level to log
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // log to console
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // log errors to file
    new winston.transports.File({ filename: 'logs/combined.log' }), // log all to file
  ],
});

export default logger;
