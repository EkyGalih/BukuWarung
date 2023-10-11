"use client";
import { SyntheticEvent, useState } from "react";
import type { Brand } from "@prisma/client"; // digunakan untuk memanggil model brand berdasrkan type yang sudah dibuat
import { useRouter } from "next/navigation";
import axios from "axios";

const AddProduct = ({ brands }: { brands: Brand[] }) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [berat, setBerat] = useState("");
    const [satuan, setSatuan] = useState("");
    const [msg, setMsg] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    const handleModal = () => {
        setIsOpen(!isOpen);
    }

    const saveProduct = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.post('/api/products', {
            title: title,
            price: Number(price),
            satuan: satuan,
            berat: Number(berat),
            Sold: Number(0),
            brandId: brand
        })
        setTitle("");
        setPrice("");
        setSatuan("");
        setBerat("");
        setBrand("");
        setMsg("Produk berhasil ditambahkan!");
        router.refresh();
        setIsOpen(false);
    };

    return (
        <div>
            <button className="btn btn-primary btn-sm" onClick={handleModal}>
                <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z" />
                </svg>
                Tambah Produk
            </button>

            {msg !== ''
                ? <div className="alert alert-success mt-5 mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{msg}</span>
                </div>
                : ''
            }

            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-3">
                        Tambah Produk Baru</h3>
                    <hr />
                    <form onSubmit={saveProduct}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Nama Produk</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input input-bordered" placeholder="Nama Produk" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Berat</label>
                            <input type="text" value={berat} onChange={(e) => setBerat(e.target.value)} className="input input-bordered" placeholder="Berat Produk" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Satuan</label>
                            <input type="text" value={satuan} onChange={(e) => setSatuan(e.target.value)} className="input input-bordered" placeholder="Satuan" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Harga</label>
                            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="input input-bordered" placeholder="Harga" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Brand</label>
                            <select className="select select-bordered" value={brand} onChange={(e) => setBrand(e.target.value)}>
                                <option value="" disabled>Pilih Brand</option>
                                {brands.map((brand) => (
                                    <option value={brand.id} key={brand.id}>{brand.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn btn-error" onClick={handleModal}>
                                <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                CLose
                            </button>
                            <button type="submit" className="btn btn-primary">
                                <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                                </svg>
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProduct