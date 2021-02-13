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
          ? await contract[functionSelector]().send({ feeLimit: 100000000 })
          : await contract[functionSelector](contractParameter).send({
              feeLimit: 100000000,
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
  decimal,
  inputType,

  tokenId
) {
  //get the contacct value
  window.tronWeb.contract().at(contractAddress, async (error, contract) => {
    if (error) return console.error(error);
    let returnvalue;
    let multiplier = Math.pow(10, decimal);
    let noDecimalValue = Number(amount) * multiplier;
    if (!inputType) {
      inputType = "";
    }
    //its different for trx compaired 2 a token

    try {
      if (inputType == "trx") {
        //you have to send the one with a
        returnvalue =
          contractParameter == ""
            ? await contract[functionSelector]().send({
                feeLimit: 100000000,
                callValue: noDecimalValue.toFixed(0),
              })
            : await contract[functionSelector](contractParameter).send({
                feeLimit: 100000000,
                callValue: noDecimalValue.toFixed(0),
              });
      } else if (tokenId && Number(tokenId) > 0) {
        //you have to send the one with a trx 10 token
        returnvalue =
          contractParameter == ""
            ? await contract[functionSelector]().send({
                feeLimit: 100000000,
                tokenId: tokenId,
                tokenValue: noDecimalValue.toFixed(0),
              })
            : await contract[functionSelector](contractParameter).send({
                feeLimit: 100000000,
                tokenId: tokenId,
                tokenValue: noDecimalValue.toFixed(0),
              });
      } else {
        returnvalue =
          contractParameter == ""
            ? await contract[functionSelector](noDecimalValue.toFixed(0)).send({
                feeLimit: 100000000,
              })
            : await contract[functionSelector](noDecimalValue.toFixed(0)).send({
                feeLimit: 100000000,
              });
      }
    } catch (error) {
      //sometimes if they have the wrong value for the functionSelector this happens
      console.log(error);
    }
  });
}
