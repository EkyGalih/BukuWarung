"use client";
import { SyntheticEvent, useState } from "react";
import type { Pembeli, Product } from "@prisma/client"; // digunakan untuk memanggil model brand berdasrkan type yang sudah dibuat
import { useRouter } from "next/navigation";
import axios from "axios";
import AddPembeli from "../../tools/customer/addCustomer";

const AddPenjualan = ({ pembelis, products }: { pembelis: Pembeli[], products: Product[] }) => {
    const [pembeli, setPembeli] = useState("");
    const [produk, setProduk] = useState("");
    const [harga, setHarga] = useState(0);
    const [qty, setQty] = useState("");
    const [total, setTotal] = useState(0);
    const [keterangan, setKeterangan] = useState("");
    const [msg, setMsg] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [daftarBarang, setSubProduk] = useState([]);

    const router = useRouter();

    const handleModal = () => {
        setIsOpen(!isOpen);
    }

    async function getProduct(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        const productId = event.target.value;
        const res = await axios.get(`/api/products/${productId}`);
        setHarga(res.data.price);
        setProduk(res.data.title);
    };

    const jumlahBarang = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setQty(e.target.value);

    }

    const ketBarang = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeterangan(e.target.value);

    }

    const addBarang = (e: SyntheticEvent) => {
       var barang = [...daftarBarang];
        barang = [...daftarBarang, produk];
        setProduk(barang);
        console.log(harga);
        
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
        setHarga(0);
        setQty("");
        setTotal(0);
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
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg mb-3">
                        Tambah Data Penjualan</h3>
                    <hr />
                    <AddPembeli />
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
                        <div className="join">
                            <div className="form-control w-full mr-1">
                                <label className="label font-bold">Nama Produk</label>
                                <select className="select select-bordered" onChange={getProduct}>
                                    <option value="" disabled>Pilih Produk</option>
                                    {products.map((product) => (
                                        <option value={product.id} key={product.id}>{product.title} - {product.berat + ' ' + product.satuan}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-control w-full mr-1">
                                <label className="label font-bold">Harga Produk</label>
                                <input type="text" value={harga} onChange={(e => setHarga(Number(e.target.value)))} className="input input-bordered" placeholder="Harga Produk" disabled />
                            </div>
                            <div className="form-control w-full mr-1">
                                <label className="label font-bold">Jumlah</label>
                                <input type="text" onChange={jumlahBarang} className="input input-bordered" placeholder="Jumlah" />
                            </div>
                            <div className="form-control w-full">
                                <label className="label font-bold">Keterangan</label>
                                <textarea className="textarea textarea-bordered" onChange={ketBarang}></textarea>
                            </div>
                        </div>
                        <button type="button" onClick={addBarang} className="btn btn-success btn-xs">
                            <svg className="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                            </svg>
                            Add
                        </button>

                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nama barang</th>
                                    <th>Harga</th>
                                    <th>Qty</th>
                                    <th>Total</th>
                                    <th>Ket</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {daftarBarang.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="modal-action">
                            <button type="button" className="btn btn-error" onClick={handleModal}>
                                <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                CLose
                            </button>
                            <button type="submit" className="btn btn-success">
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