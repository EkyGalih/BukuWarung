"use client";

import { Pembeli } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteCustomer = ({ customer }: { customer: Pembeli }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const router = useRouter();

    const handleModal = () => {
        setIsOpen(!isOpen);
    }

    const deleteCustomer = async (customerId: string) => {
        await axios.delete(`/api/customer/${customerId}`);
        router.refresh();
        setMsg("Customer dihapus!");
        setIsOpen(false);
    }
    return (
        <div>
            <button className="btn btn-error btn-sm tooltip" data-tip="Hapus Customer" onClick={handleModal}>
                <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                    <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                </svg>
            </button>


            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Apakah anda yakin ingin menghapus customer {customer.nama_pembeli}?</h3>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleModal}>Tidak</button>
                        <button type="button" onClick={() => deleteCustomer(customer.id)} className="btn btn-primary">Ya</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteCustomer