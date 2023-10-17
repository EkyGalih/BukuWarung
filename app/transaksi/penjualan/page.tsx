import { PrismaClient } from "@prisma/client"
import AddPenjualan from "./addPenjualan";

const prisma = new PrismaClient();

const getPenjualan = async () => {
    const res = await prisma.penjualan.findMany({
        include: {
            pembeli: true,
            product: true
        }
    });
    return res;
};

const getProducts = async () => {
    const res = await prisma.product.findMany({
        select: {
            id: true,
            title: true,
            berat: true,
            satuan: true
        }
    });
    return res;
}

const getPembeli = async () => {
    const res = await prisma.pembeli.findMany();
    return res;
};

const Penjualan = async () => {
    const [penjualans, pembelis, products] = await Promise.all([getPenjualan(), getPembeli(), getProducts()]);

    return (
        <div>
            <div className="mb-2">
                <AddPenjualan pembelis={pembelis} products={products} />
            </div>

            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nama Pembeli</th>
                        <th>Tanggal Pembelian</th>
                        <th>Produk</th>
                        <th>Keterangan</th>
                        <th className="text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {penjualans.map((penjualan, index) => (
                        <tr key={index}>    
                            <td>{index + 1}</td>
                            <td>{penjualan.pembeli.nama_pembeli}</td>
                            <td>{penjualan.tgl_jual}</td>
                            <td>{penjualan.product.title}</td>
                            <td>{penjualan.keterangan}</td>
                            <td className="flex justify-center space-x-1">
                                {/* <UpdateProduct brands={brands} product={product} />
                                <DeleteProduct product={product} /> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Penjualan