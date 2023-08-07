import Modal from "react-modal";
import Swal from "sweetalert2";
import TextInput, { TextInputModal } from "./TextInput";
import { DropdownDebitKredit, DropdownGroup } from "./Dropdown";
import { FilterDate } from "./DataTables";
import { useNavigate } from "react-router-dom";

export const CustomStylesStatus = {
  content: {
    // width: "385px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    borderRadius: "8px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    cursor: "auto",
    padding: "0px",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,.5)",
    cursor: "pointer",
  },
};

// FILTER TANGGAL
export const ModalFilter = ({
  isOpenFilter,
  closeModalFilter,
  onChangeStart,
  onChangeEnd,
  selectedEnd,
  selectedStart,
  onClickFilterDate,
  setDebitKredit,
  post,
  status,
}) => {
  return (
    <Modal
      isOpen={isOpenFilter}
      onRequestClose={closeModalFilter}
      style={CustomStylesStatus}
      contentLabel="Modal Status"
      ariaHideApp={false}
    >
      <p className="text-white-700 text-3xl mb-16 mt-5 font-bold">Filter</p>
      <FilterDate
        selectedStart={selectedStart}
        onChangeStart={onChangeStart}
        selectedEnd={selectedEnd}
        onChangeEnd={onChangeEnd}
      />
      <div className="btn-form">
        <button
          type="button"
          style={{ width: "auto" }}
          className="btn-hijau flex justify-center mb-5"
          onClick={onClickFilterDate}
        >
          Terapkan
        </button>
        <button
          type="button"
          className="w-20 btn-merah flex justify-center mb-5"
          onClick={closeModalFilter}
        >
          Batal
        </button>
      </div>
    </Modal>
  );
};

// MODAL TAMBAH COST CENTER
export const ModalCostCenter = ({
  isOpenCostCenter,
  closeModalCostCenter,
  setCode,
  setGroup,
  setSubGroup,
  setItem,
  defaultValueDK,
  setDebitKredit,
  post,
  defaultValueGroup,
}) => {
  return (
    <Modal
      isOpen={isOpenCostCenter}
      onRequestClose={closeModalCostCenter}
      style={CustomStylesStatus}
      contentLabel="Modal Status"
      ariaHideApp={false}
    >
      <p className="text-white-700 text-3xl mb-16 mt-5 font-bold">
        Form Tambah Cost Center
      </p>
      <article>
        <TextInput
          label="Code"
          type="number"
          id="group"
          name="code"
          onChange={setCode}
          required={true}
        />
        <DropdownGroup
          label="Group"
          required={true}
          isClearable={true}
          defaultValue={defaultValueGroup}
          isSearchable={false}
          onChange={setGroup}
        />
        <TextInput
          label="Sub Group"
          type="text"
          id="group"
          onChange={setSubGroup}
          required={true}
        />
        <TextInput
          label="Item"
          type="text"
          id="group"
          onChange={setItem}
          required={true}
        />
        <DropdownDebitKredit
          label="Debit/Kredit"
          required={true}
          isClearable={true}
          defaultValue={defaultValueDK}
          isSearchable={false}
          onChange={setDebitKredit}
        />

        <div className="btn-form">
          <button
            type="button"
            className="w-20 btn-hijau flex justify-center mb-5"
            onClick={post}
          >
            Simpan
          </button>
          <button
            type="button"
            className="w-20 btn-merah flex justify-center mb-5"
            onClick={closeModalCostCenter}
          >
            Batal
          </button>
        </div>
      </article>
    </Modal>
  );
};

