import { PrismaClient } from "@prisma/client"
import AddPembelian from "./addPembelian";

const prisma = new PrismaClient();

const getPembelian = async () => {
    const res = await prisma.pembelian.findMany();
    return res;
}


const Pembelian = async () => {
    const pembelian = await getPembelian();

    return (
        <div>
            <h2 className="mb-2 font-bold-text-lg">Pembelian</h2>
            <div className="mb-2">
                <AddPembelian />
            </div>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nama Barang</th>
                        <th>Harga Barang</th>
                        <th>Keterangan</th>
                        <th>Tanggal Pembelian</th>
                        <th className="text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {pembelian.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.nama_barang}</td>
                            <td>{item.harga_barang}</td>
                            <td>{item.keterangan}</td>
                            <td>{item.tgl_beli}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Pembelian