#!/usr/bin/env node
/**
 * Newman runner that bridges a local `.env` file into Postman variables.
 *
 * Newman does NOT read `.env` natively, so we load it here and map each
 * value to an `--env-var` override. Only variables that are actually set
 * in `.env` are overridden — blank ones fall back to whatever is in the
 * committed environment JSON.
 *
 * Usage:
 *   node scripts/run.js                 # run whole collection
 *   node scripts/run.js --folder "0 SETUP"   # run a single folder
 */
const path = require('path');
const newman = require('newman');

// Load .env from the project root (one level up from scripts/).
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const ROOT = path.join(__dirname, '..');
const env = process.env;

// Map .env keys -> Postman environment variable names.
const VAR_MAP = {
  ADMIN_EMAIL: 'admin_email',
  ADMIN_PASSWORD: 'admin_password',
  TRAINER_EMAIL: 'trainer_email',
  TRAINER_PASSWORD: 'trainer_password',
  TRAINER_SETUP_PASSWORD: 'trainer_setup_password',
  CLIENT_EMAIL: 'client_email',
  CLIENT_PASSWORD: 'client_password',
  CLIENT_OTP: 'client_otp',
  BASE_URL: 'base_url',
};

const envVar = Object.entries(VAR_MAP)
  .filter(([envKey]) => env[envKey] !== undefined && env[envKey] !== '')
  .map(([envKey, pmKey]) => ({ key: pmKey, value: env[envKey] }));

// Optional `--folder "<name>"` passthrough.
const folderFlag = process.argv.indexOf('--folder');
const folder = folderFlag !== -1 ? process.argv[folderFlag + 1] : undefined;

console.log(`▶ Newman run — overriding ${envVar.length} var(s) from .env` +
  (folder ? ` | folder: "${folder}"` : ''));

newman.run(
  {
    collection: path.join(ROOT, 'postman', 'Personal Trainer — Staging.postman_collection.json'),
    environment: path.join(ROOT, 'postman', 'staging.postman_environment.json'),
    envVar,
    folder,
    reporters: ['cli', 'json'],
    reporter: { json: { export: path.join(ROOT, 'reports', 'latest-newman-report.json') } },
  },
  (err, summary) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    // Exit non-zero if any assertion/request failed, so CI catches it.
    const failures = summary && summary.run && summary.run.failures ? summary.run.failures.length : 0;
    process.exit(failures > 0 ? 1 : 0);
  }
);
