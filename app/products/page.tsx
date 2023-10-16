import { PrismaClient } from "@prisma/client"
import AddProduct from "./addProduct";
import DeleteProduct from "./deleteProduct";
import UpdateProduct from "./updateProduct";
const prisma = new PrismaClient();

const getProducts = async () => {
    const res = await prisma.product.findMany({
        select: {
            id: true,
            title: true,
            price: true,
            brandId: true,
            brand: true,
            Sold: true,
            satuan: true,
            berat: true,
        },
    });
    return res;
};

const getBrands = async () => {
    const res = await prisma.brand.findMany();
    return res;
};

const Product = async () => {
    const [products, brands] = await Promise.all([getProducts(), getBrands()]);

    return (
        <div>
            <div className="mb-2">
                <AddProduct brands={brands} />
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
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{product.title}</td>
                            <td>{product.berat}/{product.satuan}</td>
                            <td>{product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}</td>
                            <td>{product.Sold}</td>
                            <td>
                                {product.brand.name === 'Sambal'
                                    ? <span className="badge badge-error">{product.brand.name}</span>
                                    : product.brand.name === 'Makanan'
                                        ? <span className="badge badge-warning">{product.brand.name}</span>
                                        : product.brand.name === 'Minuman'
                                            ? <span className="badge badge-info">{product.brand.name}</span>
                                            : ''
                                }
                            </td>
                            <td className="flex justify-center space-x-1">
                                <UpdateProduct brands={brands} product={product} />
                                <DeleteProduct product={product} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Product