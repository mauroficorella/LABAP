import { createApi } from "unsplash-js";
import { createRequire } from "module";
import axios from "axios";

const require = createRequire(import.meta.url);
const fs = require("fs");
const { parse } = require("csv-parse");

const data = [];

const unsplash = createApi({
  accessKey: "kfRGYPEKkLK45KHpG9duIlAd1HudtBlNV6cxaP1mE0k",
});

async function createUser(values) {
  await axios
    .post("http://localhost:8000/user", values)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

fs.createReadStream("./csv/user.csv")
  .pipe(
    parse({
      delimiter: ",",
      columns: true,
      ltrim: true,
    })
  )
  .on("data", function (row) {
    // 👇 push the object row into the array
    data.push(row);
  })
  .on("error", function (error) {
    console.log(error.message);
  })
  .on("end", function () {
    // 👇 log the result array
    console.log("parsed csv data:");
    for (var i = 50; i < 100; i++) {
      unsplash.photos.get({ photoId: data[i].photo_id }).then(function (res) {
        //console.log(res.response.user.profile_image.medium);
        createUser({
          username: res.response.user.username,
          password: res.response.user.username + "1234",
          email: res.response.user.username + "@gmail.com",
          profile_pic: res.response.user.profile_image.large,
        });
      });
    }
  });
