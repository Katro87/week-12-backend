import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AuthService {
  constructor(private db: DatabaseService) {}

  // Register user - takes object
  async register(data: { email: string; password: string; name: string }) {
    const { email, password, name } = data;
    
    // Check if user exists
    const existing = await this.db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (existing.length > 0) {
      throw new UnauthorizedException('User already exists');
    }

    // Create user IN DATABASE
    const result = await this.db.query(
      'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name',
      [email, password, name]
    );
    
    return {
      user: result[0],
      message: 'Registration successful'
    };
  }

  // Login user - takes object
  async login(data: { email: string; password: string }) {
    const { email, password } = data;
    
    // Find user IN DATABASE
    const users = await this.db.query(
      'SELECT id, email, name FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );
    
    if (users.length === 0) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      user: users[0],
      token: 'mock-token-' + Date.now(), // In real app, use JWT
      message: 'Login successful'
    };
  }

  // Get user profile
  async getProfile(userId: number) {
    const users = await this.db.query(
      'SELECT id, email, name FROM users WHERE id = $1',
      [userId]
    );
    return users[0] || null;
  }
}