import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postAdmissionPhase } from "../../api/Gelombang";
import { Header } from "../../components";
import { DropdownDatePickers } from "../../components/Dropdown";
import { AlertMessage, AlertStatusFailed } from "../../components/ModalPopUp";
import TextInput from "../../components/TextInput";

export default function TambahGelombang() {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [amount, setAmount] = useState();
  const [increment, setIncrement] = useState();
  // const [birthDate, setBirthDate] = useState("");
  // const [semesterData, setSemesterData] = useState([]);
  // const [isOpenStatus, setisOpenStatus] = useState(false);
  // const [isOpenEmpty, setisOpenEmpty] = useState(false);
  // const created_by = localStorage.getItem("NAMA");
  const [sts, setSts] = useState(undefined);
  const location = useLocation();
  const navigate = useNavigate();
  const path = "/admin/list-setup-pmb";
  const code = location.state.code;
  const status = location.state.status;

  const navigateAdmissionDetail = () => {
    navigate("/admin/admission-detail", {
      state: {
        code: code,
        status: status,
      },
    });
  };

  const postData = (e) => {
    e.preventDefault();

    if (
      name.length === 0 ||
      increment === 0 ||
      startDate.length === 0 ||
      endDate.length === 0 ||
      amount === 0
    ) {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      const jumlah = parseInt(amount.replace(/\./g, ""), 10);
      postAdmissionPhase(
        setSts,
        navigateAdmissionDetail,
        code,
        increment,
        name,
        startDate,
        endDate,
        jumlah
      );
      //   setisOpenStatus(true);
    }
  };

  const navigateAdmissionDetails = () => {
    navigate("/admin/admission-detail", {
      state: {
        code: code,
      },
    });
  };

  const [formFields, setFormFields] = useState([]);

  // const addField = () => {
  //   setFormFields([...formFields, ""]);
  // };

  // const removeField = (index) => {
  //   const updatedFields = [...formFields];
  //   updatedFields.splice(index, 1);
  //   setFormFields(updatedFields);
  // };

  // const handleChange = (index, value) => {
  //   const updatedFields = [...formFields];
  //   updatedFields[index] = value;
  //   setFormFields(updatedFields);
  // };

  const handleIncrementChange = (e) => {
    const value = parseInt(e.target.value);
    setIncrement(value);
  };

  // const SemesterOptions = semesterData.map((c) => ({
  //   label: c.name + " - " + c.status,
  //   value: c.id,
  // }));

  const handleInputChange = (event) => {
    let inputVal = event.target.value;
    inputVal = inputVal.replace(/\D/g, ""); // Remove all non-numeric characters
    inputVal = inputVal.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Add dots every 3 digits
    // const value = parseInt(inputVal);
    setAmount(inputVal);
  };

  return (
    <div>
      <Header
        home="Admin PMB"
        prev="Setup PMB"
        navePrev={path}
        at="Gelombang"
        title="Tambah Gelombang"
      />
      <div style={{ padding: "44px 104px 0" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Tambah Gelombang
        </p>
        <article>
          <TextInput
            label="Gelombang Ke"
            type="number"
            onChange={handleIncrementChange}
            required={true}
          />

          <TextInput
            label="Nama"
            type="text"
            id="group"
            name="code"
            onChange={(e) => setName(e.target.value)}
            required={true}
          />

          <DropdownDatePickers
            label="Tanggal Mulai"
            value={startDate}
            change={(e) => setStartDate(e.element.value)}
          />
          <DropdownDatePickers
            label="Tanggal Selesai"
            value={endDate}
            change={(e) => setEndDate(e.element.value)}
          />

          {/* <TextInput
            label="Tanggal Mulai"
            type="text"
            placeholder="Format YYYY-MM-DD"
            onChange={(e) => setStartDate(e.target.value)}
            required={true}
          />

          <TextInput
            label="Tanggal Selesai"
            type="text"
            placeholder="Format YYYY-MM-DD"
            onChange={(e) => setEndDate(e.target.value)}
            required={true}
          /> */}

          <TextInput
            label="Nominal Biaya Pendaftaran"
            type="text"
            onChange={handleInputChange}
            value={amount}
            required={true}
          />

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
              onClick={navigateAdmissionDetails}
            >
              Batal
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