export const ModalTambahCalonMurid = ({
  isOpenCostCenter,
  closeModalCostCenter,
  post,
  onChange,
}) => {
  return (
    <Modal
      isOpen={isOpenCostCenter}
      onRequestClose={closeModalCostCenter}
      style={CustomStylesStatus}
      contentLabel="Modal Status"
      ariaHideApp={false}
    >
      <div className="div-wrapper">
        <div className="text-wrapper-3">Form Pendaftaran Anak</div>
      </div>
      <div
        style={{
          padding: "90px 35px 50px 30px",
          width: "400px",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        <TextInputModal
          label="Nama Anak"
          type="text"
          onChange={onChange}
          required={true}
          placeholder="Masukkan Nama"
        />
      </div>
      <div className="buttonModalWrapper">
        <button type="button" className="btn-modal-merah" onClick={post}>
          Simpan
        </button>
        <button
          type="button"
          className="btn-modal-putih"
          onClick={closeModalCostCenter}
        >
          Tutup
        </button>
      </div>
    </Modal>
  );
};

// SA STYLING
const styledSweetAlert = Swal.mixin({
  customClass: {
    confirmButton: "btn-merah",
    cancelButton: "btn-putih",
  },
  padding: "30px",
  width: "auto",
  buttonsStyling: false,
});

//Dynamic Text
export const AlertMessage = (title, text, buttonText) => {
  styledSweetAlert.fire({
    title: title,
    text: text,
    showConfirmButton: true,
    confirmButtonText: buttonText,
  });
};

export const AlertConfirmation = (onConfirm, title, confirmButtonText) => {
  styledSweetAlert
    .fire({
      title: title,
      showConfirmButton: true,
      confirmButtonText: confirmButtonText,
      showCancelButton: true,
      cancelButtonText: "Batal",
    })
    .then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      }
    });
};

export const AlertStatusSuccess = (navigate, title, buttonText) => {
  styledSweetAlert
    .fire({
      title: title,
      showConfirmButton: true,
      confirmButtonText: buttonText,
    })
    .then((result) => {
      if (result.isConfirmed) {
        // Redirect to another page
        navigate();
      }
    });
};

export const AlertStatusFailed = (title, buttonText) => {
  styledSweetAlert.fire({
    title: title,
    showConfirmButton: true,
    confirmButtonText: buttonText,
  });
};

// SA STATUS TAMBAH
export const AlertStatusTambahSuccess = (path) => {
  styledSweetAlert
    .fire({
      title: "Tambah Data Berhasil",
      showConfirmButton: true,
      confirmButtonText: "Kembali ke halaman list",
    })
    .then((result) => {
      if (result.isConfirmed) {
        // Redirect to another page
        window.location.href = path;
      }
    });
};

export const AlertStatusTambahFailed = () => {
  styledSweetAlert.fire({
    title: "Tambah Data Gagal",
    showConfirmButton: true,
    confirmButtonText: "Tutup",
  });
};

// SA STATUS HAPUS
export const AlertStatusHapusSuccess = () => {
  styledSweetAlert.fire({
    title: "Hapus Data Berhasil",
    showConfirmButton: true,
    confirmButtonText: "Tutup",
  });
};

export const AlertStatusHapusFailed = () => {
  styledSweetAlert.fire({
    title: "Hapus Data Gagal",
    showConfirmButton: true,
    confirmButtonText: "Tutup",
  });
};

export const AlertStatusUpdateDataSuccess = (path) => {
  styledSweetAlert
    .fire({
      title: "Ubah Data Berhasil",
      showConfirmButton: true,
      confirmButtonText: "Tutup",
    })
    .then((result) => {
      if (result.isConfirmed) {
        // Redirect to another page
        window.location.href = path;
      }
    });
};

export const AlertStatusVerified = (navigateLogin) => {
  styledSweetAlert
    .fire({
      title: "Akun Berhasil Terverifikasi, Silahkan Kembali Login",
      showConfirmButton: true,
      confirmButtonText: "Login",
    })
    .then((result) => {
      if (result.isConfirmed) {
        navigateLogin();
      }
    });
};

export const AlertStatusReVerified = () => {
  styledSweetAlert.fire({
    title:
      "Kode Verifikasi Telah Kami Kirim Ulang. Silahkan Cek Email Anda Kembali",
    showConfirmButton: true,
    confirmButtonText: "Tutup",
  });
};

export const AlertStatusReVerifiedFailed = () => {
  styledSweetAlert.fire({
    title: "Gagal",
    showConfirmButton: true,
    confirmButtonText: "Tutup",
  });
};

export const AlertStatusVerifiedFailed = () => {
  styledSweetAlert.fire({
    title: "Kode Verifikasi Kosong atau Tidak Sesuai",
    showConfirmButton: true,
    confirmButtonText: "Tutup",
  });
};

