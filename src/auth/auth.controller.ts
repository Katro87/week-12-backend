import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

// Simple mock guard
const MockAuthGuard = { canActivate: () => true };

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /auth/register
  @Post('register')
  async register(@Body() registerDto: any) {
    return this.authService.register(registerDto);
  }

  // POST /auth/login
  @Post('login')
  async login(@Body() loginDto: any) {
    return this.authService.login(loginDto);
  }

  // GET /auth/profile (protected)
  @UseGuards(MockAuthGuard as any)
  @Get('profile')
  async getProfile(@Request() req: any) {
    // In real app, get userId from token
    const userId = 1; // Mock for now
    return this.authService.getProfile(userId);
  }
}