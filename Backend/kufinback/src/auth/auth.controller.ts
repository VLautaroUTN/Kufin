import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { UsuariosService } from '../usuarios/usuarios.service'; // <--- 1. Importa el servicio

@Controller('auth')
export class AuthController {
  private client = new OAuth2Client("385747106173-4p6cht7sgq9h3q23jg459fdjlkb5omph.apps.googleusercontent.com");

  // 2. Inyecta el servicio en el constructor
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('google')
  async googleAuth(@Body('token') token: string) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: "385747106173-4p6cht7sgq9h3q23jg459fdjlkb5omph.apps.googleusercontent.com",
      });
      
      const payload = ticket.getPayload();
      if (!payload || !payload.email || !payload.name) {
        throw new UnauthorizedException("No se pudo obtener la información del usuario");
      }

      // 3. Llamamos al servicio para guardar o recuperar el usuario de la DB
      const usuario = await this.usuariosService.findOrCreate({
        googleSub: payload.sub,
        email: payload.email,
        nombre: payload.name,
      });

      // 4. Devolvemos la info, incluyendo el grupoId que viene de la DB
      return { 
        usuarioId: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        grupoId: usuario.grupoId, // Esto es lo que usaremos para filtrar gastos
        foto: payload.picture // Seguimos trayendo la foto al vuelo desde Google
      };

    } catch (error) {
      throw new UnauthorizedException("Token inválido");
    }
  }
}