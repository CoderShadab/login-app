import bcrypt from 'bcrypt'
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server';

export async function POST(
    request: Request
) {
    const body = await request.json();
    const {
        email,
        name,
        password
    } = body;

    // Check if any of the required fields are empty
    if (!email || !name || !password) {
        return new NextResponse('Please provide all required fields.', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword
        }
    });

    return NextResponse.json(user);
}