export const AlertPaymentProof = (url) => {
  const domain = process.env.REACT_APP_BASE_STATIC_FILE;
  styledSweetAlert.fire({
    title: "Bukti Pembayaran",
    imageUrl: domain + url, // Replace with the path to your image
    imageWidth: 400, // Adjust the width of the image as needed
    imageHeight: 200, // Adjust the height of the image as needed
    showConfirmButton: true,
    confirmButtonText: "Tutup",
  });
};

export const AlertStatusValidatePayment = (onValidate, id) => {
  styledSweetAlert
    .fire({
      title: "Konfirmasi",
      text: "Apakah anda setuju merubah status murid?",
      showConfirmButton: true,
      confirmButtonText: "Ubah",
      showCancelButton: "Batal",
    })
    .then((result) => {
      if (result.isConfirmed) {
        onValidate(id);
      }
    });
};

export const AlertStatusUpdateSuccess = () => {
  styledSweetAlert.fire({
    title: "Ubah Data Berhasil",
    showConfirmButton: true,
    confirmButtonText: "Tutup",
  });
};

export const AlertStatusUpdateFailed = () => {
  styledSweetAlert.fire({
    title: "Ubah Data Gagal",
    showConfirmButton: true,
    confirmButtonText: "Tutup",
  });
};

export const AlertLoginFailed = () => {
  styledSweetAlert.fire({
    title: "Email atau Password Tidak Sesuai",
    showConfirmButton: true,
    confirmButtonText: "Tutup",
  });
};

export const AlertNetwork = () => {
  styledSweetAlert.fire({
    title: "Koneksi Bermasalah",
    showConfirmButton: true,
    confirmButtonText: "Tutup",
  });
};

export const AlertRegisterFailed = () => {
  styledSweetAlert.fire({
    title: "Email Sudah Terdaftar",
    showConfirmButton: true,
    confirmButtonText: "Tutup",
  });
};

// SA EMPTY INPUT
export const AlertEmpty = () => {
  styledSweetAlert.fire({
    title: "Data Tidak Lengkap",
    showConfirmButton: true,
    confirmButtonText: "Tutup",
  });
};

// SA MODAL DELETE
export const AlertDelete = (desc, id, onDelete) => {
  styledSweetAlert
    .fire({
      title: "Hapus",
      text: desc + " ?",
      showConfirmButton: true,
      confirmButtonText: "Hapus",
      showCancelButton: "Batal",
    })
    .then((result) => {
      if (result.isConfirmed) {
        onDelete(id);
      }
    });
};

export const AlertUploadInvoiceSuccess = () => {
  styledSweetAlert
    .fire({
      title: "Upload Bukti Pembayaran Berhasil",
      showConfirmButton: true,
      confirmButtonText: "Kembali Ke Halaman Tahapan PMB",
    })
    .then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/pmb/tahapan-pmb";
      }
    });
};

export const AlertUploadInvoiceFailed = () => {
  styledSweetAlert.fire({
    title: "Upload Bukti Pembayaran Gagal, Mohon Coba Kembali",
    showConfirmButton: true,
    confirmButtonText: "Coba Lagi",
  });
};

export const AlertValidateRegistration = (
  // desc,
  code,
  // status,
  // url,
  onValidate
) => {
  // const domain = process.env.REACT_APP_BASE_STATIC_FILE;
  // console.log("KAKA", domain + url);
  // if (status === 1) {
  styledSweetAlert
    .fire({
      title: "Bukti Pembayaran",
      // imageUrl: domain + url, // Replace with the path to your image
      // imageWidth: 400, // Adjust the width of the image as needed
      // imageHeight: 200, // Adjust the height of the image as needed
      showConfirmButton: true,
      confirmButtonText: "Validasi",
      showCancelButton: "Batal",
    })
    .then((result) => {
      if (result.isConfirmed) {
        onValidate(code);
      }
    });
  // } else {
  //   styledSweetAlert
  //     .fire({
  //       title: "Aktifkan",
  //       text: desc + " ?",
  //       showConfirmButton: true,
  //       confirmButtonText: "Aktifkan",
  //       showCancelButton: "Batal",
  //     })
  //     .then((result) => {
  //       if (result.isConfirmed) {
  //         onUpdateStatus(code);
  //       }
  //     });
  // }
};

