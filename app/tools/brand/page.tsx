import { PrismaClient } from "@prisma/client"
import AddBrand from "./addBrand";
import UpdateBrand from "./updateBrand";
import DeleteBrand from "./deleteBrand";
const prisma = new PrismaClient();

const getBrand = async () => {
    const res = await prisma.brand.findMany();
    return res;
}

const Brand = async () => {
    const brands = await getBrand();

    return (
        <div>
            <div className="mb-2">
                <AddBrand />
            </div>

            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nama Brand</th>
                        <th>Jumlah produk</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {brands.map((brand, index) => (
                        <tr key={brand.id}>
                            <td>{index + 1}</td>
                            <td>{brand.name}</td>
                            <td>{}</td>
                            <td className="flex space-x-1">
                                <UpdateBrand brand={brand}/>
                                <DeleteBrand brand={brand}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Brand