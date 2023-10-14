import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Brand } from "@prisma/client";
const prisma = new PrismaClient();

export const PATCH = async (request: Request, { params }: { params: { brandId: string } }) => {
    const body: Brand = await request.json();
    const brand = await prisma.brand.update({
        where: {
            id: params.brandId
        }, data: {
            name: body.name
        }
    });

    return NextResponse.json(brand, { status: 200 });
}

export const DELETE = async (request: Request, { params }: { params: { brandId: string } }) => {
    const brand = await prisma.brand.delete({
        where: {
            id: params.brandId
        }
    });
    return NextResponse.json(brand, { status: 200 });
};