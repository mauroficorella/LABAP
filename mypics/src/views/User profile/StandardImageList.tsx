import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";

//source: https://bobbyhadz.com/blog/react-parameter-props-implicitly-has-an-any-type#:~:text=The%20React.,props%20object%20in%20your%20components.
interface ImageListProps {
  list_type: string;
}

export default function StandardImageList(props: ImageListProps) {
  const [itemData, setItemData] = useState<any[]>([]);
  var url: string;

  if (props.list_type == "profile") {
    url = "http://localhost:8000/published/abcdef95";
  } else if (props.list_type == "saved") {
    url = "http://localhost:8000/saved/abcdef95";
  }

  useEffect(() => {
    axios.get(url).then((response) => {
      setItemData(response.data);
      console.log(response.data);
    });
  }, [props.list_type]);

  return (
    <ImageList
      sx={{
        mb: 8,
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))!important",
      }}
      gap={8}
    >
      {itemData.map((item) => (
        <Card key={item.post_id} elevation={5} sx={{ mb: 2, ml: 1, mr: 1 }}>
          <Link
            style={{ color: "black" }}
            to="/pic/"
            state={item}
            key={item.post_id}
          >
            <ImageListItem
              sx={{ height: "100% !important", mb: 0 }}
              style={{ margin: 0 }}
            >
              <img
                src={`${item.fb_img_url}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.fb_img_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          </Link>
        </Card>
      ))}
    </ImageList>
  );
}

/*<ImageListItemBar
              title={item.description}
              subtitle={<span>by: {item.username}</span>}
              //position="below"
            />*/
