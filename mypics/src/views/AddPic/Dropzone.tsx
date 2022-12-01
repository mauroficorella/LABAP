import styled from "@emotion/styled";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Box from "@mui/material/Box";
import axios from "axios";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: #ff3366;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const thumbInner = {
  //display: "flex",
  minWidth: 0,
  //overflow: "hidden",
};

const img = {
  //display: "block",
  width: "200",
  //height: "100%",
};

export function StyledDropzone(props: any) {
  const [selectedImages, setSelectedImages] = useState([]);

  //TODO: https://bobbyhadz.com/blog/react-pass-data-from-child-to-parent
  //! dal parent si deve gestire la onClick del bottone, quindi tutta questa roba andrà fatta nella onClick, quindi dobbiamo passare gli acceptedFiles al parent e far fare tutta questa roba al parent!

  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles[0].name);
    setSelectedImages(
      acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );

    var formData = new FormData();
    formData.append("image", acceptedFiles[0]);

    axios
      .post("http://localhost:8080/uploadpic", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ onDrop, accept: { "image/*": [] }, multiple: false });

  const selected_pic = selectedImages.map((file: any) => (
    <div key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          onLoad={() => {
            // ? Revoke data uri after image is loaded <- FARLO ALL FINE DI TUTTO? (NON NELLA onLoad, QUINDI QUANDO SI PREME IL BOTTONE, DOPO AVER UPLOADATO L'IMMAGINE SU FIREBASE E CREATO IL POST)
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  console.log(selected_pic);

  return (
    <div className="container">
      <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        <Box sx={{ pt: 7, pb: 3 }}></Box>
        <FileUploadIcon sx={{ fontSize: 50 }} color="secondary" />
        <h3>Drag and drop your pic here</h3>
        <p>(Only *.jpg or *.png image)</p>
        <Box sx={{ pt: 7, pb: 3 }}>{selected_pic}</Box>
      </Container>
    </div>
  );
}

<StyledDropzone />;

//https://blog.openreplay.com/create-a-drag-and-drop-zone-in-react-with-react-dropzone
//https://react-dropzone.org/#!/Styling%20Dropzone
