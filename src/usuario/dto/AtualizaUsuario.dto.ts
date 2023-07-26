import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { EmailEhUnico } from '../validacao/email-eh-unico.validator';
import { CriaUsuarioDTO } from './CriaUsuario.dto';


export class AtualizaUsuarioDTO extends PartialType(CriaUsuarioDTO) {}
