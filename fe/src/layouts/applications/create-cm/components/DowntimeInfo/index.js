/* eslint-disable react/no-array-index-key */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// @material-ui core components
import Autocomplete from "@mui/material/Autocomplete";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { Icon } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

// Settings page components
import FormField from "layouts/applications/create-cm/components/FormField";

// Data
import { getAssetByLineCode } from "api/assetAPI";
import { getPartListByAssetNumber } from "api/partAPI";
import { getAllAPD } from "api/apdAPI";
import { saveDowntime } from "api/downtime";
import { getAllLinesDetail } from "api/lineAPI";

function DowntimeInfo() {
  const [startedDate, setstartedDate] = useState(new Date().getTime());
  const [completedDate, setCompletedDate] = useState(new Date().getTime());
  const [itemCheck, setItemCheck] = useState([{ itemCheck: "", status: "NG" }]);
  const [apd, setApd] = useState([{ apdName: "", apdId: 0 }]);
  const [replacedParts, setReplacedParts] = useState([
    { partName: "", partNumber: "", quantity: 1, uom: "PC" },
  ]);
  const [downtimeData, setDowntimeData] = useState({
    workOrder: "",
    assetName: "",
    assetNumber: "",
    department: "PEE",
    costCenter: "",
    wotype: "BRKD",
    sectionCode: "",
    approval: "Waiting",
    requestBy: "",
    status: "On Progress",
  });

  const [isSubmited, setIsSubmited] = useState(false);
  const [listLine, setListLine] = useState([]);
  const [listAPD, setListAPD] = useState([]);
  const [lineName, setLineName] = useState("");
  const [listAsset, setListAsset] = useState([]);
  const [listPart, setListPart] = useState([]);
  const [assetObject, setAssetObject] = useState([{ assetNo: "", assetName: "" }]);
  const [partObject, setPartObject] = useState([{ partName: "", partNumber: "" }]);
  const [apdObject, setApdObject] = useState([
    { apdName: "", apdId: 0, createdBy: "", createdDate: "", updatedBy: "", updatedDate: "" },
  ]);

  const Navigate = useNavigate();

  const handleStartedDate = (newValue) => {
    setstartedDate(newValue.getTime());
    setDowntimeData({ ...downtimeData, startedDate: newValue.getTime() });
  };

  const handleCompletedDate = (newValue) => {
    setCompletedDate(newValue.getTime());
    setDowntimeData({ ...downtimeData, completedDate: newValue.getTime() });
  };

  const addFieldsPart = () => {
    const newFields = { partName: "", partNumber: "", quantity: 1, uom: "PC" };
    setReplacedParts((oldArr) => [...oldArr, newFields]);
  };

  const deleteFieldsPart = () => {
    const copyArr = [...replacedParts];
    copyArr.splice(-1);
    setReplacedParts(copyArr);
    setDowntimeData({ ...downtimeData, replacedParts: copyArr });
  };

  const addFieldsItem = () => {
    const newFields = { itemCheck: "", status: "NG" };
    setItemCheck((oldArr) => [...oldArr, newFields]);
  };

  const deleteFieldsItem = () => {
    const copyArr = [...itemCheck];
    copyArr.splice(-1);
    setItemCheck(copyArr);
    setDowntimeData({ ...downtimeData, itemCheck: copyArr });
  };

  const addFieldsApd = () => {
    const newFields = { apdName: "", apdId: 0 };
    setApd((oldArr) => [...oldArr, newFields]);
  };

  const deleteFieldsApd = () => {
    const copyArr = [...apd];
    copyArr.splice(-1);
    setApd(copyArr);
    setDowntimeData({ ...downtimeData, apd: copyArr });
  };

  const handleReplacedPartsNameChange = (index, value, partNo) => {
    const partListData = [...replacedParts];
    partListData[index].partName = value;
    partListData[index].partNumber = partNo;
    setReplacedParts(partListData);
    setDowntimeData({ ...downtimeData, replacedParts });
  };

  const handleReplacedPartsChange = (index, event) => {
    const partListData = [...replacedParts];
    partListData[index][event.target.name] = event.target.value;
    setReplacedParts(partListData);
    setDowntimeData({ ...downtimeData, replacedParts });
  };

  const handleUomChange = (index, value) => {
    const partListData = [...replacedParts];
    partListData[index].uom = value;
    setReplacedParts(partListData);
    setDowntimeData({ ...downtimeData, replacedParts });
  };

  const handleItemCheckChange = (index, event) => {
    const itemChecks = [...itemCheck];
    itemCheck[index][event.target.name] = event.target.value;
    setItemCheck(itemChecks);
    setDowntimeData({ ...downtimeData, itemCheck });
  };

  const handleItemCheckStatusChange = (index, value) => {
    const itemChecks = [...itemCheck];
    itemCheck[index].status = value;
    setItemCheck(itemChecks);
    setDowntimeData({ ...downtimeData, itemCheck });
  };

  const handleApdChange = (index, value, apdNo) => {
    const apdList = [...apd];
    apdList[index].apdName = value;
    apdList[index].apdId = apdNo;
    setApd(apdList);
    setDowntimeData({ ...downtimeData, apd });
  };

  const handleAssetNumberChange = (assetNo, assetName) => {
    setDowntimeData({ ...downtimeData, assetNumber: assetNo, assetName });
  };

  const handleStatusChange = (data) => {
    setDowntimeData({ ...downtimeData, status: data });
  };

  const handleInputChange = (e) => {
    setIsSubmited(false);
    const duration = completedDate - startedDate;
    const downtimeHours = duration / (1000 * 60 * 60);
    const downtimeMinute = duration / (1000 * 60);
    setDowntimeData({
      ...downtimeData,
      downtimeHours,
      downtimeMinute,
      lineName,
      startedDate,
      completedDate,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitForm = async (data) => {
    setIsSubmited(true);
    await saveDowntime(data)
      .then(() => {
        Navigate("/cm/list-cm");
      })
      .catch(() => {
        Navigate("/sign-in");
      });
  };

  const getLinesName = async () => {
    setListLine([]);
    try {
      await getAllLinesDetail().then((res) =>
        res.data.payload.forEach((data) => {
          setListLine((oldArr) => [...oldArr, data.lineCode]);
        })
      );
    } catch (err) {
      localStorage.clear();
      Navigate("/sign-in");
    }
  };

  const getListApdName = async () => {
    setListAPD([]);
    setApdObject([
      { apdName: "", apdId: 0, createdBy: "", createdDate: "", updatedBy: "", updatedDate: "" },
    ]);
    try {
      await getAllAPD().then((res) => {
        res.data.payload.forEach((data) => {
          setListAPD((oldArr) => [...oldArr, data.apdName]);
          setApdObject((oldArr) => [...oldArr, data]);
        });
      });
    } catch (err) {
      localStorage.clear();
      Navigate("/sign-in");
    }
  };

  const getAssetsName = async (lineCode) => {
    setListAsset([]);
    setAssetObject([{ assetNo: "", assetName: "" }]);
    try {
      await getAssetByLineCode(lineCode).then((res) => {
        res.data.payload.forEach((data) => {
          setAssetObject((oldArr) => [
            ...oldArr,
            { assetNo: data.assetNumber, assetName: data.assetName },
          ]);
          setListAsset((oldArr) => [...oldArr, data.assetName]);
        });
      });
    } catch (err) {
      localStorage.clear();
      Navigate("/sign-in");
    }
  };

  const getPartName = async (assetNo) => {
    setListPart([]);
    setPartObject([{ partName: "", partNumber: "" }]);
    try {
      await getPartListByAssetNumber(assetNo).then((res) => {
        res.data.payload.forEach((data) => {
          setPartObject((oldArr) => [
            ...oldArr,
            { partName: data.partName, partNumber: data.partNumber },
          ]);
          setListPart((oldArr) => [...oldArr, data.partName]);
        });
      });
    } catch (err) {
      localStorage.clear();
      Navigate("/sign-in");
    }
  };

  useEffect(() => {
    getLinesName();
    getListApdName();
  }, []);

  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <MDBox p={3}>
        <MDTypography variant="h5">Downtime Info</MDTypography>
      </MDBox>
      <MDBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <MDBox mb={3}>
              <MDBox display="inline-block">
                <MDTypography
                  component="label"
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  textTransform="capitalize"
                >
                  Line
                </MDTypography>
              </MDBox>
              <Autocomplete
                onChange={(event, value) => {
                  setLineName(value);
                  setDowntimeData({ ...downtimeData, lineName: value });
                  getAssetsName(value);
                }}
                options={listLine}
                renderInput={(params) => <MDInput {...params} variant="standard" />}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MDBox mb={3}>
              <MDBox display="inline-block">
                <MDTypography
                  component="label"
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  textTransform="capitalize"
                >
                  Asset Name
                </MDTypography>
              </MDBox>
              <Autocomplete
                onChange={(event, value) =>
                  assetObject.forEach((asset) => {
                    if (value === asset.assetName) {
                      handleAssetNumberChange(asset.assetNo, asset.assetName);
                      getPartName(asset.assetNo);
                    }
                  })
                }
                disabled={!lineName}
                options={listAsset}
                renderInput={(params) => <MDInput {...params} variant="standard" />}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Started Date"
                value={startedDate}
                onChange={handleStartedDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Completed Date"
                value={completedDate}
                onChange={handleCompletedDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              name="workOrder"
              label="Work Order"
              placeholder="ex: MC Tidak Bisa Auto"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            style={{
              paddingTop: "8px",
            }}
          >
            <MDBox mb={3}>
              <MDBox display="inline-block">
                <MDTypography
                  component="label"
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  textTransform="capitalize"
                >
                  Status
                </MDTypography>
              </MDBox>
              <Autocomplete
                onChange={(event, value) => handleStatusChange(value)}
                defaultValue="On Progress"
                options={["Done", "On Progress"]}
                renderInput={(params) => <MDInput {...params} variant="standard" />}
              />
            </MDBox>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            style={{
              paddingTop: "8px",
            }}
          >
            <MDBox mb={3}>
              <MDBox display="inline-block">
                <MDTypography
                  component="label"
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  textTransform="capitalize"
                >
                  Department
                </MDTypography>
              </MDBox>
              <Autocomplete
                onChange={(event, value) => setDowntimeData({ ...downtimeData, department: value })}
                defaultValue="PEE"
                options={["PEA", "PEB", "PEC", "PED", "PEE"]}
                renderInput={(params) => <MDInput {...params} variant="standard" />}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              name="costCenter"
              label="Cost Center"
              placeholder="ex: P8AEA0"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              name="sectionCode"
              label="Section Code"
              placeholder="ex: PEAE50"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              name="requestBy"
              label="Request By (NRP)"
              type="number"
              placeholder="ex: 94079"
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>

        <Grid container mt={5} mb={3}>
          <Grid item xs={12} sm={12}>
            <MDBox display="flex" justifyContent="space-between" alignItems="center">
              <MDTypography variant="h5" fontWeight="medium">
                Part List
              </MDTypography>

              <MDBox display="flex" justifyContent="space-between" alignItems="center">
                <MDBox mr={2}>
                  <MDButton
                    variant="gradient"
                    color="error"
                    size="small"
                    onClick={deleteFieldsPart}
                  >
                    <Icon sx={{ fontWeight: "bold" }}>delete</Icon>
                    &nbsp;delete last part
                  </MDButton>
                </MDBox>
                <MDButton variant="gradient" color="success" size="small" onClick={addFieldsPart}>
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;add new part
                </MDButton>
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>

        {replacedParts.map((replacedPart, index) => (
          <Grid container spacing={3} key={index} mb={2}>
            <Grid
              item
              xs={12}
              sm={4}
              style={{
                paddingTop: "8px",
              }}
            >
              <MDBox mb={3}>
                <MDBox display="inline-block">
                  <MDTypography
                    component="label"
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    textTransform="capitalize"
                  >
                    Part Name
                  </MDTypography>
                </MDBox>
                <Autocomplete
                  onChange={(event, value) =>
                    partObject.forEach((part) => {
                      if (value === part.partName) {
                        handleReplacedPartsNameChange(index, value, part.partNumber);
                      }
                    })
                  }
                  disabled={!downtimeData.assetNumber}
                  options={listPart}
                  renderInput={(params) => <MDInput {...params} variant="standard" />}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormField
                name="partNumber"
                label="Part Number"
                placeholder="ex: 20192334"
                disabled
                value={replacedParts[index].partNumber}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormField
                name="quantity"
                label="Quantity"
                type="number"
                placeholder="ex: 2"
                onChange={(event) => handleReplacedPartsChange(index, event)}
                value={replacedPart.quantity}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={2}
              style={{
                paddingTop: "8px",
              }}
            >
              <MDBox mb={3}>
                <MDBox display="inline-block">
                  <MDTypography
                    component="label"
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    textTransform="capitalize"
                  >
                    Satuan
                  </MDTypography>
                </MDBox>
                <Autocomplete
                  onChange={(event, value) => handleUomChange(index, value)}
                  defaultValue="PC"
                  options={["PC", "Unit", "Liter"]}
                  renderInput={(params) => <MDInput {...params} variant="standard" />}
                />
              </MDBox>
            </Grid>
          </Grid>
        ))}

        <Grid container mt={5} mb={3}>
          <Grid item xs={12} sm={12}>
            <MDBox display="flex" justifyContent="space-between" alignItems="center">
              <MDTypography variant="h5" fontWeight="medium">
                Item Check
              </MDTypography>

              <MDBox display="flex" justifyContent="space-between" alignItems="center">
                <MDBox mr={2}>
                  <MDButton
                    variant="gradient"
                    color="error"
                    size="small"
                    onClick={deleteFieldsItem}
                  >
                    <Icon sx={{ fontWeight: "bold" }}>delete</Icon>
                    &nbsp;delete last item
                  </MDButton>
                </MDBox>
                <MDButton variant="gradient" color="success" size="small" onClick={addFieldsItem}>
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;add new item
                </MDButton>
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>

        {itemCheck.map((item, index) => (
          <Grid container spacing={3} key={index} mb={2}>
            <Grid item xs={8} sm={8}>
              <FormField
                name="itemCheck"
                label="Item Check"
                placeholder="ex: Periksa Sensor Reed Switch"
                value={item.itemCheck}
                onChange={(event) => handleItemCheckChange(index, event)}
              />
            </Grid>
            <Grid
              item
              xs={4}
              sm={4}
              style={{
                paddingTop: "8px",
              }}
            >
              <MDBox mb={3}>
                <MDBox display="inline-block">
                  <MDTypography
                    component="label"
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    textTransform="capitalize"
                  >
                    Status
                  </MDTypography>
                </MDBox>
                <Autocomplete
                  onChange={(event, value) => handleItemCheckStatusChange(index, value)}
                  defaultValue="NG"
                  options={["OK", "NG"]}
                  renderInput={(params) => <MDInput {...params} variant="standard" />}
                />
              </MDBox>
            </Grid>
          </Grid>
        ))}

        <Grid container mt={5} mb={3}>
          <Grid item xs={12} sm={12}>
            <MDBox display="flex" justifyContent="space-between" alignItems="center">
              <MDTypography variant="h5" fontWeight="medium">
                APD
              </MDTypography>

              <MDBox display="flex" justifyContent="space-between" alignItems="center">
                <MDBox mr={2}>
                  <MDButton variant="gradient" color="error" size="small" onClick={deleteFieldsApd}>
                    <Icon sx={{ fontWeight: "bold" }}>delete</Icon>
                    &nbsp;delete last APD
                  </MDButton>
                </MDBox>
                <MDButton variant="gradient" color="success" size="small" onClick={addFieldsApd}>
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;add new APD
                </MDButton>
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>

        <Grid container spacing={3} mb={2}>
          {apd.map((itemApd, index) => (
            <Grid item xs={12} sm={3} key={index}>
              <MDBox mb={3}>
                <MDBox display="inline-block">
                  <MDTypography
                    component="label"
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    textTransform="capitalize"
                  >
                    APD Name
                  </MDTypography>
                </MDBox>
                <Autocomplete
                  onChange={(event, value) =>
                    apdObject.forEach((data) => {
                      if (value === data.apdName) {
                        handleApdChange(index, value, data.apdId);
                      }
                    })
                  }
                  options={listAPD}
                  renderInput={(params) => <MDInput {...params} variant="standard" />}
                />
              </MDBox>
            </Grid>
          ))}
        </Grid>

        <Grid container>
          <MDBox ml="auto" mt={3}>
            <MDButton
              variant="gradient"
              color="dark"
              onClick={() => handleSubmitForm(downtimeData)}
              disabled={
                !(
                  downtimeData.assetNumber &&
                  downtimeData.lineName &&
                  downtimeData.workOrder &&
                  downtimeData.requestBy
                ) || isSubmited
              }
            >
              Submit
            </MDButton>
          </MDBox>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default DowntimeInfo;
