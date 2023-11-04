import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.spotify.com";
const access_token = 'BQCV7nOKLWXIeu0-u3z7VZUUSt932V62DpEPI1qWEXEBVCNJCNmFj3mNCGJ0Y9OlRXLpTrJUKPb0nGwTuTpo4SZaWu1HAEG52FraQgtWHrwb7lbaAjIORqcUipVAGGNuSckwrZNYLBfgXroTX26mmT5CsBNOSYVdCJ99xkhamoNQBxAsrXemIfVYViNXiFtNpxtFwVzsMS_wTLenJ3E-i6AQpC-BuQw4s7qJZLOI8ay3WZfVLRUzjpCNeJYnVX1ganVZm4Aj5hEDpajCY9Pch8zTK-pDyUaMQG9IY4ONBKbGNVAZXrsMVdm5D4qoLw_xcqN42ckTPO-84S-dvSYnILD5';

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const config = {
    headers: { Authorization: `Bearer ${access_token}` },
};

app.get("/", async (req, res) => {
    try {
        const profile = await axios.get(API_URL + "/v1/me", config);
        const playlists = await axios.get(API_URL + "/v1/me/playlists", config);
        res.render("index.ejs", { 
            profile: profile.data,
            playlists: playlists.data,
        });
        console.log(playlists.data);
    } catch (error) {
        console.log(error);
    }
});


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
  