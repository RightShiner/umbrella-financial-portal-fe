import { Box, Typography, Divider, Stack, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";
import getRankStringFromNumber from "../utilities/getRankStringFromNumber";

const TopsalesBox = ({ users, title, name1, description1, name2, description2, name3, description3 }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  console.log(users);
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
          {users.map((user, index) =>
            <Box>
              <Typography variant="h6" sx={{ color: colors.grey[400] }} mb={1}>
                {getRankStringFromNumber(index + 1)} PLACE
              </Typography>
              <Typography variant="h3" sx={{ color: colors.primary }} mb={1}>
                {user.name}
              </Typography>
              <Typography variant="h6" sx={{ color: colors.greenAccent[500] }}>
                ${user.totalSales}
              </Typography>
            </Box>)}
        </Stack>
      </Box>
    </Box >
  );
};

export default TopsalesBox;
