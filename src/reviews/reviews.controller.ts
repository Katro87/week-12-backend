import { Controller, Get, Post, Body } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // GET /reviews
  @Get()
  async findAll() {
    return this.reviewsService.findAll();
  }

  // POST /reviews
  @Post()
  async create(@Body() body: any) {
    const { title, content, rating, userId } = body;
    return this.reviewsService.create(title, content, rating, userId);
  }
}