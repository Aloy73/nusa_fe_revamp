import { useEffect, useRef, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import {
  FaCheckCircle,
  FaEye,
  FaInfoCircle,
  FaLowVision,
  FaTimesCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import assalamualaikum from "../../data/assalamualaikum.png";
import logoSaim from "../../data/logo-saim.png";

import { useStateContext } from "../../contexts/ContextProvider";

import { IconButton, Input, InputAdornment } from "@mui/material";
import { validateEmail } from "../../api/Registrasi";
import axios from "../../api/axios";
import {
  AlertLoginFailed,
  AlertRegisterFailed,
} from "../../components/ModalPopUp";

// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const USER_REGEX = /^[A-z]{3}/;
const PHONE_REGEX = /^(\+62|62|0)8[1-9][0-9]{4,12}$/;
const ONLY_NUMBER_REGEX = /^[0-9\b]+$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const { isLoading, setIsLoading } = useStateContext();

  const userRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [jumlahanak, setJumlahAnak] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [otp, setOtp] = useState(false);
  const [sts, setSts] = useState("");
  const navigate = useNavigate();

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const navigateLogin = () => {
    navigate("/login");
  };

  const verifiedEmail = () => {
    validateEmail(setSts, otp);
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    phoneRef.current.focus();
  }, []);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPhone(PHONE_REGEX.test(phone));
  }, [phone]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  const directTo = "Login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "/user/register/parent",
        {
          fullname: user,
          phone: phone,
          email: email,
          password: pwd,
          password_confirmation: matchPwd,
        }
      );
      localStorage.setItem("TOKEN", response?.headers?.authorization);

      setIsLoading(false);
      navigate("/verify", {
        state: {
          email: email,
          direct: directTo,
        },
      });
    } catch (err) {
      AlertRegisterFailed();
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="justify-end min-h-screen lg:flex bg-krem">
        <section
          className="top-0 left-0 flex items-center justify-center min-h-full lg:fixed lg:w-1/2"
          style={{ background: "#E6E6E6" }}
        >
          <img
            className="m-7 lg:h-96 lg:w-96 sm:w-56 sm:h-56 xs:w-1/3 xs:h-1/3"
            src={logoSaim}
            alt="SAIM"
          />

          <p className="absolute text-sm text-center xs:invisible lg:visible bottom-7 mt-7 text-merah">
            Copyright 2022. PT. Nafisha Universal Network
          </p>
        </section>

        <section className="flex flex-wrap justify-center lg:items-center lg:w-1/2 bg-putih">
          <div className="relative block w-full mt-6 text-center">
            <img
              className="m-auto mb-3 h-200 w-200 xs:hidden lg:block"
              src={assalamualaikum}
              alt="Assalamuálaikum"
            />
            <h4>
              Selamat Datang <br />
              di Web Penerimaan Murid Baru
            </h4>
            <h5 className=" text-merah">
              Silahkan isi form dibawah ini untuk memulai
            </h5>
          </div>

          <form onSubmit={handleSubmit} className="block mt-7 mb-7 px-7">
            {/* NAMA LENGKAP */}
            <div className="relative block w-full lg:w-480">
              <label htmlFor="username" className="flex mt-4 mb-1 form-label">
                Nama Lengkap
              </label>
              <input
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-merah focus:outline-none"
                type="text"
                id="username"
                ref={userRef}
                autoComplete="on"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <FaCheckCircle
                className={
                  validName
                    ? "valid absolute top-10 right-2 text-green-600"
                    : "hidden"
                }
              />
              <FaTimesCircle
                className={
                  validName || !user
                    ? "hidden"
                    : "invalid absolute top-10 right-2 text-red-600"
                }
              />
              <p
                id="uidnote"
                className={
                  userFocus && user && !validName
                    ? "instructions italic text-xs flex items-center py-1"
                    : "hidden"
                }
              >
                <FaInfoCircle className="mr-1" />
                <span>Minimal 4 karakter.</span>
              </p>
            </div>

            {/* NOMOR TELEPON */}
            <div className="relative block xl:w-480">
              <label htmlFor="phone" className="flex mt-4 mb-1 form-label">
                No. Telepon
              </label>
              <input
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-merah focus:outline-none"
                type="text"
                id="phone"
                ref={phoneRef}
                autoComplete="on"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                required
                aria-invalid={validPhone ? "false" : "true"}
                aria-describedby="phonenote"
                onFocus={() => setPhoneFocus(true)}
                onBlur={() => setPhoneFocus(false)}
              />
              <FaCheckCircle
                className={
                  validPhone
                    ? "valid absolute top-10 right-2 text-green-600"
                    : "hidden"
                }
              />
              <FaTimesCircle
                className={
                  validPhone || !phone
                    ? "hidden"
                    : "invalid absolute top-10 right-2 text-red-600"
                }
              />
              <p
                id="phonenote"
                className={
                  phoneFocus && phone && !validPhone
                    ? "instructions italic text-xs flex items-center py-1"
                    : "hidden"
                }
              >
                <FaInfoCircle className="mr-1" />
                <span>Minimal 7 dan maksimal 15 angka.</span>
              </p>
            </div>

            {/* EMAIL */}
            <div className="relative block xl:w-480">
              <label htmlFor="email" className="flex mt-4 mb-1 form-label">
                E-mail
              </label>
              <input
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-merah focus:outline-none"
                type="email"
                id="email"
                ref={emailRef}
                autoComplete="on"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="emailnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <FaCheckCircle
                className={
                  validEmail
                    ? "valid absolute top-10 right-2 text-green-600"
                    : "hidden"
                }
              />
              <FaTimesCircle
                className={
                  validEmail || !email
                    ? "hidden"
                    : "invalid absolute top-10 right-2 text-red-600"
                }
              />
              <p
                id="emailnote"
                className={
                  emailFocus && email && !validEmail
                    ? "instructions italic text-xs flex items-center py-1"
                    : "hidden"
                }
              >
                <FaInfoCircle className="mr-1" />
                <span>Format Email.</span>
              </p>
            </div>

            <div className="relative block xl:w-480">
              <label htmlFor="password" className="flex mt-4 mb-1 form-label">
                Kata Sandi
              </label>
              <Input
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0"
                type={values.showPassword ? "text" : "password"}
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton
                      onClick={handleClickShowPassword}
                      // onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <FaLowVision /> : <FaEye />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FaCheckCircle
                className={
                  validPwd
                    ? "valid absolute top-10 right-2 text-green-600"
                    : "hidden"
                }
              />
              <FaTimesCircle
                className={
                  validPwd || !pwd
                    ? "hidden"
                    : "invalid absolute top-10 right-2 text-red-600"
                }
              />
              <p
                id="pwdnote"
                className={
                  pwdFocus && !validPwd
                    ? "instructions italic text-xs flex items-center py-1"
                    : "hidden"
                }
              >
                <FaInfoCircle className="mr-1" />
                <span>
                  8-24 karakter termasuk huruf besar, kecil, angka, karakter
                  spesial.
                </span>
              </p>
            </div>

            <div className="relative block xl:w-480">
              <label
                htmlFor="confirm_pwd"
                className="flex mt-4 mb-1 form-label"
              >
                Ulangi Kata Sandi
              </label>
              <Input
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0"
                type={values.showPassword ? "text" : "password"}
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                // value={"B!5millah"}
                value={matchPwd}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <FaCheckCircle
                className={
                  validMatch && matchPwd
                    ? "valid absolute top-10 right-2 text-green-600"
                    : "hidden"
                }
              />
              <FaTimesCircle
                className={
                  validMatch || !matchPwd
                    ? "hidden"
                    : "invalid absolute top-10 right-2 text-red-600"
                }
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch
                    ? "instructions italic text-xs flex items-center py-1"
                    : "hidden"
                }
              >
                <FaInfoCircle className="mr-1" />
                <span>Harus cocok dengan password sebelumnya.</span>
              </p>
            </div>

            <button
              disabled={
                !validName ||
                !validPhone ||
                !validEmail ||
                !validPwd ||
                !validMatch
                  ? true
                  : false
              }
              className="flex justify-center w-full py-3 my-6 mr-3 text-sm font-medium leading-snug text-white uppercase transition duration-150 ease-in-out rounded shadow-md disabled:bg-krem disabled:text-abu bg-merah px-7 hover:bg-gelap hover:shadow-lg focus:bg-merah focus:shadow-lg focus:outline-none focus:ring-0 active:bg-merah active:shadow-lg"
            >
              Daftar{" "}
              {isLoading ? (
                <CgSpinner className="ml-2 text-lg animate-spin" />
              ) : (
                ""
              )}
            </button>

            <button className="btn-putih" onClick={navigateLogin}>
              Kembali Ke Login
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

export default Register;
