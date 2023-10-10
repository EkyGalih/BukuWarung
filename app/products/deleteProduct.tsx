"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Product = {
    id: number;
    title: string;
    price: number;
    brandId: number;
}

const DeleteProduct = ({ product }: { product: Product }) => {
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    const handleModal = () => {
        setIsOpen(!isOpen);
    }

    const deleteProduct = async (productId: number) => {
        await axios.delete(`/api/products/${productId}`);
        router.refresh();
        setIsOpen(false);
    };

    return (
        <div>
            <button className="btn btn-error btn-small" onClick={handleModal}>
                <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                    <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                </svg>
                Hapus
            </button>

            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Apakah anda yakin ingin menghapus produk {product.title}?</h3>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleModal}>Tidak</button>
                        <button type="button" onClick={() => deleteProduct(product.id)} className="btn btn-primary">Ya</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteProduct