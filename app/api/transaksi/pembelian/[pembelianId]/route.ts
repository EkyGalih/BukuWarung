import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Pembelian } from "@prisma/client";
const prisma = new PrismaClient();

export const PATCH = async (request: Request, { params }: { params: { pembelianId: string } }) => {
    const body: Pembelian = await request.json();    
    const pembelian = await prisma.pembelian.update({
        where: {
            id: params.pembelianId
        }, data: {
            nama_barang: body.nama_barang,
            harga_barang: body.harga_barang,
            keterangan: body.keterangan,
            tgl_beli: body.tgl_beli
        }
    });
    return NextResponse.json(pembelian, { status: 200 });
}

export const DELETE = async (request: Request, { params }: { params: { pembelianId: string } }) => {
    const pembelian = await prisma.pembelian.delete({
        where: {
            id: params.pembelianId
        }
    });
    return NextResponse.json(pembelian, { status: 200 });
}