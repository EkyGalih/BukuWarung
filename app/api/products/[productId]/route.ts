import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Product } from "@prisma/client"; // mengambil type dari model prisma yang dibuat
const prisma = new PrismaClient();

export const PATCH = async (request: Request, { params }: { params: { productId: string } }) => {
    const body: Product = await request.json();
    const product = await prisma.product.update({
        where: {
            id: params.productId
        }, data: {
            title: body.title,
            price: body.price,
            berat: body.berat,
            satuan: body.satuan,
            brandId: body.brandId
        }
    });
    return NextResponse.json(product, {status: 200});
}

export const DELETE = async (request: Request, { params }: { params: { productId: string } }) => {
    const product = await prisma.product.delete({
        where: {
            id: params.productId
        }
    });
    return NextResponse.json(product, {status: 200});
}
