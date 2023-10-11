"use client";

import { useState } from "react"

const AddPembeli = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleModal = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <button className="btn btn-link btn-sm" onClick={handleModal}>
                Tambah Pembeli
            </button>

            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-3">
                        Tambah pembeli
                    </h3>
                    <form>
                        <div className="form-control w-full">
                            <label className="label font-bold">Nama Pembeli</label>
                            <input type="text" className="input input-bordered" placeholder="Nama Pembeli" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Nomor HP</label>
                            <input type="number" className="input input-bordered" placeholder="Nama Pembeli" />
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

export default AddPembeli