export const AlertUbahStatus = (desc, code, status, onUpdateStatus) => {
  if (status === 1) {
    styledSweetAlert
      .fire({
        title: "Non-Aktifkan",
        text: desc + " ?",
        showConfirmButton: true,
        confirmButtonText: "Non-Aktifkan",
        showCancelButton: "Batal",
      })
      .then((result) => {
        if (result.isConfirmed) {
          onUpdateStatus(code);
        }
      });
  } else {
    styledSweetAlert
      .fire({
        title: "Aktifkan",
        text: desc + " ?",
        showConfirmButton: true,
        confirmButtonText: "Aktifkan",
        showCancelButton: "Batal",
      })
      .then((result) => {
        if (result.isConfirmed) {
          onUpdateStatus(code);
        }
      });
  }
};

export const AlertUpdateStatusAktif = (desc, status, id, onUpdateStatus) => {
  styledSweetAlert
    .fire({
      title: "Non-Aktifkan",
      text: desc + " ?",
      showConfirmButton: true,
      confirmButtonText: "Non-Aktifkan",
      showCancelButton: "Batal",
    })
    .then((result) => {
      if (result.isConfirmed) {
        onUpdateStatus(id, status);
      }
    });
};

export const AlertUpdateStatusNonAktif = (desc, status, id, onUpdateStatus) => {
  styledSweetAlert
    .fire({
      title: "Aktifkan",
      text: desc + " ?",
      showConfirmButton: true,
      confirmButtonText: "Aktifkan",
      showCancelButton: "Batal",
    })
    .then((result) => {
      if (result.isConfirmed) {
        onUpdateStatus(id, status);
      }
    });
};

// MODAL STATUS TAMBAH
export const ModalStatusTambah = ({
  closeModalStatus,
  isOpenStatus,
  status,
  navigate,
}) => {
  return (
    <Modal
      isOpen={isOpenStatus}
      onRequestClose={closeModalStatus}
      style={CustomStylesStatus}
      contentLabel="Modal Status"
      ariaHideApp={false}
    >
      {status?.type === "success" && (
        <div style={{ textAlign: "center" }}>
          <h2>Berhasil</h2>
          <button
            style={{ padding: "5px" }}
            className="btn-action-pink w-auto mt-5"
            onClick={navigate}
          >
            Kembali Ke Halaman List
          </button>
        </div>
      )}
      {status?.type === "error" && (
        <div>
          <h2>Gagal</h2>
          <button
            className="btn-action-pink w-20 mt-5"
            onClick={closeModalStatus}
          >
            Tutup
          </button>
        </div>
      )}
    </Modal>
  );
};

// MODAL STATUS LIST
export const ModalStatusList = ({ onRequestClose, isOpen, status }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={CustomStylesStatus}
      contentLabel="Modal Status"
      ariaHideApp={false}
    >
      {status?.type === "success" && (
        <div style={{ textAlign: "center" }}>
          <h2>Berhasil</h2>
          <button
            style={{ padding: "5px" }}
            className="btn-action-pink w-auto mt-5"
            onClick={onRequestClose}
          >
            Tutup
          </button>
        </div>
      )}
      {status?.type === "error" && (
        <div>
          <h2>Gagal</h2>
          <button
            className="btn-action-pink w-20 mt-5"
            onClick={onRequestClose}
          >
            Tutup
          </button>
        </div>
      )}
    </Modal>
  );
};

// MODAL INPUT KOSONG
export const ModalEmpty = ({
  isOpenEmpty,
  closeModalEmpty,
  onRequestCloseEmpty,
}) => {
  return (
    <Modal
      isOpen={isOpenEmpty}
      onRequestClose={onRequestCloseEmpty}
      style={CustomStylesStatus}
      contentLabel="Modal Status"
      ariaHideApp={false}
    >
      <div>
        <h2>Data Tidak Lengkap</h2>
        <button className="btn-action-pink w-20 mt-5" onClick={closeModalEmpty}>
          Tutup
        </button>
      </div>
    </Modal>
  );
};
