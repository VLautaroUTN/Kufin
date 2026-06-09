import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

@Controller('auth')
export class AuthController {
  private client = new OAuth2Client("385747106173-4p6cht7sgq9h3q23jg459fdjlkb5omph.apps.googleusercontent.com");

  @Post('google')
  async googleAuth(@Body('token') token: string) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: "385747106173-4p6cht7sgq9h3q23jg459fdjlkb5omph.apps.googleusercontent.com",
      });
      const payload = ticket.getPayload();
      if (!payload) {throw new UnauthorizedException("No se pudo obtener la información del usuario");}

      return { //Si todo resulta bien, devuelve datos del usuario
        usuarioId: payload.sub, 
        email: payload.email,
        nombre: payload.name,
        foto: payload.picture 
      };
    } 
    catch (error) {
      throw new UnauthorizedException("Token inválido");
    }
  }
}