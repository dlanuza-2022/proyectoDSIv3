import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
  const email = createUserDto.email.trim().toLowerCase();

  return this.prisma.user.create({
    data: {
      ...createUserDto,
      email,
      password: bcrypt.hashSync(createUserDto.password, 10),
    },
  });
}

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
  const data: any = { ...updateUserDto };

  if (typeof data.email === 'string') {
    data.email = data.email.trim().toLowerCase();
  }

  if (typeof data.password === 'string' && data.password.length > 0) {
    data.password = bcrypt.hashSync(data.password, 10);
  } else {
    delete data.password;
  }

  return this.prisma.user.update({
    where: { id },
    data,
  });
}


  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
