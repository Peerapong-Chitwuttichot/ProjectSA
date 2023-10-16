import { OparatorsInterface } from "../../interfaces/IOparator";

const apiUrl = "http://localhost:8080";

async function GetOparators(id: Number | undefined) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/oparator/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function CreateOparator(data: OparatorsInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/oparators`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

async function OparatorLogin(data: OparatorsInterface) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  // const response = await fetch(`${apiUrl}/oparators/login`, requestOptions);
  // const loginResponse = await response.json();
  // return loginResponse;
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(`${apiUrl}/oparators/login`, requestOptions);

    if (response.ok) {
      const loginResponse = await response.json();
      return loginResponse;
    } else {
      console.error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ:", response.status);
      return null;
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ:", error);
    return null;
  }
}

async function UpdateOparator(data: OparatorsInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/oparators`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}




export {
  GetOparators,
  CreateOparator,
  OparatorLogin,
  UpdateOparator,

};
