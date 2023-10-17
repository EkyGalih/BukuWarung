import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export const metadata = {
  title: 'Buku Warung',
  description: 'aplikasi pencatatan buku warung denda',
}

const getTotalBelanja = async () => {
  const result = await prisma.pembelian.aggregate({
    _sum: {
      harga_barang: true
    }
  });
  return result;
};

const getTotalJual = async () => {
  const result = await prisma.penjualan.aggregate({
    _sum: {
      harga_barang: true
    }
  });
  return result;
}

const Home = async () => {
  const [totalBelanja, totalJual] = await Promise.all([getTotalBelanja(), getTotalJual()]);
  const Penjualan = totalJual._sum.harga_barang?.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  });
  const Belanja = totalBelanja._sum.harga_barang?.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  });
  const totalUntung = totalJual._sum.harga_barang - totalBelanja._sum.harga_barang;
  const keuntungan = totalUntung?.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  });
  
  return (
    <div>
      <div className="join">
        <div className="card w-96 bg-base-100 shadow-xl mr-2">
          <div className="card-body">
            <h2 className="card-title">Penjualan</h2>
            <p>Jumlah Penjualan Bulan ini adalah : {Penjualan ?? 0}</p>
            <div className="card-actions justify-end">
              <a href="/transaksi/penjualan" className="btn btn-success btn-sm">Detail</a>
            </div>
          </div>
        </div>

        <div className="card w-96 bg-base-100 shadow-xl mr-2">
          <div className="card-body">
            <h2 className="card-title">Pembelian</h2>
            <p>Total Belanja Bulan Ini adalah : {Belanja ?? 0}</p>
            <div className="card-actions justify-end">
              <a href="/transaksi/pembelian" className="btn btn-error btn-sm">Detail</a>
            </div>
          </div>
        </div>

        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Keuntungan</h2>
            <p>Keuntungan Bulan ini adalah {keuntungan}</p>
            <div className="card-actions justify-end">
              {/* <button className="btn btn-primary">Buy Now</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home