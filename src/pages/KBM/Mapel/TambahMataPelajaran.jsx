import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postMapel } from "../../../api/MataPelajaran";
import { Header } from "../../../components";
import { AlertEmpty } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";

export default function TambahMataPelajaran() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [statusVal, setStatus] = useState("");

  // const [groupcourseData, setGroupCourseData] = useState([]);

  // const [isOpenStatus, setisOpenStatus] = useState(false);
  // const [isOpenEmpty, setisOpenEmpty] = useState(false);
  const [sts, setSts] = useState(undefined);
  // const created_by = localStorage.getItem("NAMA");
  const navigate = useNavigate();

  const path = "/admin/list-mata-pelajaran";

  // fetch function
  // const fetchGroupCourse = async () => {
  //   getKelompokMapel(setGroupCourseData, setSts);
  // };

  // useEffect(() => {
  //   fetchGroupCourse();
  // }, []);

  const postData = (e) => {
    e.preventDefault();

    // const status = statusVal.value;

    if (
      name.length === 0 ||
      description.length === 0 ||
      type.length === 0
      // statusVal.length === 0 ||
      // group_course_id.length === 0
    ) {
      AlertEmpty();
    } else {
      postMapel(setSts, path, name, description, type);
      // setisOpenStatus(true);
    }
  };

  // const closeModalEmpty = () => {
  //   setisOpenEmpty(false);
  // };

  // const closeModalStatus = () => {
  //   setisOpenStatus(false);
  //   setSts("");
  // };

  const navigateSemester = () => {
    navigate(path);
  };

  // const groupCourseOptions = groupcourseData.map((c) => ({
  //   label: c.name + " - " + c.status,
  //   value: c.id,
  // }));

  return (
    <div>
      <Header
        home="Admin KBM"
        prev="Mata Pelajaran"
        navePrev={path}
        at="Tambah Mata Pelajaran"
        title="Tambah Mata Pelajaran"
      />
      <div style={{ padding: "44px 104px 0" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Tambah Mata Pelajaran
        </p>
        <article>
          <TextInput
            label="Nama"
            type="text"
            onChange={(e) => setName(e.target.value)}
            required={true}
          />
          <TextInput
            label="Deskripsi"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            required={true}
          />
          <TextInput
            label="Tipe"
            type="text"
            onChange={(e) => setType(e.target.value)}
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
              onClick={navigateSemester}
            >
              Batal
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
