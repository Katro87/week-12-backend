import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ReviewsService {
  constructor(private db: DatabaseService) {}

  // GET ALL REVIEWS FROM DATABASE
  async findAll() {
    const sql = `
      SELECT reviews.*, users.name as user_name 
      FROM reviews 
      JOIN users ON reviews.user_id = users.id 
      ORDER BY created_at DESC
    `;
    return this.db.query(sql);
  }

  // CREATE REVIEW IN DATABASE
  async create(title: string, content: string, rating: number, userId: number) {
    const sql = `
      INSERT INTO reviews (title, content, rating, user_id) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *
    `;
    return this.db.query(sql, [title, content, rating, userId]);
  }

  // GET REVIEWS BY USER
  async findByUser(userId: number) {
    const sql = 'SELECT * FROM reviews WHERE user_id = $1 ORDER BY created_at DESC';
    return this.db.query(sql, [userId]);
  }
}