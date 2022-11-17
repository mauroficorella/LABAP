import styled from "@emotion/styled";
import React from "react";
import { useDropzone } from "react-dropzone";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Box from "@mui/material/Box";

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

export function StyledDropzone(props: any) {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ accept: { "image/*": [] } });

  return (
    <div className="container">
      <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        <Box sx={{ pt: 7, pb: 3 }}></Box>
        <FileUploadIcon sx={{ fontSize: 50 }} color="secondary" />
        <h3>Drag and drop your pic here</h3>
        <p>(Only *.jpg or *.png image)</p>
        <Box sx={{ pt: 7, pb: 3 }}></Box>
      </Container>
    </div>
  );
}

<StyledDropzone />;
