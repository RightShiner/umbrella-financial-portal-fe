import axios from "axios";

type Filters = {
  transaction: any
  sale: any
}
export const getRevenueTimeSeriesData = async (sessionToken: string, filters: Filters) => {
  const headers = {
    Authorization: `Bearer ${sessionToken}`,
  };
  const sales: any = [];

  let saleQueryString = `?select=${btoa(JSON.stringify({ purchasePrice: true, dateCreated: true, id: true }))}`;
  if (filters.sale != null) {
    saleQueryString += `&filters=${btoa(JSON.stringify(filters.sale))}`;
  }
  await axios({
    method: "get",
    headers: headers,
    url: `https://umbrella.rest.ghlmanager.com/sales${saleQueryString}`,
  })
    .then(function (response) {
      if (response.data == null) {
        return;
      }
      if (!Array.isArray(response.data.sales)) {
        return;
      }

      sales.push(...response.data.sales.map((sale: any) => {
        sale.dateCreated = new Date(sale.dateCreated);
        sale.purchasePrice = Number(sale.purchasePrice);
        return sale;
      }));
    })
    .catch(function (err) {
      console.log(err);
    });
  sales.sort((a: any, b: any) => {
    return a.dateCreated.getTime() - b.dateCreated.getTime();
  });
  for (const [index, sale] of sales.entries()) {
    if (index === 0) {
      sale.cumulativeRevenue = 0;
      continue;
    };
    sale.cumulativeRevenue = sales[index - 1].cumulativeRevenue + sale.purchasePrice;
    console.log(typeof sale.purchasePrice);
  }
  return sales;
}
export const getTransactionsTimeSeriesData = async (sessionToken: string, filters: Filters) => {
  const headers = {
    Authorization: `Bearer ${sessionToken}`,
  };
  const transactions: any = [];

  let transactionQueryString = `?select=${btoa(JSON.stringify({ amount: true, name: true, dateCreated: true, id: true }))}`;
  if (filters.transaction != null) {
    transactionQueryString += `&filters=${btoa(JSON.stringify(filters.transaction))}`;
  }
  await axios({
    method: "get",
    headers: headers,
    url: `https://umbrella.rest.ghlmanager.com/transactions${transactionQueryString}`,
  })
    .then(function (response) {
      if (response.data == null) {
        return;
      }
      if (!Array.isArray(response.data.transactions)) {
        return;
      }

      transactions.push(...response.data.transactions.map((transaction: any) => {
        transaction.dateCreated = new Date(transaction.dateCreated);
        transaction.purchasePrice = Number(transaction.purchasePrice);
        return transaction;
      }));
    })
    .catch(function (err) {
      console.log(err);
    });
  transactions.sort((a: any, b: any) => {
    return a.dateCreated.getTime() - b.dateCreated.getTime();
  });

  return transactions;
}
export const getSalesLeaderboard = async (sessionToken: string, filters: Filters) => {
  const headers = {
    Authorization: `Bearer ${sessionToken}`,
  };
  const users: any = [];

  let userQueryString = `?select=${btoa(JSON.stringify({
    id: true,
    name: true,
    sales: {
      where: filters.sale,
      select: {
        purchasePrice: true,
        dateCreated: true,
        id: true
      }
    }
  }))}`;
  await axios({
    method: "get",
    headers: headers,
    url: `https://umbrella.rest.ghlmanager.com/users${userQueryString}`,
  })
    .then(function (response) {
      if (response.data == null) {
        return;
      }
      if (!Array.isArray(response.data.users)) {
        return;
      }

      users.push(...response.data.users.map((user: any) => {
        user.sales = user.sales.map((sale: any) => {
          sale.dateCreated = new Date(sale.dateCreated);
          sale.purchasePrice = Number(sale.purchasePrice);
          return sale;
        });
        user.totalSales = user.sales.reduce((accumulater: number, currentValue: any) => accumulater + currentValue.purchasePrice, 0);
        return user;
      }));
    })
    .catch(function (err) {
      console.log(err);
    });
  users.sort((a: any, b: any) => b.totalSales - a.totalSales);
  return users;
}
export const getCommissionData = async (sessionToken: string, filters: Filters) => {
  const headers = {
    Authorization: `Bearer ${sessionToken}`,
  };

  const commissionData = {
    totalCommissionPaid: 0,
    totalCommission: 0,
    averageCommission: 0,
    amountTowardsGoalInProfileSection: 0,
    revenue: 0,
    saleCount: 0,
    delinquents: <any>0,
    projections: <any>0
  }

  let transactionQueryString = "";
  if (filters.transaction != null) {
    transactionQueryString = `?filters=${btoa(JSON.stringify(filters.transaction))}`;
  }
  let saleQueryString = "";
  if (filters.sale != null) {
    saleQueryString = `?filters=${btoa(JSON.stringify(filters.sale))}`;
  }

  const promises: Promise<void>[] = [];
  promises.push(axios({
    method: "get",
    headers: headers,
    url: `https://umbrella.rest.ghlmanager.com/statistics/commission/total${transactionQueryString}`,
  })
    .then(function (response) {
      commissionData.totalCommissionPaid = Number(response.data.result);
    })
    .catch(function (err) {
      console.log(err);
    }));

  promises.push(axios({
    method: "get",
    headers: headers,
    url: `https://umbrella.rest.ghlmanager.com/statistics/commission/total${transactionQueryString}`,
  })
    .then(function (response) {
      commissionData.totalCommission = Number(response.data.result);
    })
    .catch(function (err) {
      console.log(err);
    }));

  promises.push(axios({
    method: "get",
    headers: headers,
    url: `https://umbrella.rest.ghlmanager.com/statistics/commission/average${transactionQueryString}`,
  })
    .then(function (response) {
      commissionData.averageCommission = Number(response.data.result);
    })
    .catch(function (err) {
      console.log(err);
    }));

  promises.push(axios({
    method: "get",
    headers: headers,
    url: `https://umbrella.rest.ghlmanager.com/statistics/commission/total${transactionQueryString}`,
  })
    .then(function (response) {
      commissionData.amountTowardsGoalInProfileSection = Number(response.data.result);
    })
    .catch(function (err) {
      console.log(err);
    }));

  promises.push(axios({
    method: "get",
    headers: headers,
    url: `https://umbrella.rest.ghlmanager.com/statistics/revenue/total${saleQueryString}`,
  })
    .then(function (response) {
      commissionData.revenue = Number(response.data.result);
    })
    .catch(function (err) {
      console.log(err);
    }));

  promises.push(axios({
    method: "get",
    headers: headers,
    url: `https://umbrella.rest.ghlmanager.com/statistics/sales/total${saleQueryString}`,
  })
    .then(function (response) {
      commissionData.saleCount = Number(response.data.result);
    })
    .catch(function (err) {
      console.log(err);
    }));

  await Promise.all(promises);
  commissionData.delinquents = "Coming Soon"

  commissionData.projections = "Coming Soon"
  // console.log(`commissionData : ${commissionData}`);
  return commissionData;
};
