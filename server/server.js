import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

const USERS_FILE = path.join(__dirname, 'users.json');

app.use(cors());                   
app.use(express.json());           

function readUsers() {
  try {
    if (!fs.existsSync(USERS_FILE)) {
      fs.writeFileSync(USERS_FILE, '[]');
      return [];
    }
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required (name, email, password).'
    });
  }

  const users = readUsers();
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: 'User already exists with this email.'
    });
  }
  const newUser = {
    id: Date.now(),
    name,
    email,
    password,  
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  writeUsers(users);

  console.log(`✅ New user signed up: ${email}`);

  return res.status(201).json({
    success: true,
    message: 'Account created successfully! You can now sign in.',
    user: { name: newUser.name, email: newUser.email }
  });
});

app.post('/api/signin', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required.'
    });
  }

  const users = readUsers();
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password.'
    });
  }
  if (user.password !== password) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password.'
    });
  }

  console.log(`✅ User logged in: ${email}`);

  return res.status(200).json({
    success: true,
    message: `Login successful! Welcome back, ${user.name}.`,
    user: { name: user.name, email: user.email }
  });
});
app.listen(PORT, () => {
  console.log(`\n🚀 Cinthesia Auth Server running on http://localhost:${PORT}`);
  console.log(`   POST /api/signup  — Create a new account`);
  console.log(`   POST /api/signin  — Log in to existing account\n`);
});
