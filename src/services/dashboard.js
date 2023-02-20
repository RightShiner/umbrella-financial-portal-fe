import axios from "axios";

export const getCommissionData = async (sessionToken) => {
  const headers = {
    Authorization: `Bearer ${sessionToken}`,
  };

  let totalComPaid = "";
  let totalCom = "";
  let avgCom = "";
  let towardsGoal = "";
  let akaRev = "";
  let akaSales = "";
  let akaDeli = "";
  let akaProj = "";

  await axios({
    method: "get",
    headers: headers,
    url: "https://umbrella.rest.ghlmanager.com/statistics/commission/total",
  })
    .then(function (response) {
      totalComPaid = response.data.result;
    })
    .catch(function (err) {
      console.log(err);
    });

  await axios({
    method: "get",
    headers: headers,
    url: "https://umbrella.rest.ghlmanager.com/statistics/commission/total",
  })
    .then(function (response) {
      totalCom = response.data.result;
    })
    .catch(function (err) {
      console.log(err);
    });

  await axios({
    method: "get",
    headers: headers,
    url: "https://umbrella.rest.ghlmanager.com/statistics/commission/average",
  })
    .then(function (response) {
      avgCom = response.data.result;
    })
    .catch(function (err) {
      console.log(err);
    });

  await axios({
    method: "get",
    headers: headers,
    url: "https://umbrella.rest.ghlmanager.com/statistics/commission/total",
  })
    .then(function (response) {
      towardsGoal = response.data.result;
    })
    .catch(function (err) {
      console.log(err);
    });

  await axios({
    method: "get",
    headers: headers,
    url: "https://umbrella.rest.ghlmanager.com/statistics/revenue/total",
  })
    .then(function (response) {
      akaRev = response.data.result;
    })
    .catch(function (err) {
      console.log(err);
    });

  await axios({
    method: "get",
    headers: headers,
    url: "https://umbrella.rest.ghlmanager.com/statistics/sales/total",
  })
    .then(function (response) {
      akaSales = response.data.result;
    })
    .catch(function (err) {
      console.log(err);
    });

  await axios({
    method: "get",
    headers: headers,
    url: "https://umbrella.rest.ghlmanager.com/statistics/commission/total",
  })
    .then(function (response) {
      akaDeli = response.data.result;
    })
    .catch(function (err) {
      console.log(err);
    });

  await axios({
    method: "get",
    headers: headers,
    url: "https://umbrella.rest.ghlmanager.com/statistics/commission/total",
  })
    .then(function (response) {
      akaProj = response.data.result;
    })
    .catch(function (err) {
      console.log(err);
    });

  return {
    totalComPaid,
    totalCom,
    avgCom,
    towardsGoal,
    akaRev,
    akaSales,
    akaDeli,
    akaProj,
  };
};
