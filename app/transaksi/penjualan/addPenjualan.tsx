"use client";
import { SyntheticEvent, useState } from "react";
import type { Pembeli, Product } from "@prisma/client"; // digunakan untuk memanggil model brand berdasrkan type yang sudah dibuat
import { useRouter } from "next/navigation";
import axios from "axios";

const AddPenjualan = ({ pembelis, products }: { pembelis: Pembeli[], products: Product[] }) => {
    const [pembeli, setPembeli] = useState("");
    const [produk, setProduk] = useState("");
    const [harga, setHarga] = useState("");
    const [qty, setQty] = useState("");
    const [total, setTotal] = useState("");
    const [keterangan, setKeterangan] = useState("");
    const [msg, setMsg] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    const handleModal = () => {
        setIsOpen(!isOpen);
    }

    const getProduct = async (e: SyntheticEvent) => {
        e.preventDefault();
        const productId = e;
        // const res = await axios.get(`/api/products/${productId}`);
        console.log(e.target);
        
    }

    const saveProduct = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.post('/api/transaksi/penjualan', {
            pembeliId: pembeli,
            produkId: produk,
            harga: Number(harga),
            qty: Number(qty),
            total: Number(total),
            keterangan: keterangan,
        })
        setPembeli("");
        setProduk("");
        setHarga("");
        setQty("");
        setTotal("");
        setKeterangan("");
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
                Tambah Data
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
                        Tambah Data Penjualan</h3>
                    <hr />
                    <form onSubmit={saveProduct}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Nama Pembeli</label>
                            <select className="select select-bordered" value={pembeli} onChange={(e) => setPembeli(e.target.value)}>
                                <option value="" disabled>Pilih pembeli</option>
                                {pembelis.map((item) => (
                                    <option value={item.id} key={item.id}>{item.nama_pembeli}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Nama Produk</label>
                            <select className="select select-bordered" onChange={getProduct}>
                                <option value="" disabled>Pilih Produk</option>
                                {products.map((product) => (
                                    <option value={product.id} key={product.id}>{product.title}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Harga Produk</label>
                            <input type="text" value={harga} onChange={(e) => setHarga(e.target.value)} className="input input-bordered" placeholder="Harga Produk" disabled />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Jumlah</label>
                            <input type="text" value={qty} onChange={(e) => setQty(e.target.value)} className="input input-bordered" placeholder="Jumlah" disabled />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Total</label>
                            <input type="text" value={total} onChange={(e) => setTotal(e.target.value)} className="input input-bordered" placeholder="Total Belanja" disabled />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Keterangan</label>
                            <textarea className="textarea textarea-bordered" value={keterangan} onChange={(e) => setKeterangan(e.target.value)}></textarea>
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

export default AddPenjualan