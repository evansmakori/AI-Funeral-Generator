import fs from "fs";
import path from "path";
import crypto from "crypto";
import { v4 as uuid } from "uuid";
import { ensureDir, dataRoot } from "../storage/paths";

function usersFilePath() {
  return path.join(dataRoot(), "users.json");
}

function readUsers() {
  const file = usersFilePath();
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeUsers(users) {
  ensureDir(path.dirname(usersFilePath()));
  fs.writeFileSync(usersFilePath(), JSON.stringify(users, null, 2), "utf8");
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

export function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const iterations = 120_000;
  const keylen = 32;
  const digest = "sha256";
  const hash = crypto.pbkdf2Sync(String(password), salt, iterations, keylen, digest).toString("hex");
  return { salt, hash, iterations, keylen, digest };
}

export function verifyPassword(password, stored) {
  if (!stored?.salt || !stored?.hash) return false;
  const computed = crypto
    .pbkdf2Sync(String(password), stored.salt, stored.iterations, stored.keylen, stored.digest)
    .toString("hex");
  return crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(stored.hash));
}

export function createUser({ email, password }) {
  const users = readUsers();
  const normalized = normalizeEmail(email);
  if (!normalized) throw new Error("Email is required");
  if (users.some((u) => u.email === normalized)) throw new Error("Email already exists");
  if (!password || String(password).length < 6) throw new Error("Password must be at least 6 characters");

  const id = uuid();
  const passwordHash = hashPassword(password);
  const user = {
    id,
    email: normalized,
    passwordHash,
    createdAt: new Date().toISOString()
  };
  users.push(user);
  writeUsers(users);
  return { id: user.id, email: user.email, createdAt: user.createdAt };
}

export function findUserByEmail(email) {
  const normalized = normalizeEmail(email);
  if (!normalized) return null;
  const users = readUsers();
  return users.find((u) => u.email === normalized) || null;
}

export function getUserPublicById(id) {
  const users = readUsers();
  const user = users.find((u) => u.id === id);
  if (!user) return null;
  return { id: user.id, email: user.email, createdAt: user.createdAt };
}
