import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Pembeli } from "@prisma/client";
const prisma = new PrismaClient();

export const GET = async (request: Request) => {
    const customers = await prisma.pembeli.findMany({
        select: {
            id: true,
            nama_pembeli: true,
            no_hp: true,
        }
    });
    return NextResponse.json(customers, { status: 200 });
}

export const POST = async (request: Request) => {
    const body: Pembeli = await request.json();
    const product = await prisma.pembeli.create({
        data: {
            nama_pembeli: body.nama_pembeli,
            no_hp: body.no_hp
        }
    });
    return NextResponse.json(product, { status: 201 });
}