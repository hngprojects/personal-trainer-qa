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
const { generateReport } = require('./generate-report');

// Load .env from the project root (one level up from scripts/).
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const ROOT = path.join(__dirname, '..');
const env = process.env;

// Map .env keys -> Postman environment variable names (mirrors .env.example).
const VAR_MAP = {
  BASE_URL: 'base_url',

  // Credentials — drive the "0 SETUP" login flows
  ADMIN_EMAIL: 'admin_email',
  ADMIN_PASSWORD: 'admin_password',
  CLIENT_EMAIL: 'client_email',
  CLIENT_OTP: 'client_otp',
  TRAINER_EMAIL: 'trainer_email',
  TRAINER_PASSWORD: 'trainer_password',

  // Pre-issued tokens — override SETUP entirely if you paste real bearer tokens
  ADMIN_TOKEN: 'admin_token',
  CLIENT_TOKEN: 'client_token',
  TRAINER_TOKEN: 'trainer_token',

  // Known resource IDs — for endpoints that need an existing record
  CREATED_TRAINER_ID: 'created_trainer_id',
  CREATED_BOOKING_ID: 'created_booking_id',
  BOOKING_SLOT_ID: 'booking_slot_id',
  CREATED_CLIENT_ID: 'created_client_id',
};

const envVar = Object.entries(VAR_MAP)
  .filter(([envKey]) => env[envKey] !== undefined && env[envKey] !== '')
  .map(([envKey, pmKey]) => ({ key: pmKey, value: env[envKey] }));

// Optional `--folder "<name>"` passthrough.
const folderFlag = process.argv.indexOf('--folder');
const folder = folderFlag !== -1 ? process.argv[folderFlag + 1] : undefined;

// Throttle to avoid tripping the staging rate limiter (429 -> connection drops).
// Override via .env: DELAY_REQUEST (ms between requests), TIMEOUT_REQUEST (ms per request).
const delayRequest = Number(env.DELAY_REQUEST) || 400;
const timeoutRequest = Number(env.TIMEOUT_REQUEST) || 20000;

console.log(`▶ Newman run — overriding ${envVar.length} var(s) from .env` +
  ` | delay ${delayRequest}ms | timeout ${timeoutRequest}ms` +
  (folder ? ` | folder: "${folder}"` : ''));

newman.run(
  {
    collection: path.join(ROOT, 'postman', 'Personal Trainer — Staging.postman_collection.json'),
    environment: path.join(ROOT, 'postman', 'staging.postman_environment.json'),
    envVar,
    folder,
    delayRequest,
    timeoutRequest,
    reporters: ['cli', 'json'],
    reporter: { json: { export: path.join(ROOT, 'reports', 'latest-newman-report.json') } },
  },
  (err, summary) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    // Regenerate the human-readable execution report from the JSON, pass or fail.
    try {
      generateReport();
    } catch (e) {
      console.error(`⚠️  Report generation failed: ${e.message}`);
    }
    // Exit non-zero if any assertion/request failed, so CI catches it.
    const failures = summary && summary.run && summary.run.failures ? summary.run.failures.length : 0;
    process.exit(failures > 0 ? 1 : 0);
  }
);
