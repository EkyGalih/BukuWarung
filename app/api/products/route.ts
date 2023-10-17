import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Product } from "@prisma/client"; // mengambil type dari model prisma yang dibuat
const prisma = new PrismaClient();

export const GET = async (request: Request) => {
    const product = await prisma.product.findMany({
        select: {
            id: true,
            title: true,
            price: true,
            berat: true,
            satuan: true,
        }
    });
    return NextResponse.json(product, { status: 200 });
}

export const POST = async (request: Request) => {
    const body: Product = await request.json();
    const product = await prisma.product.create({
        data: {
            title: body.title,
            price: body.price,
            satuan: body.satuan,
            berat: body.berat,
            brandId: body.brandId
        }
    });
    return NextResponse.json(product, { status: 201 });
}
