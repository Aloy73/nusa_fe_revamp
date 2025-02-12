import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postSpp } from "../../../api/Spp";
import { Header } from "../../../components";
import { AlertEmpty, AlertMessage } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";
import { UploaderComponent } from "@syncfusion/ej2-react-inputs";
import { useRef } from "react";
import { DropdownSiswa } from "../../../components/Dropdown";
import { useEffect } from "react";
import { getSemester } from "../../../api/TahunAjaran";
import { getMurid } from "../../../api/Murid";

export default function TambahSpp() {
  const [academicPeriodeData, setAcademicPeriodeData] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [amounts, setAmount] = useState();
  const [month, setMonth] = useState("");
  const [periodeId, setPeriodeId] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [sts, setSts] = useState(undefined);
  const [filesData, setFilesData] = useState(null);
  const navigate = useNavigate();
  const path = "/admin/list-spp";
  const uploaderRef = useRef(null);

  const fetchAcademicPeriode = () => {
    getSemester(setAcademicPeriodeData, setSts);
  };

  const fetchStudents = () => {
    getMurid(setStudentsData, setSts);
  };

  const navigateListSpp = () => {
    navigate(path);
  };

  useEffect(() => {
    fetchAcademicPeriode();
    fetchStudents();
  }, []);

  const asyncSettings = {
    saveUrl: "https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save",
    removeUrl: "https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove",
  };

  const minFileSize = 0;
  const maxFileSize = 5000000;

  const onRemoveFile = (args) => {};

  const onFileUpload = (args) => {};

  const onSuccess = (args) => {
    console.log("File uploaded successfully!", args);
    setFilesData(args);
  };

  const postData = (e) => {
    const invoice = filesData.file.rawFile;
    const amount = parseInt(amounts.replace(/\./g, ""), 10);
    e.preventDefault();

    // if (amount.length === 0 || description.length === 0 || type.length === 0) {
    //   AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    // } else {
    postSpp(
      setSts,
      navigateListSpp,
      amount,
      month,
      description,
      invoice,
      periodeId,
      studentCode
    );
    // }
  };

  const navigateSpp = () => {
    navigate(path);
  };

  const handleInputChange = (event) => {
    let inputVal = event.target.value;
    inputVal = inputVal.replace(/\D/g, ""); // Remove all non-numeric characters
    inputVal = inputVal.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Add dots every 3 digits
    // const value = parseInt(inputVal);
    setAmount(inputVal);
  };

  const academicYearOptions = academicPeriodeData.map((c) => ({
    label: `Semester : ${c.increment}`,
    value: c.id,
  }));

  const studentsOptions = studentsData.map((c) => ({
    label: `${c.code} : ${c.firstName} ${c.middleName} ${c.lastName}`,
    value: c.code,
  }));

  return (
    <div>
      <Header
        home="Admin Keuangan"
        prev="List Spp Terbayar"
        navePrev={path}
        at="Tambah Spp"
        title="Tambah Spp"
      />
      <div style={{ padding: "44px 104px 0" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Tambah Spp
        </p>
        <article>
          <DropdownSiswa
            label="Semester"
            required={true}
            defaultValue={periodeId}
            isClearable={false}
            options={academicYearOptions}
            isSearchable={false}
            onChange={(e) => setPeriodeId(e.value)}
          />
          <TextInput
            label="Spp Bulan"
            type="text"
            onChange={(e) => setMonth(e.target.value)}
            required={true}
          />
          <DropdownSiswa
            label="Murid"
            required={true}
            defaultValue={studentCode}
            isClearable={false}
            options={studentsOptions}
            isSearchable={true}
            onChange={(e) => setStudentCode(e.value)}
          />
          <TextInput
            label="Jumlah"
            type="text"
            onChange={handleInputChange}
            value={amounts}
            required={true}
          />
          <TextInput
            label="Deskripsi"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            required={true}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              marginTop: "20px",
              width: "auto",
            }}
          >
            <UploaderComponent
              type="file"
              ref={uploaderRef}
              asyncSettings={asyncSettings}
              removing={onRemoveFile}
              uploading={onFileUpload}
              success={onSuccess.bind(this)}
              locale="id-BAHASA"
              allowedExtensions=".png,.jpg"
              accept=".png,.jpg"
              minFileSize={minFileSize}
              maxFileSize={maxFileSize}
              multiple={false}
              buttons={{
                browse: !filesData ? "Unggah Berkas" : "Ganti Berkas",
              }}
            />
            <small className=" text-gray-400">
              <i>Jenis berkas: .png / .jpg</i>
            </small>
          </div>

          <div className="btn-form">
            <button
              type="button"
              className="w-20 btn-merah flex justify-center mb-5"
              onClick={postData}
            >
              Tambah
            </button>
            <button
              type="button"
              className="w-20 btn-putih flex justify-center mb-5"
              onClick={navigateSpp}
            >
              Batal
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
