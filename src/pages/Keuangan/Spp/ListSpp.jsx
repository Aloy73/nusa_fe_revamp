import {
  deleteTipeTransaksi,
  getTipeTransaksi,
  updateTipeTransaksi,
} from "../../../api/TipeTransaksi";
import { DataTables } from "../../../components/DataTables";
import {
  AlertDelete,
  AlertPaymentProof,
  AlertUpdateStatusAktif,
  AlertUpdateStatusNonAktif,
} from "../../../components/ModalPopUp";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components";
import { getSpp } from "../../../api/Spp";

export default function ListSpp() {
  const [data, setData] = useState([]);
  // const [status, setStatus] = useState("");
  const statusAktif = "Aktif";
  const statusNonAktif = "Tidak Aktif";
  const [updateId, setUpdateId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [desc, setDesc] = useState("");
  const [filterText, setFilterText] = useState("");
  const [sts, setSts] = useState(undefined);
  const navigate = useNavigate();

  let filteredItems = data;

  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.student.firstName.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  const openPaymentProof = (url) => {
    AlertPaymentProof(url);
  };

  useEffect(() => {
    getSpp(setData, setSts);
  }, []);

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Nama Murid</div>,
      cell: (data) => (
        <div>{`${data.student.firstName} ${data.student.middleName} ${data.student.lastName}`}</div>
      ),
      width: "240px",
    },
    {
      name: <div>Spp Bulan</div>,
      cell: (data) => (
        <div>
          {(data.month == 1 && "Januari") ||
            (data.month == 2 && "Februari") ||
            (data.month == 3 && "Maret") ||
            (data.month == 4 && "April") ||
            (data.month == 5 && "Mei") ||
            (data.month == 6 && "Juni") ||
            (data.month == 7 && "Juli") ||
            (data.month == 8 && "Agustus") ||
            (data.month == 9 && "September") ||
            (data.month == 10 && "Oktober") ||
            (data.month == 11 && "November") ||
            (data.month == 12 && "Desember")}
        </div>
      ),
      width: "auto",
    },
    {
      name: <div>Semester</div>,
      cell: (data) => <div>{`Semester ${data.academicPeriode.increment}`}</div>,
      width: "auto",
    },
    {
      name: <div>Bukti Pembayaran</div>,
      cell: (data) => (
        <button
          title="Tampil Bukti Pembayaran"
          onClick={() => {
            openPaymentProof(data.invoice);
          }}
        >
          <i style={{ fontSize: "21px" }} className="fa fa-file" />
        </button>
      ),
      width: "auto",
    },
    {
      name: <div>Deskripsi</div>,
      cell: (data) => <div>{data.description}</div>,
      width: "210px",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <div>
          <button
            className="btn-action-merah"
            title="Edit"
            onClick={() =>
              navigateUbahSpp(
                data.id,
                data.amount,
                data.month,
                data.description,
                data.invoice,
                data.academicPeriode.id,
                data.academicPeriode.increment,
                data.student.code,
                data.student.firstName
              )
            }
          >
            <i className="fa fa-edit" /> Ubah
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
      width: "110px",
    },
  ];

  const navigateTambahSpp = () => {
    navigate("/admin/tambah-spp");
  };

  const navigateUbahSpp = (
    id,
    amount,
    month,
    description,
    invoice,
    periodeId,
    increment,
    code,
    studentName
  ) => {
    navigate("/admin/tambah-spp", {
      state: {
        id: id,
        amount: amount,
        month: month,
        description: description,
        invoice: invoice,
        periodeId: periodeId,
        increment: increment,
        code: code,
        studentName: studentName,
      },
    });
  };

  return (
    <>
      <Header
        home="Admin Keuangan"
        // prev="Bank"
        // navePrev={path}
        at="Spp"
        title="List Spp Terbayar"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTables
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahSpp}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
        />
      </div>
    </>
  );
}
