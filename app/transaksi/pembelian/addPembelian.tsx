"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

const AddPembelian = () => {
    const [nama_barang, setNamaBarang] = useState("");
    const [harga_barang, setHarga] = useState("");
    const [keterangan, setKeterangan] = useState("");
    const [tgl_beli, setTanggal] = useState("");
    const [msg, setMsg] = useState("");

    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleModal = () => {
        setIsOpen(!isOpen);
    }

    const savePembelian = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.post('/api/transaksi/pembelian', {
            nama_barang: nama_barang,
            harga_barang: Number(harga_barang),
            keterangan: keterangan,
            tgl_beli: tgl_beli
        });
        setNamaBarang("");
        setHarga("");
        setKeterangan("");
        setTanggal("");
        setMsg("Catatan pembelian berhasil dibuat!");
        router.refresh();
        setIsOpen(false);
    }
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
                        Tambah Pembelian
                    </h3>
                    <form onSubmit={savePembelian}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Nama Barang</label>
                            <input type="text" className="input input-bordered" value={nama_barang} onChange={(e) => setNamaBarang(e.target.value)} placeholder="Nama Barang" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Harga Barang</label>
                            <input type="number" className="input input-bordered" value={harga_barang} onChange={(e) => setHarga(e.target.value)} placeholder="harga Barang" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Keterangan</label>
                            <textarea className="textarea textarea-bordered" value={keterangan} onChange={(e) => setKeterangan(e.target.value)}></textarea>
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Tanggal Pembelian</label>
                            <input type="text" className="input input-bordered" value={tgl_beli} onChange={(e) => setTanggal(e.target.value)} placeholder="Tanggal Transaksi" />
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

export default AddPembelian