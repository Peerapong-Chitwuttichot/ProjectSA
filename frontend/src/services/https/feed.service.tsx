import { RegWorkInterface } from "../../interfaces/IRegWork";

const apiUrl = "http://localhost:8080";

async function CreateRegWork(data: RegWorkInterface) {
  console.log(data)
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/regwork`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        console.log("res.data : ")
        console.log(res.data)
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

// GET POST
async function GetPost() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/post`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      console.log(res.data)
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}


// Get Last WHU id
async function GetLatestWHU() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  };
  let res = await fetch(`${apiUrl}/whul`, requestOptions)

    .then((response) => response.json())
    .then((res) => {
      if (res.whul) {
        if (res.whul.length === 0) {
          const start = {
            "ID": 0,
            "Position": "",
            "CompanyName": "",
            "Description": "",
            "PostTimestamp": "",
            "Matched": true
          }
          res.whul.push(start);
        }
        return res.whul;
      } else {
        return false;
      }
    });

  return res;
}



// ImageUploadService.js
const UploadImage = (file: File, whu_id: number) => {
  // console.log(GetLatestWHU())

  const formData = new FormData();
  formData.append('image', file);
  formData.append('whu_id', whu_id.toString());

  return fetch(`${apiUrl}/upload`, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Image upload failed');
      }
      return response.json();
    })
    .then((data) => data)

};


// Search
async function SearchWork(key: String) {
  key = key.trim();
  if (key === "") {
    key = "ASd3kfds#23fghs5yege4tv4tq4tq34t"
  }
  const requestOptions = {
    method: "GET"
  };


  let res = await fetch(`${apiUrl}/searchwork/${key}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.search_w) {
        console.log(res.search_w)
        return res.search_w;
      } else {
        return false;
      }
    });

  return res;
}

// GET WORK
async function GetMyWork(user_id: number) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/mywork/${user_id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res) {
        return res.myWork;
      } else {
        return false;
      }
    });
  return res;
}

export {
  CreateRegWork,
  GetPost,
  // GetUserById,
  UploadImage,
  GetLatestWHU,
  SearchWork,
  GetMyWork
};