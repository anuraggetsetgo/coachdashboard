import axios from "axios";
import config from "../config.json";
//import { isIOS } from "react-device-detect";

var GetHt = function () {
  return document.documentElement.clientHeight;
};
var GetWd = function () {
  return document.documentElement.clientWidth;
};
var setData = function (key, val) {
  localStorage.setItem(key, val);
};
var getData = function (key) {
  return localStorage.getItem(key);
};
var removeItem = function (key) {
  localStorage.removeItem(key);
};
function croptxt(txt, ln) {
  if (!txt) return "";
  const ellipsis = txt.length > ln ? "..." : "";
  return `${txt.substring(0, ln)} ${ellipsis}`;
}
function handleErr(err, props, efn) {
  console.log(err, efn);
  if (efn) efn(err, props);
  //props.history.push("/error")
}
function firebaseLogin(Firebase) {
  const { email, password } = config.firebaseConfig.credentials;
  const auth = Firebase.auth;
  return new Promise((resolve, reject) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(function () {
        resolve(true);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
}
function cmtoinch(n) {
  return n * 0.393701;
}
function lbtokg(w) {
  return w * 0.453592;
}
function formatDate(dt) {
  console.log("dt", dt);
  dt = new Date(dt);
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let date = dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate();
  return date ? `${date} ${months[dt.getMonth()]} ${dt.getFullYear()}` : "--";
}
function compareDate(dt) {
  const currDt = new Date();
  //let currMnth = new Date(currDt.getFullYear(), currDt.getMonth(), 1);
  //const enteredDt = new Date(dt);
  //console.log("currMonth",dt)
  return dt >= currDt;
}
axios.interceptors.request.use((cfg) => {
  let { url } = cfg,
    localRegion = "";
  if (url.indexOf(config.api.me) >= 0) localRegion = "me";
  if (url.indexOf(config.api.in) >= 0) localRegion = "in";
  if (url.indexOf(config.api.row) >= 0) localRegion = "row";
  if (url.toLowerCase().indexOf("transactionlist") >= 0)
    localRegion = getData("region");
  let authToken = getData("auth");
  authToken =
    localRegion && authToken ? JSON.parse(authToken)[localRegion] : null;
  cfg["headers"]["X-Auth-Token"] = authToken;
  return cfg;
});
var apiCall = function (api, region, cb, efn, props, type, obj) {
  type = type || "get";
  let localRegion = getData("region");
  localRegion = localRegion || "in";
  const url =
    config.api.base +
    (api === "transactionlist" ? config.api["in"] : config.api[localRegion]) +
    config.api[api];
  switch (type) {
    case "get":
      axios
        .get(url)
        .then((data) => {
          cb(data, props);
        })
        .catch((err) => {
          handleErr(err, props, efn);
        });
      break;
    case "post":
      let tempObj = {};
      if (obj && !obj.header) tempObj = Object.assign({}, obj);
      else tempObj = null;
      axios
        .post(url, tempObj)
        .then((data) => {
          cb(data, props);
        })
        .catch((err) => {
          handleErr(err, props, efn);
        });
      break;
  }
};
export {
  GetHt,
  GetWd,
  setData,
  removeItem,
  getData,
  apiCall,
  croptxt,
  compareDate,
  firebaseLogin,
  formatDate,
  cmtoinch,
  lbtokg,
};
