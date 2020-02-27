export async function ExecuteContract(
  contractAddress,
  functionSelector,
  contractParameter
) {
  //get the contacct value
  window.tronWeb.contract().at(contractAddress, async (error, contract) => {
    if (error) return console.error(error);
    let returnvalue;
    try {
      //you have to send the one with a
      returnvalue =
        contractParameter == ""
          ? await contract[functionSelector]().send({ feeLimit: 10000000 })
          : await contract[functionSelector](contractParameter).send({
              feeLimit: 10000000
            });
    } catch (error) {
      //sometimes if they have the wrong value for the functionSelector this happens
      console.log(error);
    }
  });
}

export async function ExecuteInvestContract(
  contractAddress,
  functionSelector,
  contractParameter,
  amount,
  decimal
) {
  //get the contacct value
  window.tronWeb.contract().at(contractAddress, async (error, contract) => {
    if (error) return console.error(error);
    let returnvalue;
    let multiplier = Math.pow(10, decimal);
    let noDecimalValue = Number(amount) * multiplier;

    try {
      //you have to send the one with a
      returnvalue =
        contractParameter == ""
          ? await contract[functionSelector]().send({
              feeLimit: 10000000,
              callValue: noDecimalValue.toFixed(0)
            })
          : await contract[functionSelector](contractParameter).send({
              feeLimit: 10000000,
              callValue: noDecimalValue.toFixed(0)
            });
    } catch (error) {
      //sometimes if they have the wrong value for the functionSelector this happens
      console.log(error);
    }
  });
}
