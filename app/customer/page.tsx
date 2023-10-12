import { PrismaClient } from "@prisma/client"
import AddCustomer from "./addCustomer";
import UpdateCustomer from "./updateCustomer";
import DeleteCustomer from "./deleteCustomer";
const prisma = new PrismaClient();

const getCustomers = async () => {
    const res = await prisma.pembeli.findMany({
        select: {
            id: true,
            nama_pembeli: true,
            no_hp: true,
        }
    });
    return res;
};

const Customer = async () => {
    const customers = await getCustomers();

    return (
        <div>
            <div className="mb-2">
                <AddCustomer />
            </div>

            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nama Pelanggan</th>
                        <th>No Handphone</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer, index) => (
                        <tr key={customer.id}>
                            <td>{index + 1}</td>
                            <td>{customer.nama_pembeli}</td>
                            <td>{customer.no_hp}</td>
                            <td className="flex justify-center space-x-1">
                                <UpdateCustomer customer={customer}/>
                                <DeleteCustomer customer={customer} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Customer