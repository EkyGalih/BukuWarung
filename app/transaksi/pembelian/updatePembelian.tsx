"use client";

import { Pembelian } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

const UpdatePembelian = ({ pembelian }: { pembelian: Pembelian }) => {
    const [nama_barang, setNamaBarang] = useState(pembelian.nama_barang);
    const [harga_barang, setHarga] = useState(pembelian.harga_barang);
    const [keterangan, setKeterangan] = useState(pembelian.keterangan);
    const [tgl_beli, setTanggal] = useState(pembelian.tgl_beli);

    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleModal = () => {
        setIsOpen(!isOpen);
    }

    const savePembelian = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.patch(`/api/transaksi/pembelian/${pembelian.id}`, {
            nama_barang: nama_barang,
            harga_barang: Number(harga_barang),
            keterangan: keterangan,
            tgl_beli: tgl_beli
        });
        router.refresh();
        setIsOpen(false);
    }

    return (
        <div>
            <button className="btn btn-warning btn-sm tooltip" data-tip="Ubah Data" onClick={handleModal}>
                <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                    <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                </svg>
            </button>

            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-3">
                        Ubah Pembelian
                    </h3>
                    <form onSubmit={savePembelian}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Nama Barang</label>
                            <input type="text" className="input input-bordered" value={nama_barang} onChange={(e) => setNamaBarang(e.target.value)} placeholder="Nama Barang" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Harga Barang</label>
                            <input type="number" className="input input-bordered" value={harga_barang} onChange={(e) => setHarga(Number(e.target.value))} placeholder="harga Barang" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Keterangan</label>
                            <textarea className="textarea textarea-bordered" value={keterangan} onChange={(e) => setKeterangan(e.target.value)}></textarea>
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Tanggal Pembelian</label>
                            <input type="date" className="input input-bordered" value={tgl_beli} onChange={(e) => setTanggal(e.target.value)} placeholder="Tanggal Transaksi" />
                        </div>
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

export default UpdatePembelian