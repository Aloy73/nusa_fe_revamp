import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdmissionRegistration } from "../../api/Registrasi";
import { Header } from "../../components";
import { DataTablesPMBWithoutButton } from "../../components/DataTables";

const DataRegistrasi = () => {
  const [data, setData] = useState([]);
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();

  const [validationFilter, setValidationFilter] = useState("inreview");

  const handleFilterValidate = (event) => {
    setValidationFilter(event.target.value);
  };

  console.log("DATA === ", data);

  let filteredItems = data;

  if (data !== null) {
    const filteredValidation = data.filter((data) =>
      data.status.includes(validationFilter)
    );

    filteredItems = filteredValidation.filter(
      (data) =>
        data.regNumber.toLowerCase().includes(filterText.toLowerCase()) ||
        data.childName.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    getAdmissionRegistration(setData, setSts);
  }, []);

  const navigateRegistrationDetails = (code) => {
    localStorage.setItem("REG_NUMBER", code);
    navigate("/admin/list-detail-data-registrasi");
  };

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Nomor Registrasi</div>,
      selector: (data) => data.regNumber,
      cell: (data) => <div>{data.regNumber}</div>,
      width: "auto",
    },
    {
      name: <div>Nama Anak</div>,
      selector: (data) => data.childName,
      cell: (data) => <div className="capitalize">{data.childName}</div>,
      width: "auto",
    },
    {
      name: <div>Tahun Ajaran</div>,
      selector: (data) => data.admissionPhase.admission.academicYear.name,
      cell: (data) => (
        <div>{data.admissionPhase.admission.academicYear.name}</div>
      ),
      width: "auto",
    },
    {
      name: <div>Status Pendaftaran</div>,
      selector: (data) => data.status,
      cell: (data) => (
        <div
          className={
            data.status === "valid"
              ? "capitalize text-hijau"
              : "capitalize text-merah"
          }
        >
          {data.status === "valid" ? "Terverifikasi" : "Belum Terverifikasi"}
        </div>
      ),
      width: "auto",
    },
    // {
    //   name: <div>Status Tahapan</div>,
    //   selector: (data) => data.status,
    //   cell: (data) => (
    //     <div
    //       className={
    //         data.status === "valid"
    //           ? "capitalize text-hijau"
    //           : "capitalize text-merah"
    //       }
    //     >
    //       {data.status}
    //     </div>
    //   ),
    //   width: "auto",
    // },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <button
          className="btn-action-merah"
          onClick={() => navigateRegistrationDetails(data.regNumber)}
        >
          <i className="fa fa-eye"> Detail </i>
        </button>
      ),
      ignoreRowClick: true,
      button: true,
      width: "300px",
    },
  ];

  console.log("LAOS === ", validationFilter);

  return (
    <>
      <Header
        home="Admin PMB"
        // prev="Bank"
        // navePrev={path}
        at="Data Registrasi"
        title="Data Registrasi"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTablesPMBWithoutButton
          columns={columns}
          data={filteredItems}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          onChangeValidation={handleFilterValidate}
          valueValidation={validationFilter}
        />
      </div>
    </>
  );
};
export default DataRegistrasi;
