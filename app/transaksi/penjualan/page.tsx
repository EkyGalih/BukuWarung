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
    const [penjualans, customers, products] = await Promise.all([getPenjualan(), getPembeli(), getProducts()]);

    return (
        <div>
            <div className="mb-2">
                {/* <AddPenjualan pembelis={pembelis} products={products} /> */}
                <a href="/transaksi/penjualan/add" className="btn btn-primary">
                    <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z" />
                    </svg>
                    Tambah Data
                </a>
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