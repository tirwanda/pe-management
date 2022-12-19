/* eslint-disable react/no-array-index-key */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

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

// DowntimeInfoUpdate page components
import FormField from "layouts/applications/update-cm/components/FormField";

// Data
import { getAssetByLineCode } from "api/assetAPI";
import { getPartListByAssetNumber } from "api/partAPI";
import { getAllAPD } from "api/apdAPI";
import { updateDowntime } from "api/downtime";
import { getAllLinesDetail } from "api/lineAPI";

function DowntimeInfoUpdate({ downtimeInfo }) {
  const [startedDate, setstartedDate] = useState(new Date(downtimeInfo.startedDate).getTime());
  const [completedDate, setCompletedDate] = useState(
    new Date(downtimeInfo.completedDate).getTime()
  );
  const [itemChecks, setItemChecks] = useState(downtimeInfo.itemChecks);
  const [apdList, setApdList] = useState(downtimeInfo.apdList);
  const [replacedParts, setReplacedParts] = useState(downtimeInfo.replacedParts);
  const [downtimeData, setDowntimeData] = useState(downtimeInfo);

  const [listLine, setListLine] = useState([]);
  const [listAPD, setListAPD] = useState([]);
  const [lineName, setLineName] = useState(downtimeInfo.lineName);
  const [listAsset, setListAsset] = useState([]);
  const [listPart, setListPart] = useState([]);
  const [assetObject, setAssetObject] = useState([{ assetNo: "", assetName: "" }]);
  const [partObject, setPartObject] = useState([{ partName: "", partNumber: "" }]);
  const [apdObject, setApdObject] = useState([
    { apdName: "", apdId: 0, createdBy: "", createdDate: "", updatedBy: "", updatedDate: "" },
  ]);
  const [isUpdated, setIsUpdated] = useState(false);

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
    setItemChecks((oldArr) => [...oldArr, newFields]);
  };

  const deleteFieldsItem = () => {
    const copyArr = [...itemChecks];
    copyArr.splice(-1);
    setItemChecks(copyArr);
    setDowntimeData({ ...downtimeData, itemChecks: copyArr });
  };

  const addFieldsApd = () => {
    const newFields = { apdName: "", apdId: 0 };
    setApdList((oldArr) => [...oldArr, newFields]);
  };

  const deleteFieldsApd = () => {
    const copyArr = [...apdList];
    copyArr.splice(-1);
    setApdList(copyArr);
    setDowntimeData({ ...downtimeData, apdList: copyArr });
  };

  const handleReplacedPartsNameChange = (index, value, partNo) => {
    const partListData = [...replacedParts];
    partListData[index].partName = value;
    partListData[index].partNumber = partNo;
    setReplacedParts(partListData);
    setDowntimeData({ ...downtimeData, replacedParts: partListData });
  };

  const handleReplacedPartsChange = (index, event) => {
    const partListData = [...replacedParts];
    partListData[index][event.target.name] = event.target.value;
    setReplacedParts(partListData);
    setDowntimeData({ ...downtimeData, replacedParts: partListData });
  };

  const handleUomChange = (index, value) => {
    const partListData = [...replacedParts];
    partListData[index].uom = value;
    setReplacedParts(partListData);
    setDowntimeData({ ...downtimeData, replacedParts: partListData });
  };

  const handleItemCheckChange = (index, event) => {
    const itemCheck = [...itemChecks];
    itemCheck[index][event.target.name] = event.target.value;
    setItemChecks(itemCheck);
    setDowntimeData({ ...downtimeData, itemChecks });
  };

  const handleItemCheckStatusChange = (index, value) => {
    const itemCheck = [...itemChecks];
    itemCheck[index].status = value;
    setItemChecks(itemCheck);
    setDowntimeData({ ...downtimeData, itemChecks });
  };

  const handleApdChange = (index, value, apdNo) => {
    const apd = [...apdList];
    apd[index].apdName = value;
    apd[index].apdId = apdNo;
    setApdList(apd);
    setDowntimeData({ ...downtimeData, apdList: apd });
  };

  const handleAssetNumberChange = (assetNo, assetName) => {
    setDowntimeData({ ...downtimeData, assetNumber: assetNo, assetName });
  };

  const handleStatusChange = (data) => {
    setDowntimeData({ ...downtimeData, status: data });
  };

  const handleInputChange = (e) => {
    setIsUpdated(false);
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

  const handleUpdateForm = async (data) => {
    setIsUpdated(true);
    await updateDowntime(data)
      .then(() => {
        Navigate("/applications/list-cm");
      })
      .catch(() => {
        localStorage.clear();
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
    setDowntimeData(downtimeInfo);
    getAssetsName(downtimeInfo.lineName);
    getListApdName();
    getPartName(Number(downtimeInfo.assetNumber));
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
                defaultValue={downtimeInfo.lineName}
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
                defaultValue={downtimeInfo.assetName}
                options={listAsset}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
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
              value={downtimeData.workOrder}
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
                value={downtimeData.status}
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
                value={downtimeData.department}
                options={["PEA", "PEB", "PEC", "PED", "PEE"]}
                renderInput={(params) => <MDInput {...params} variant="standard" />}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              name="costCenter"
              label="Cost Center"
              value={downtimeData.costCenter}
              placeholder="ex: P8AEA0"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              name="sectionCode"
              label="Section Code"
              placeholder="ex: PEAE50"
              value={downtimeData.sectionCode}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              name="requestBy"
              label="Request By (NRP)"
              type="number"
              placeholder="ex: 94079"
              value={downtimeData.requestBy}
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
                  options={listPart}
                  value={replacedPart.partName}
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
                value={replacedPart.partNumber}
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
                  value={replacedPart.uom}
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

        {itemChecks.map((item, index) => (
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
                  value={item.status}
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
          {apdList.map((itemApd, index) => (
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
                  value={itemApd.apdName}
                  options={listAPD}
                  getOptionLabel={(option) => option}
                  isOptionEqualToValue={(option, value) => option === value}
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
              onClick={() => handleUpdateForm(downtimeData)}
              disabled={
                !(
                  downtimeData.assetNumber &&
                  downtimeData.lineName &&
                  downtimeData.workOrder &&
                  downtimeData.requestBy
                ) || isUpdated
              }
            >
              Update
            </MDButton>
          </MDBox>
        </Grid>
      </MDBox>
    </Card>
  );
}

DowntimeInfoUpdate.defaultProps = {
  downtimeInfo: {
    workOrder: "",
    assetName: "",
    assetNumber: "",
    department: "PEE",
    costCenter: "",
    wotype: "BRKD",
    startedDate: new Date().getTime(),
    completedDate: new Date().getTime(),
    sectionCode: "",
    approval: "Waiting",
    requestBy: "",
    status: "On Progress",
    lineName: "",
  },
};

DowntimeInfoUpdate.propTypes = {
  downtimeInfo: PropTypes.shape({
    downtimeId: PropTypes.number.isRequired,
    workOrder: PropTypes.string,
    assetName: PropTypes.string,
    assetNumber: PropTypes.string,
    department: PropTypes.string,
    costCenter: PropTypes.string,
    wotype: PropTypes.string,
    startedDate: PropTypes.number,
    completedDate: PropTypes.number,
    sectionCode: PropTypes.string,
    approval: PropTypes.string,
    requestBy: PropTypes.string,
    status: PropTypes.string,
    lineName: PropTypes.string,
    apdList: PropTypes.arrayOf(PropTypes.shape),
    itemChecks: PropTypes.arrayOf(PropTypes.shape),
    replacedParts: PropTypes.arrayOf(PropTypes.shape),
  }),
};

export default DowntimeInfoUpdate;
