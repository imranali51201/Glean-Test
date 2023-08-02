import { NextResponse } from 'next/server';
import { CreateGleanType } from './dto';
import Zod, { z } from 'zod';

const CreateGleanSchema = z.object({
    title: z.string().nonempty(),
    description: z.string().optional(),
});

export async function POST(req: Request) {
    const { body } = req;
    const validation = CreateGleanSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({ message: validation.error.message }, { status: 400 });
    }
    const { description, title } = body;
    return NextResponse.json({ title, description });
}
