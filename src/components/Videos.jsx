import * as React from "react";
// import AspectRatio from "@mui/joy/AspectRatio";
// import Box from "@mui/joy/Box";
// import Button from "@mui/joy/Button";
// import Card from "@mui/joy/Card";
// import Typography from "@mui/joy/Typography";

import { Box, Button, Card, Typography, Container } from "@mui/material";

// import "../App.css";
import { AdvancedVideo, lazyload } from "@cloudinary/react";

import { videoCodec } from "@cloudinary/url-gen/actions/transcode";
import { auto, vp9 } from "@cloudinary/url-gen/qualifiers/videoCodec";
import { Cloudinary } from "@cloudinary/url-gen";

const playFunction = () => {
  // Dummy function
};

const Videos = (props) => {
  const sources = [
    {
      type: "mp4",
      codecs: ["avc1.4d002a"],
      transcode: videoCodec(auto()),
    },
    {
      type: "webm",
      codecs: ["vp8", "vorbis"],
      transcode: videoCodec(vp9()),
    },
  ];

  const PublicID = "sample-5s_n5v712";
  const desc = props.desc;

  const getAdvancedVideoPropertiesVideo = () => {
    // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
      cloud: {
        cloudName: "deodxmix4",
        apiKey: "444231465446862",
        apiSecret: "z2NIKZMuPAlFaEkEweNzhlHVm5g",
      },
      url: {
        analytics: false,
      },
    });

    // Use the video with public ID
    const myVideo = cld.video(PublicID);

    return myVideo;
  };

  return (
    <div className="App-body">
      <Card variant="outlined" sx={{ width: 320, radius: 50, border: "none" }}>
        <div className="space"></div>
        <Container maxWidth="sm">
          <AdvancedVideo
            cldVid={getAdvancedVideoPropertiesVideo()}
            controls
            sources={sources}
            playsInline
            muted
            onPlay={playFunction()}
            plugins={[lazyload()]}
            style={{ width: "100%", height: "100%" }}
          />
        </Container>
        <Box sx={{ display: "flex" }}>
          <div>
            {/* description */}
            <Typography level="body3">Total price:</Typography>
            <Typography fontSize="lg" fontWeight="lg">
              $2,900
            </Typography>
            <Typography fontSize="lg" fontWeight="lg">
              {desc}
            </Typography>
          </div>
        </Box>
      </Card>
    </div>
  );
};

export default Videos;
