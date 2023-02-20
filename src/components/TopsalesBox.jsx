import { Box, Typography, Divider, Stack, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const TopsalesBox = ({ title, name1, description1, name2, description2, name3, description3 }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px" >
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
      <Box m="2px">
        <Stack
          direction='row'
          divider={<Divider orientation='vertical' flexItem />}
          justifyContent='space-between'
        >
          <Box>
            <Typography variant="h6" sx={{ color: colors.grey[400] }} mb={1}>
              1ST PLACE
            </Typography>
            <Typography variant="h3" sx={{ color: colors.primary }} mb={1}>
              {name1}
            </Typography>
            <Typography variant="h6" sx={{ color: colors.greenAccent[500] }}>
              {description1}
            </Typography>
          </Box>

          <Box ml="10px">
            <Typography variant="h6" sx={{ color: colors.grey[400] }} mb={1}>
              2ND PLACE
            </Typography>
            <Typography variant="h3" sx={{ color: colors.primary }} mb={1}>
              {name2}
            </Typography>
            <Typography variant="h6" sx={{ color: colors.greenAccent[500] }}>
              {description2}
            </Typography>
          </Box>
          <Box ml="10px">
            <Typography variant="h6" sx={{ color: colors.grey[400] }} mb={1}>
              3RD PLACE
            </Typography>
            <Typography variant="h3" sx={{ color: colors.primary }} mb={1}>
              {name3}
            </Typography>
            <Typography variant="h6" sx={{ color: colors.greenAccent[500] }}>
              {description3}
            </Typography>
          </Box>

        </Stack>
      </Box>
    </Box >
  );
};

export default TopsalesBox;
