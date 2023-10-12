import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Pembeli } from "@prisma/client";
const prisma = new PrismaClient();

export const PATCH = async (request: Request, { params }: { params: { customerId: string } }) => {
    const body: Pembeli = await request.json();
    const pembeli = await prisma.pembeli.update({
        where: {
            id: params.customerId
        }, data: {
            nama_pembeli: body.nama_pembeli,
            no_hp: body.no_hp
        }
    });
    return NextResponse.json(pembeli, { status: 200 });
}

export const DELETE = async (request: Request, { params }: { params: { customerId: string } }) => {
    const pembeli = await prisma.pembeli.delete({
        where: {
            id: params.customerId
        }
    });
    return NextResponse.json(pembeli, { status: 200 });
}