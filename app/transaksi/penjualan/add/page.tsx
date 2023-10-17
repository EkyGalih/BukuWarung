"use client";
import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import AddPembeli from "../../../tools/customer/addCustomer";
import type { Product } from "@prisma/client";

const AddPenjualans = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [customers, setCustomers] = useState<any[]>([]);

    const [pembeli, setPembeli] = useState("");
    const [produk, setProduk] = useState("");
    const [idProduk, setIdProduk] = useState("");
    const [harga, setHarga] = useState(0);
    const [qty, setQty] = useState("");
    const [total, setTotal] = useState(0);
    const [tglJual, setTglJual] = useState("");
    const [stausBayar, setStatusBayar] = useState("belum lunas")
    const [keterangan, setKeterangan] = useState("");
    const [msg, setMsg] = useState("");
    const [daftarBarang, setSubProduk] = useState<any[]>([]);

    useEffect(() => {
        getCustomers();
        getProduct();
    }, []);

    const getCustomers = async () => {
        const res = await axios.get('/api/customer');
        setCustomers(res.data);
    }

    const getProduct = async () => {
        const res = await axios.get('/api/products');
        setProducts(res.data);
    }

    const router = useRouter();

    async function getProductById(event: React.ChangeEvent<any>) {
        event.preventDefault();
        const productId = event.target.value;
        const res = await axios.get(`/api/products/${productId}`);
        setHarga(res.data.price);
        setIdProduk(res.data.id);
        setProduk(res.data.title);
    };

    const jumlahBarang = async (e: React.ChangeEvent<any>) => {
        setQty(e.target.value);
    }

    const ketBarang = async (e: React.ChangeEvent<any>) => {
        setKeterangan(e.target.value);
    }

    const addBarang = (e: SyntheticEvent) => {
        var barang = [...daftarBarang];
        let array = { idProduk: idProduk, nproduk: produk, nharga: harga, nqty: qty, nket: keterangan };
        if (array) {
            barang = [...daftarBarang, array];
        } else {
            barang.splice(daftarBarang.indexOf(array), 1);
        }
        setSubProduk(barang);
        setTotal(barang.reduce((a, v) => a = a + v.nharga, 0));
    }

    const saveProduct = async (e: SyntheticEvent) => {
        e.preventDefault();
        for (const item of daftarBarang) {
            await axios.post('/api/transaksi/penjualan', {
                pembeliId: pembeli,
                productId: item.idProduk,
                harga_barang: Number(item.nharga),
                quantity: Number(item.nqty),
                total_price: Number(total),
                keterangan: item.nket,
                tgl_jual: tglJual
            })
        }
        setPembeli("");
        setProduk("");
        setIdProduk("");
        setHarga(0);
        setQty("");
        setTotal(0);
        setTglJual("");
        setKeterangan("");
        setSubProduk([]);
        setMsg("Data Penjualan ditambahkan!");
        router.refresh();
    };
    return (
        <div>
            {msg !== ''
                ? <div className="alert alert-success mt-5 mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{msg}</span>
                </div>
                : ''
            }

            <h3 className="font-bold text-lg mb-3">
                Tambah Data Penjualan</h3>
            <hr />
            <AddPembeli />
            <form onSubmit={saveProduct}>
                <div className="form-control join-item mr-1">
                    <label className="label font-bold">Nama Pembeli</label>
                    <select className="select select-bordered" value={pembeli} onChange={(e) => setPembeli(e.target.value)}>
                        <option value="" disabled>Pilih pembeli</option>
                        {customers.map((item) => (
                            <option value={item.id} key={item.id}>{item.nama_pembeli +' - '+ item.no_hp}</option>
                        ))}
                    </select>
                </div>
                <div className="form-control join-item">
                    <label className="label font-bold">Tanggal Transaksi</label>
                    <input type="date" value={tglJual} onChange={(e => setTglJual(e.target.value))} className="input input-bordered" placeholder="Tgl Beli" />
                </div>
                <div className="join">
                    <div className="form-control w-full mr-1">
                        <label className="label font-bold">Nama Produk</label>
                        <select className="select select-bordered" onChange={getProductById}>
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
                        <input type="number" onChange={jumlahBarang} className="input input-bordered" placeholder="Jumlah" />
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
                                <td>{item.nproduk}</td>
                                <td>{item.nharga.toLocaleString('id-ID', { style: 'currency', currency: "IDR", minimumFractionDigits: 0 })}</td>
                                <td>{item.nqty}</td>
                                <td>{(item.nqty * item.nharga).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}</td>
                                <td>{item.nket}</td>
                                <td></td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={4} className="font-bold">Total</td>
                            <td className="font-bold">{daftarBarang.reduce((a, v) => a = a + v.nharga, 0).toLocaleString('id-ID', { style: 'currency', currency: "IDR", minimumFractionDigits: 0 })}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="form-control w-full">
                    <label className="label font-bold">Status Pembayaran</label>
                    <input type="checkbox" className="toggle" value={stausBayar} onChange={(e) => setStatusBayar(e.target.value)} />
                </div>
                <div className="modal-action">
                    <a href="/transaksi/penjualan" type="button" className="btn btn-error">
                        <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        Kembali
                    </a>
                    <button type="submit" className="btn btn-success">
                        <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                        </svg>
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddPenjualans