import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const CreateGleanSchema = z.object({
    title: z.string().nonempty(),
    description: z.string().optional(),
});

export async function POST(req: NextRequest) {
    const body = await req.json();
    const validation = CreateGleanSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({ message: validation.error.message }, { status: 400 });
    };
    const { title, description } = body;
    return NextResponse.json({ title, description });
};
