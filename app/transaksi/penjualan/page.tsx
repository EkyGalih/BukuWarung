import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const getPenjualans = async () => {
    const res = await prisma.penjualan.findMany({
        include: {
            product: true,
            pembeli: true,
        }
    });
    return res;
};

const getBrands = async () => {
    const res = await prisma.brand.findMany();
    return res;
};

const Product = async () => {
    const penjualans = await getPenjualans(); 
    console.log(penjualans);
    

    return (
        <div>
            <div className="mb-2">

            </div>

            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nama Produk</th>
                        <th>Berat/Satuan</th>
                        <th>Harga</th>
                        <th>Jumlah Terjual</th>
                        <th>Brand</th>
                        <th className="text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
    )
}

export default Product