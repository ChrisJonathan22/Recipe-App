import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CustomTabPanel from '../CustomTabPanel/CustomTabPanel';

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  export default function BasicTabs(props) {
    const [tabValue, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleChange} aria-label="Recipe tabs view" variant="fullWidth">
            <Tab label="Image View" {...a11yProps(0)} />
            <Tab label="List View" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={tabValue} index={0}>
          {props.children[0]}
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          {props.children[1]}
        </CustomTabPanel>
      </Box>
    );
}