import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  // GET /users/:id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    // Convert string to number for database ID
    return this.usersService.findOne(parseInt(id, 10));
  }

  // POST /users (register) - NOTE: Use /auth/register instead
  @Post()
  async create(@Body() userData: any) {
    // This should be handled by auth/register
    return { message: 'Use /auth/register endpoint instead' };
  }

  // PUT /users/:id
  @Put(':id')
  async update(@Param('id') id: string, @Body() userData: any) {
    return this.usersService.update(parseInt(id, 10), userData);
  }

  // DELETE /users/:id
  @Delete(':id')
  async delete(@Param('id') id: string) {
    // We'll implement this method in service
    return this.usersService.delete(parseInt(id, 10));
  }
}