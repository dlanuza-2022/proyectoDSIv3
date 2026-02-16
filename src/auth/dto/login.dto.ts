import { ApiProperty } from "@nestjs/swagger";


export class loginDto {
    @ApiProperty({required: true})
    email: string;

    @ApiProperty({required: true})
    password: string;
}
