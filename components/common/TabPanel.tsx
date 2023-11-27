import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { ISurveyData } from "../../utils/types";
import GetStarted from "../steps/GetStarted";
import Web3ContractContainer from "../web3/contract/Web3ContractContainer";
import styles from "./styles/tab-panel.module.css";
import Web3AdminContractContainer from "../web3/admin/Web3AdminContractContainer";
import { useWeb3Context } from "../../context";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box className={styles.tabContainer}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface BasicTabsProps {
  data: ISurveyData;
  setStart: (value: boolean) => void;
}

export default function BasicTabs(props: BasicTabsProps) {
  const { web3Provider } = useWeb3Context();
  const { data, setStart } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      {!web3Provider ? (
        <GetStarted image={data.image} handleStart={setStart} />
      ) : (
        <Box sx={{ width: "100%", marginTop: "20px" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="actions tabs"
              variant="scrollable"
              scrollButtons
            >
              <Tab label="Get Started" {...a11yProps(0)} />
              <Tab label="Quiz Token Info" {...a11yProps(1)} />
              <Tab label="Admin Token" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <GetStarted image={data.image} handleStart={setStart} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Web3ContractContainer />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Web3AdminContractContainer />
          </TabPanel>
        </Box>
      )}
    </>
  );
}
