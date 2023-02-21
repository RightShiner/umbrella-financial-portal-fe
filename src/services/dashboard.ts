import axios from "axios";

type Filters = {
  transaction: any
  sale: any
}
export const getCommissionData = async (sessionToken: string, filters: Filters) => {
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

  let transactionQueryString = "";
  if (filters.transaction != null) {
    transactionQueryString = `?filters=${btoa(JSON.stringify(filters.transaction))}`;
  }
  let saleQueryString = "";
  if (filters.sale != null) {
    saleQueryString = `?filters=${btoa(JSON.stringify(filters.sale))}`;
  }

  await axios({
    method: "get",
    headers: headers,
    url: `https://umbrella.rest.ghlmanager.com/statistics/commission/total${transactionQueryString}`,
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
    url: `https://umbrella.rest.ghlmanager.com/statistics/commission/total${transactionQueryString}`,
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
    url: `https://umbrella.rest.ghlmanager.com/statistics/commission/average${transactionQueryString}`,
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
    url: `https://umbrella.rest.ghlmanager.com/statistics/commission/total${transactionQueryString}`,
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
    url: `https://umbrella.rest.ghlmanager.com/statistics/revenue/total${saleQueryString}`,
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
    url: `https://umbrella.rest.ghlmanager.com/statistics/sales/total${saleQueryString}`,
  })
    .then(function (response) {
      akaSales = response.data.result;
    })
    .catch(function (err) {
      console.log(err);
    });

  akaDeli = "Coming Soon"

  akaProj = "Coming Soon"

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
