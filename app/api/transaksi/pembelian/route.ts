import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Pembelian } from "@prisma/client";
const prisma = new PrismaClient();

export const POST = async (request: Request) => {
    const body: Pembelian = await request.json();
    console.log(body);
    
    const pembelian = await prisma.pembelian.create({
        data: {
            nama_barang: body.nama_barang,
            harga_barang: Number(body.harga_barang),
            keterangan: body.keterangan,
            tgl_beli: body.tgl_beli
        }
    });
    return NextResponse.json(pembelian, { status: 200 });
}