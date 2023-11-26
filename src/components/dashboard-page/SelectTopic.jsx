import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const topicList = [
  "Final Project",
  "Assignments",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SelectTopic() {
  const theme = useTheme();
  const [topic, setTopic] = React.useState('');

   const handleChange = (event) => {
     setTopic(event.target.value);
   };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
        {/* <Select
          displayEmpty
          value={topic}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>All Topic</em>;
            }

            return selected.join(", ");
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}> */}
        <InputLabel id="demo-simple-select-label">All Topic</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={topic}
          label="Topic"
          onChange={handleChange}>
          {/* <MenuItem disabled value="">
            <em>All Topic</em>
          </MenuItem> */}
          {topicList.map((topic) => (
            <MenuItem
              key={topic}
              value={topic}
              style={getStyles(topic, topic, theme)}>
              {topic}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
