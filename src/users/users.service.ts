import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private db: DatabaseService) {}

  // Get all users FROM DATABASE
  async findAll() {
    const users = await this.db.query(
      'SELECT id, email, name FROM users ORDER BY created_at DESC'
    );
    return users;
  }

  // Find user by ID FROM DATABASE
  async findOne(id: number) {
    const users = await this.db.query(
      'SELECT id, email, name FROM users WHERE id = $1',
      [id]
    );
    return users[0] || null;
  }

  // Find user by email (for auth)
  async findByEmail(email: string) {
    const users = await this.db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return users[0] || null;
  }

  // Update user profile IN DATABASE
  async update(id: number, data: { name?: string; password?: string }) {
    if (data.name) {
      await this.db.query(
        'UPDATE users SET name = $1 WHERE id = $2',
        [data.name, id]
      );
    }
    if (data.password) {
      await this.db.query(
        'UPDATE users SET password = $1 WHERE id = $2',
        [data.password, id]
      );
    }
    return this.findOne(id);
  }

  // Delete user FROM DATABASE
  async delete(id: number) {
    const result = await this.db.query(
      'DELETE FROM users WHERE id = $1 RETURNING id',
      [id]
    );
    return { success: result.length > 0 };
  }
}