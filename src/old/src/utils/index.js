import contracts from "../config/contracts";
import axios from "axios";
import safemathcontract from "../config/safemathcontract";
import pokertroncontract from "../config/pokertroncontract";
import tronextcontract from "../config/tronextcontract";
import oneupcontract from "../config/oneupcontract";
import eeedivdata from "../config/888contract";
import rocketdivdata from "../config/rocketcontract";
import blazedata from "../config/blazecontract";
import creditsdata from "../config/bankrollcreditscontract";
import tronwowdata from "../config/tronwowcontract";
import livedata from "../config/livecontract";
import dragoncasteldata from "../config/dragoncastelcontract";
import erc20contractdata from "../config/erc20contract";
import fragstakingcontractdata from "../config/fragstakingcontract";
import voidstakingcontractdata from "../config/voidstakingcontract";
import dashbankcontractdata from "../config/DashBank";
import energycontractdata from "../config/energycontract";
import dicecontractdata from "../config/dicecontract";
import lottocontractdata from "../config/DashLotto";
import tronbetwincontractdata from "../config/tronbetwincontract";
import trontopiacontractdata from "../config/topiacontract";
import bankrollmooncontractdata from "../config/bankrollmoon";
import tewkenairecontractdata from "../config/tewkenaire";
import tewkenairestablecontractdata from "../config/tewkenairestable";
import bttbankcontractdata from "../config/BTTBankContract";
import trxbankcontractdata from "../config/trxbankcontract";
import justgamecontractdata from "../config/justgamecontract";
import boostcontractdata from "../config/boost";

const creditscontract = creditsdata["bankrollcreditsdata"];
const bttBankContract = bttbankcontractdata["BTTBankData"];
const trxBankContract = trxbankcontractdata["TrxBankData"];

//trxbankcontractdata
const eeedivdataContract = eeedivdata["888DividendsData"];
const rocketdivdataContract = rocketdivdata["RocketDividendsData"];
const eeedivdControllerContract =
  contracts["888DivController.sol:888DivController"];
const tewkenaireContract = tewkenairecontractdata["tewkenaireData"];
const tewkenaireStableContract =
  tewkenairestablecontractdata["tewkenaireStableData"];

//tewkenairestablecontractdata
const p3TDailyROIContract = contracts["P3TDailyROI.sol:P3TDailyROI"];
const bankRollDailyROIContract =
  contracts["BankRollDailyROI.sol:BankRollDailyROI"];
const tronPaysDailyROIContract =
  contracts["TronPaysDailyROI.sol:TronPaysDailyROI"];
const tronDoubleDailyROIContract =
  contracts["TronDoubleDailyROI.sol:TronDoubleDailyROI"];

const tronBetAnteStakerContract =
  contracts["TronBetAnteStaker.sol:TronBetAnteStaker"];
const tronBetAnteStakerContract2 =
  contracts["TronBetAnteStaker2.sol:TronBetAnteStaker2"];
const tronPaysTokenContract = contracts["TronPaysToken.sol:TronPaysToken"];
const p3TTokenContract = contracts["P3TToken.sol:P3TToken"];
const d3TTokenContract = contracts["D3TToken.sol:D3TToken"];
const tronShrimpContract = contracts["TronShrimp.sol:TronShrimp"];

const tronVegasContract = contracts["TronVegas.sol:TronVegas"];
const tronVegas2Contract = contracts["TronVegas2.sol:TronVegas2"];
const tronRaider1Contract = contracts["TronRaider1.sol:TronRaider1"];
const tronRaider2Contract = contracts["TronRaider2.sol:TronRaider2"];
const safemathroicontract =
  safemathcontract["SafeMathDailyROI.sol:SafeMathDailyROI"];
const pokertroncontractcode = pokertroncontract["PokerTron.sol:PokerTron"];
const pokertrontokencontractcode =
  pokertroncontract["PokerTronCoin.sol:PokerTronCoin"];
const pokertronbjcontractcode = pokertroncontract["PokerTronBJ"];
const tronextcontractcode = tronextcontract["tronexttoken.sol:TronextToken"];
const oneup = oneupcontract["oneup.sol:oneup"];
const blazecontract = blazedata["blaze"];
const drasoncastlecontract = dragoncasteldata["dragoncastle"];
const drasoncastlecontract2 = dragoncasteldata["dragoncastle2"];
const tronwowcontract = tronwowdata["tronwow"];
const livecontract = livedata["livestake"];
const erc20contract = erc20contractdata["erc20"];
const erc20contractbnkr = erc20contractdata["erc202"];
const erc20contractdash = erc20contractdata["dasherc20"];
const fragcontract = fragstakingcontractdata["fragstaking"];
const voidcontract = voidstakingcontractdata["voidstaking"];
const dashbankcontract = dashbankcontractdata["DashBankData"];
const energycontract = energycontractdata["energydata"];
const dicecontract = dicecontractdata["dicedata"];
const dashlottocontract = lottocontractdata["dashlotto"];
const tronbetwincontract = tronbetwincontractdata["tronbetwindata"];
const trontopiadivcontract = trontopiacontractdata["TopiaDividendsData"];
const trontopiatokencontract = trontopiacontractdata["TopiaTokenData"];
const trontopiadiamonddivcontract =
  trontopiacontractdata["TopiaDiamondDivData"];
const trontopiadiamondtokencontract =
  trontopiacontractdata["TopiaDiamondTokenData"];
const bankrollmooncontract = bankrollmooncontractdata["bankrollmoondata"];
const justgamecontract = justgamecontractdata["justgameDividendsData"];
const boostcontract = boostcontractdata["BoostData"];

//boostcontractdata
//justgamecontractdata
//trxbankcontractdata
//bankrollmooncontractdata
//
//trontopiacontractdata
//energycontractdata
//dicecontractdata
const utils = {
  refferaladdress: "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT",
  tronWeb: false,
  dicecontract: false,
  contract: false,
  bttBankContract: false,
  trxBankContract: false,
  erc20contract: false,
  rocketerc20contract: false,
  trontopiadiamondtokencontract: false,
  trontopiadiamonddivcontract: false,
  voidcontract: false,
  dashlottocontract: false,
  p3TDailyROIContract: false,
  bankRollDailyROIContract: false,
  tronPaysDailyROIContract: false,
  tronDoubleDailyROIContract: false,
  tronBetAnteStakerContract: false,
  tronBetAnteStakerContract2: false,
  tewkenaireStableContract: false,
  tronPaysTokenContract: false,
  d3TTokenContract: false,
  blazecontract: false,
  trontopiacontract: false,
  erc20contractbnkr: false,
  tewkenaireContract: false,
  drasoncastlecontract: false,
  drasoncastlecontract2: false,
  eeedivdataContract: false,
  tronRaider1Contract: false,
  tronRaider2Contract: false,
  safemathroicontract: false,
  trontopiatokencontract: false,
  pokertroncontractcode: false,
  pokertrontokencontractcode: false,
  tronextcontractcode: false,
  creditscontract: false,
  rocketdivdataContract: false,
  erc20contractdash: false,
  pokertronbjcontractcode: false,
  oneup: false,
  fragcontract: false,
  livecontract: false,
  tronwowcontract: false,
  dashbankcontract: false,
  energycontract: false,
  tronbetwincontract: false,
  boostcontract: false,
  bankrollmooncontract: false,
  justgamecontract: false,
  boostcontractdata: false,
  setTronWeb(tronWeb) {
    this.tronWeb = tronWeb;

    //   this.contract = tronWeb.contract(contract.abi, contract.address);
    this.bankRollDailyROIContract = tronWeb.contract(
      bankRollDailyROIContract.abi,
      bankRollDailyROIContract.address
    );

    this.p3TDailyROIContract = tronWeb.contract(
      p3TDailyROIContract.abi,
      p3TDailyROIContract.address
    );
    this.tronPaysDailyROIContract = tronWeb.contract(
      tronPaysDailyROIContract.abi,
      tronPaysDailyROIContract.address
    );
    this.tronDoubleDailyROIContract = tronWeb.contract(
      tronDoubleDailyROIContract.abi,
      tronDoubleDailyROIContract.address
    );
    this.blazecontract = tronWeb.contract(
      blazecontract.abi,
      blazecontract.address
    );
    this.tronBetAnteStakerContract = tronWeb.contract(
      tronBetAnteStakerContract.abi,
      tronBetAnteStakerContract.address
    );
    this.tronBetAnteStakerContract2 = tronWeb.contract(
      tronBetAnteStakerContract2.abi,
      tronBetAnteStakerContract2.address
    );
    this.tronPaysTokenContract = tronWeb.contract(
      tronPaysTokenContract.abi,
      tronPaysTokenContract.address
    );
    this.p3TTokenContract = tronWeb.contract(
      p3TTokenContract.abi,
      p3TTokenContract.address
    );
    this.d3TTokenContract = tronWeb.contract(
      d3TTokenContract.abi,
      d3TTokenContract.address
    );
    this.tronShrimpContract = tronWeb.contract(
      tronShrimpContract.abi,
      tronShrimpContract.address
    );
    this.eeedivdataContract = tronWeb.contract(
      eeedivdataContract.abi,
      eeedivdataContract.address
    );
    this.eeedivdControllerContract = tronWeb.contract(
      eeedivdControllerContract.abi,
      eeedivdControllerContract.address
    );
    this.tronVegasContract = tronWeb.contract(
      tronVegasContract.abi,
      tronVegasContract.address
    );
    this.tronVegas2Contract = tronWeb.contract(
      tronVegas2Contract.abi,
      tronVegas2Contract.address
    );
    this.tronRaider1Contract = tronWeb.contract(
      tronRaider1Contract.abi,
      tronRaider1Contract.address
    );
    this.tronRaider2Contract = tronWeb.contract(
      tronRaider2Contract.abi,
      tronRaider2Contract.address
    );
    this.safemathroicontract = tronWeb.contract(
      safemathroicontract.abi,
      safemathroicontract.address
    );
    this.pokertroncontractcode = tronWeb.contract(
      pokertroncontractcode.abi,
      pokertroncontractcode.address
    );

    this.pokertrontokencontractcode = tronWeb.contract(
      pokertrontokencontractcode.abi,
      pokertrontokencontractcode.address
    );

    this.tronextcontractcode = tronWeb.contract(
      tronextcontractcode.abi,
      tronextcontractcode.address
    );
    this.oneup = tronWeb.contract(oneup.abi, oneup.address);

    this.creditscontract = tronWeb.contract(
      creditscontract.abi,
      creditscontract.address
    );
    this.tronwowcontract = tronWeb.contract(
      tronwowcontract.abi,
      tronwowcontract.address
    );
    this.livecontract = tronWeb.contract(
      livecontract.abi,
      livecontract.address
    );
    this.drasoncastlecontract = tronWeb.contract(
      drasoncastlecontract.abi,
      drasoncastlecontract.address
    );
    this.drasoncastlecontract2 = tronWeb.contract(
      drasoncastlecontract2.abi,
      drasoncastlecontract2.address
    );
    this.pokertronbjcontractcode = tronWeb.contract(
      pokertronbjcontractcode.abi,
      pokertronbjcontractcode.address
    );
    this.erc20contract = tronWeb.contract(
      erc20contract.abi,
      erc20contract.address
    );

    this.rocketdivdataContract = tronWeb.contract(
      rocketdivdataContract.abi,
      rocketdivdataContract.address
    );

    this.erc20contractbnkr = tronWeb.contract(
      erc20contractbnkr.abi,
      erc20contractbnkr.address
    );
    this.fragcontract = tronWeb.contract(
      fragcontract.abi,
      fragcontract.address
    );
    this.voidcontract = tronWeb.contract(
      voidcontract.abi,
      voidcontract.address
    );
    this.erc20contractdash = tronWeb.contract(
      erc20contractdash.abi,
      erc20contractdash.address
    );

    this.energycontract = tronWeb.contract(
      energycontract.abi,
      energycontract.address
    );

    this.dashbankcontract = tronWeb.contract(
      dashbankcontract.abi,
      dashbankcontract.address
    );
    this.dicecontract = tronWeb.contract(
      dicecontract.abi,
      dicecontract.address
    );
    this.dashlottocontract = tronWeb.contract(
      dashlottocontract.abi,
      dashlottocontract.address
    );
    this.tronbetwincontract = tronWeb.contract(
      tronbetwincontract.abi,
      tronbetwincontract.address
    );
    this.trontopiadivcontract = tronWeb.contract(
      trontopiadivcontract.abi,
      trontopiadivcontract.address
    );
    this.trontopiatokencontract = tronWeb.contract(
      trontopiatokencontract.abi,
      trontopiatokencontract.address
    );

    this.trontopiadiamonddivcontract = tronWeb.contract(
      trontopiadiamonddivcontract.abi,
      trontopiadiamonddivcontract.address
    );
    this.trontopiadiamondtokencontract = tronWeb.contract(
      trontopiadiamondtokencontract.abi,
      trontopiadiamondtokencontract.address
    );
    this.bankrollmooncontract = tronWeb.contract(
      bankrollmooncontract.abi,
      bankrollmooncontract.address
    );
    this.tewkenaireContract = tronWeb.contract(
      tewkenaireContract.abi,
      tewkenaireContract.address
    );
    this.trxBankContract = tronWeb.contract(
      trxBankContract.abi,
      trxBankContract.address
    );
    this.bttBankContract = tronWeb.contract(
      bttBankContract.abi,
      bttBankContract.address
    );
    this.justgamecontract = tronWeb.contract(
      justgamecontract.abi,
      justgamecontract.address
    );
    this.boostcontract = tronWeb.contract(
      boostcontract.abi,
      boostcontract.address
    );
    this.tewkenaireStableContract = tronWeb.contract(
      tewkenaireStableContract.abi,
      tewkenaireStableContract.address
    );

    //tewkenaireStableContract
    //bttBankContract
    //justgamecontract
  },

  //dragon castle

  async fetchdragonfrozen(address) {
    //get user frozen
    const message2 = await this.drasoncastlecontract.getFreeze(address).call();

    let userfrozen = message2.value.toNumber() * 0.000001;

    return userfrozen.toLocaleString("en") + " dc";
  },

  async fetchdragoncastlepool() {
    //get user frozen
    const message2 = await this.drasoncastlecontract2.getRewardPool().call();
    let returnvalue = message2.toNumber() * 0.000001;
    returnvalue = returnvalue.toFixed(0);

    return returnvalue.toLocaleString("en");
  },

  async fetchdragondivs(address, divpool) {
    //get user frozen
    const message2 = await this.drasoncastlecontract.getFreeze(address).call();

    let userfrozen = message2.value.toNumber() * 0.000001;

    //get total fozen

    const message1 = await this.drasoncastlecontract._totalFreeze().call();

    let totalfrozen = message1.toNumber() * 0.000001;

    let total = (divpool / totalfrozen) * userfrozen;

    return "* " + total.toFixed(2).toLocaleString("en");
  },

  async fetchlivedivs(address, divpool) {
    const message = await this.livecontract.getTotalStakeLive().call();

    var totalfrozen = message.totalAmount.toNumber() * 0.000001;

    //console.log(totalfrozen);

    //get user frozen
    const message2 = await this.livecontract
      .getStakeInfoByAddress(address)
      .call();

    var userfrozen = message2.liveAmount.toNumber() * 0.000001;

    var divpool = Number(divpool).toFixed(2);

    var total = ((divpool / totalfrozen) * userfrozen).toFixed(2);
    total = total;

    return "* " + total.toLocaleString("en");
  },

  async fetchlivefrozen(address) {
    //get user frozen
    const message2 = await this.livecontract
      .getStakeInfoByAddress(address)
      .call();

    var userfrozen = message2.liveAmount.toNumber() * 0.000001;

    return userfrozen.toLocaleString("en") + " live";
  },

  //tron wow
  async fetchtronwowinvestment(address) {
    const message = await this.tronwowcontract.frozenOf(address).call();

    var totalmsg = Number((message.toNumber() * 0.000000001).toFixed(2));
    return totalmsg.toLocaleString("en") + " wow";
  },

  async fetchtronwowdivs(address, totalfrozen, divpool) {
    const message = await this.tronwowcontract.frozenOf(address).call();

    var investment = Number((message.toNumber() * 0.000000001).toFixed(2));

    var total = ((divpool / totalfrozen) * investment).toFixed(2);

    return "* " + total.toLocaleString("en");
  },

  //credits
  async fetchcreditscontractbalance() {
    const message = await this.creditscontract.totalTronBalance().call();

    return (message.toNumber() * 0.000001).toFixed(0).toString();
  },
  async fetchcreditsinvestment(address) {
    const message = await this.creditscontract.balanceOf(address).call();
    var messagenum = (message.toNumber() * 0.000001).toFixed(2);
    return Number(messagenum).toLocaleString("en");
  },
  async fetchcreditsrefferal() {
    const message = await this.creditscontract.myReferrals().call();
    var messagenum = (message.toNumber() * 0.000001).toFixed(2);
    return Number(messagenum).toLocaleString("en");
  },
  async fetchcreditsdividends(address) {
    const message = await this.creditscontract.myDividends(address).call();
    var messagenum = (message.toNumber() * 0.000001).toFixed(2);
    return Number(messagenum).toLocaleString("en");
  },
  async creditswithdrawl() {
    const message = await this.creditscontract
      .withdraw()
      .send({ feeLimit: 100000000 });

    return;
  },
  async creditsreinvest(address, percentage, refferal) {
    console.log(percentage);
    if (percentage == 1) {
      const message = await this.creditscontract
        .reinvest()
        .send({ feeLimit: 100000000 });
    } else {
      const message = await this.creditscontract.myDividends(address).call();

      var mydivs = message.toNumber();

      var reinvestamount = mydivs;
      reinvestamount = reinvestamount * 0.000001;

      var reinvestpercentage = percentage;
      var newreinvestamount = reinvestamount * reinvestpercentage;
      newreinvestamount = newreinvestamount * 1000000;

      if (!refferal) {
        refferal = this.refferaladdress;
      }
      //withdrawl balance
      this.creditscontract.withdraw().send({ feeLimit: 100000000 });
      // reinvest here
      await this.creditscontract.buy(refferal).send({
        callValue: newreinvestamount.toFixed(0),
      });
    }

    return;
  },
  //bankroll moon
  async fetchmooncontractbalance() {
    const message = await this.bankrollmooncontract.totalSupply().call();

    return (message.toNumber() * 0.000001).toFixed(0).toString();
  },
  async fetchmooninvestment(address) {
    const message = await this.bankrollmooncontract.balanceOf(address).call();
    var messagenum = (message.toNumber() * 0.000001).toFixed(2);
    return Number(messagenum).toLocaleString("en") + " moon";
  },
  async fetchmoonrefferal() {
    const message = await this.bankrollmooncontract.myReferrals().call();
    var messagenum = (message.toNumber() * 0.000001).toFixed(2);
    return Number(messagenum).toLocaleString("en");
  },
  async fetchmoondividends(address) {
    const message = await this.bankrollmooncontract.myDividends(address).call();
    var messagenum = (message.toNumber() * 0.000001).toFixed(2);
    return Number(messagenum).toLocaleString("en");
  },
  async moonwithdrawl() {
    const message = await this.bankrollmooncontract
      .withdraw()
      .send({ feeLimit: 100000000 });

    return;
  },
  async moonreinvest() {
    const message = await this.bankrollmooncontract
      .reinvest()
      .send({ feeLimit: 100000000 });

    return;
  },

  //rocketgame

  async fetchrocketinvestment(address) {
    const message = await this.rocketdivdataContract.getInfo(address).call();
    var messagenum = (message[1].toNumber() * 0.000001).toFixed(2);
    return Number(messagenum).toLocaleString("en") + " rocket";
  },

  async fetchrocketdividends(address, pot, frozen) {
    const message = await this.rocketdivdataContract.getInfo(address).call();
    var investment = (message[1].toNumber() * 0.000001).toFixed(2);

    var total = ((pot * 0.1) / frozen) * investment;

    return "* " + total.toFixed(2).toLocaleString("en");
  },

  //blaze
  async fetchblazecontractbalance() {
    const message = await this.blazecontract.getStatus().call();

    return (message[3].toNumber() * 0.000001).toFixed(0).toString();
  },

  async fetchblazeinvestment(address) {
    const message = await this.blazecontract.getAccount(address).call();

    return (
      (message[0][2].toNumber() * 0.000001).toFixed(2).toLocaleString("en") +
      " blz"
    );
  },
  async fetchblazeRefferal(address) {
    return "--";
    const message = await this.blazecontract.getAccount(address).call();

    return (message[0][0].toNumber() * 0.000001)
      .toFixed(2)
      .toLocaleString("en");
  },
  async fetchblazedivs(address) {
    // const message = await this.blazecontract.getAccount(address).call();
    //  console.log(message);
    var availabledivs = 0;
    if (availabledivs == 0) {
      //calculate estimated divs

      const message0 = await this.blazecontract.getStatus().call();

      const message1 = await this.blazecontract.getAccount(address).call();

      var totalfrozen = message0[2].toNumber() * 0.000001;
      var myfrozen = message1[0][2].toNumber() * 0.000001;
      var divpool = message0[3].toNumber() * 0.000001;

      var total = (divpool / totalfrozen) * myfrozen;

      return "* " + total.toFixed(2).toLocaleString("en");
    } else {
      return "0";
      //  return availabledivs.toFixed(2).toLocaleString("en");
    }
  },
  async blazewithdrawl() {
    this.blazecontract.claim().send({ feeLimit: 100000000 });
    return;
  },
  //oneup
  async fetchoneupContractBalance() {
    const message = await this.oneup.getContractDetail().call();

    return (message._balance.toNumber() * 0.000001).toFixed(0).toString();
  },

  // oneup rot

  //oneup
  async fetchoneupInvestment(address) {
    const message = await this.oneup.getPlayerDetail(address).call();
    var total = Number((message._investment.toNumber() * 0.000001).toFixed(2));
    return total.toLocaleString("en");
  },
  async fetchoneupAvailableDividend(address) {
    const message = await this.oneup.getPlayerDetail(address).call();
    return (message._dividendsCanWithdraw.toNumber() * 0.000001)
      .toFixed(2)
      .toString();
  },

  async fetchoneupRefferalReward(address) {
    const message = await this.oneup.getPlayerDetail(address).call();
    return (message._referral.toNumber() * 0.000001).toFixed(2).toString();
  },
  async oneupwithdrawl() {
    this.oneup.withdraw().send({ feeLimit: 100000000 });
    return;
  },
  async oneupreinvest(address, percentage, refferal) {
    var message = await this.oneup.getPlayerDetail(address).call();

    var mydivs = message._dividendsCanWithdraw.toNumber();

    var reinvestamount = mydivs;
    reinvestamount = reinvestamount * 0.000001;
    var reinvestpercentage = percentage;
    var newreinvestamount = reinvestamount * reinvestpercentage;
    newreinvestamount = newreinvestamount * 1000000;

    if (!refferal) {
      refferal = this.refferaladdress;
    }
    //withdrawl balance
    this.oneup.withdraw().send({ feeLimit: 100000000 });
    // reinvest here
    this.oneup.buy(refferal).send({
      callValue: newreinvestamount.toFixed(0),
    });

    return;
  },

  //tronext
  async fetchTronextAvailableDivs(address, divpoolamount, frozenamount) {
    const message = await this.tronextcontractcode
      .getDividendBalance(address)
      .call();
    const divbalance = message.toNumber();

    if (divbalance > 0) {
      return (divbalance * 0.000001).toFixed(2);
    } else {
      if (divpoolamount && frozenamount) {
        var message2 = await this.tronextcontractcode
          .tokenBalances(address)
          .call();

        //   console.log(total);
        var mydivs = message2[2].toNumber() * 0.000001;

        var total = (Number(divpoolamount) / Number(frozenamount)) * mydivs;

        total = total / 7;
        return "* " + total.toFixed(2).toString();
      } else {
        return 0;
      }
    }
  },
  async fetchTronextInvestment(address) {
    const message = await this.tronextcontractcode
      .tokenBalances(address)
      .call();

    if (message) {
      const divpool = message[2].toNumber();
      return (divpool * 0.000001).toFixed(2).toString() + " tnx";
    } else {
      return 0;
    }
  },
  async fetchTronextRefferal(address) {
    const message = await this.tronextcontractcode
      .getReferralBalances(address)
      .call();

    const divpool = message[0].toNumber();
    return (divpool * 0.000001).toFixed(2);
  },
  async fetchTronextTotalFrozen(address) {
    const message = await this.tronextcontractcode
      .getReferralBalances(address)
      .call();

    const divpool = message[0].toNumber();
    return (divpool * 0.000001).toFixed(2);
  },

  async withdrawlTronext(address) {
    const message = await this.tronextcontractcode
      .getDividendBalance(address)
      .call();

    this.tronextcontractcode
      .withdrawDividends(message.toNumber())
      .send({ feeLimit: 100000000 });

    //   return
    // return (divpool * 0.000001).toFixed(2);
  },

  //withdrawDividends

  //pokertron bj
  async fetchPokerTronBJBalance() {
    try {
      const message = await this.pokertronbjcontractcode.can_divid().call();
      const divpool = message.toNumber();

      return (divpool * 0.000001).toFixed(0);
    } catch (err) {
      return "0";
    }
  },
  async pokerTronBJwithdrawl() {
    this.pokertronbjcontractcode.withdraw_divi().send({ feeLimit: 100000000 });
    return;
  },
  async fetchPokerTronBJUserFrozen(address) {
    const message = await this.pokertronbjcontractcode
      .balanceOf(address)
      .call();

    const frozentokens = message.toNumber();

    return (frozentokens * 0.000001).toFixed(2).toString() + " pktbj";
  },
  async fetchPokerTronBJEstimatedDivs(address) {
    //first check 2 see if we have divs waiting

    //  get_divi_amount

    let messagediv = await this.pokertronbjcontractcode
      .get_divi_amount(address)
      .call();

    let mydivs = messagediv.toNumber();

    if (mydivs > 0) {
      return (mydivs * 0.000001).toFixed(2).toLocaleString("en");
    }
    try {
      //estimate it
      const message1 = await this.pokertronbjcontractcode._totalFreeze().call();

      let totalfrozentokens = message1.toNumber();

      const message = await this.pokertronbjcontractcode
        .balanceOf(address)
        .call();

      const messagepool = await this.pokertronbjcontractcode.can_divid().call();

      const divpool = messagepool.toNumber();

      const userfrozentokens = message.toNumber();

      var estimateDiv = (divpool / totalfrozentokens) * userfrozentokens;

      return "* " + (estimateDiv * 0.000001).toFixed(2).toLocaleString("en");
    } catch (err) {
      return "0";
    }
  },
  //pokertron
  async fetchPokerTronBalance() {
    const message = await this.tronWeb.trx.getBalance(
      pokertroncontractcode.address
    );
    //   console.log(message);

    //   const message = await this.pokertroncontractcode.can_divid().call();
    //  console.log(message);
    //  const divpool = message.toNumber();

    return (message * 0.000001).toFixed(0);
  },
  async getusertrxbalance(address) {
    const message = await this.tronWeb.trx.getBalance(address);

    return (message * 0.000001).toFixed(2);
  },
  async pokerTronwithdrawl() {
    this.pokertrontokencontractcode
      .withdraw_divi()
      .send({ feeLimit: 100000000 });
    return;
  },
  async fetchPokerTronUserFrozen(address) {
    const message = await this.pokertrontokencontractcode
      .freezeOf(address)
      .call();

    const frozentokens = message.toNumber();

    return (frozentokens * 0.000001).toFixed(2).toString() + " pkt";
  },
  async fetchPokerTronTotalFrozen(address) {
    const message = await this.pokertrontokencontractcode
      .totalFreeze(address)
      .call();

    const frozentokens = message.toNumber();
    return (frozentokens * 0.000001).toFixed(2).toString() + " pkt";
  },

  async fetchPokerTronEstimatedDivs(address) {
    //first check 2 see if we have divs waiting

    //  get_divi_amount

    //    let messagediv = await this.pokertrontokencontractcode
    //    .get_divi_amount()
    //  .call();
    let messagediv = await this.pokertrontokencontractcode
      .get_divi_amount()
      .call();

    let mydivs = messagediv.toNumber();

    if (mydivs > 0) {
      return (mydivs * 0.000001).toFixed(2).toLocaleString("en");
    }

    const message1 = await this.pokertrontokencontractcode.totalFreeze().call();

    const totalfrozentokens = message1.toNumber();

    const message = await this.pokertrontokencontractcode
      .freezeOf(address)
      .call();

    //  const messagepool = await this.pokertroncontractcode.can_divid().call();

    const messagepool = await this.tronWeb.trx.getBalance(
      pokertroncontractcode.address
    );

    const divpool = messagepool;

    const userfrozentokens = message.toNumber();

    var estimateDiv = (divpool / totalfrozentokens) * userfrozentokens;

    return "* " + (estimateDiv * 0.000001).toFixed(2).toLocaleString("en");
  },

  //tronraider
  //Balance
  async fetchTronRaiderBalance() {
    return "1464";
    const message = await this.tronRaider1Contract._publicRewardValue().call();

    const divpool = message.toNumber();
    return (divpool * 0.00001).toFixed(0);
  },

  //Balance
  async fetchTronRaiderFrozen(address) {
    const message = await this.tronRaider2Contract
      .getOwnerFrozenInfo(address)
      .call();

    const frozentokens = message.freezeValue.toNumber();

    return (frozentokens * 0.000001).toFixed(2).toString() + " rby";
  },

  async fetchTronRaiderRefferal(address) {
    return "--";
  },

  async fetchTronRaiderAvailableDivs(address) {
    //calc estimated payout
    const message = await this.tronRaider2Contract
      .getOwnerFrozenInfo(address)
      .call();

    //players token count
    const frozentokens = message.freezeValue.toNumber() * 0.000001;
    //total div pool
    const messagediv = await this.tronRaider1Contract
      ._publicRewardValue()
      .call();

    let divpool = messagediv.toNumber() * 0.00001;

    //total token count
    //get devtokencount
    const messagedevamount = await this.tronRaider1Contract
      .getDevTokenCount()
      .call();

    const messagegetplayerfrozrnamounf = await this.tronRaider2Contract
      ._totalFrozenValue()
      .call();

    //
    let totalamountfrozen =
      messagegetplayerfrozrnamounf.toNumber() * 0.000001 +
      messagedevamount.toNumber() * 0.000001;

    if (divpool == 0) {
      divpool = 50461;
    }
    let estimateDiv = (divpool / totalamountfrozen) * frozentokens;

    return "* " + estimateDiv.toFixed(2).toString();
  },

  //vegas
  //Balance
  async fetchTronVegasBalance() {
    //tronVegas2Contract
    const message = await this.tronVegas2Contract.getCurrentProfit().call();

    const divpool = message.profit.toNumber();

    if (message.negative) {
      return (divpool * 0.000001).toFixed(0) * -1;
    } else {
      var num = (Number(divpool) * 0.000001).toFixed(0).toString();

      return num;
    }
  },
  async fetchTronVegasInvestment(address) {
    const userid = await this.tronVegasContract.userToIndexMap(address).call();
    const user = await this.tronVegasContract
      .getStakeAmountByIndex(userid)
      .call();
    const amountinvested = user.stakeAmount.toNumber();
    return (amountinvested * 0.000001).toFixed(2).toString() + " veg";
  },
  async fetchTronVegasAvailableDividend(address) {
    //(divpool / totalvcoinfrozen) * my balance
    return "0";
    const message = await this.tronVegas2Contract.getCurrentProfit().call();
    if (message.negative) {
      return "0";
    } else {
      const mydivpool = message.profit.toNumber();
      console.log(mydivpool);
      const divpool = await this.tronVegasContract.getTotalStakeVCoin().call();
      console.log(divpool);
      var totaldivpool = divpool.totalAmount.toNumber();
      console.log(totaldivpool);
      const userid = await this.tronVegasContract
        .userToIndexMap(address)
        .call();
      const user = await this.tronVegasContract
        .getStakeAmountByIndex(userid)
        .call();

      const userbalance = user.stakeAmount.toNumber();

      const estimateDiv = (mydivpool / totaldivpool) * userbalance;

      return "* " + (estimateDiv * 0.000001).toFixed(2).toString();
    }

    // return "* " + (estimateDiv * 0.000001).toFixed(2).toString();
  },

  async fetchTronVegasRefferalReward(address) {
    return "--";
  },

  //shrimp
  //Balance
  async fetchTronShrimpBalance() {
    const message = await this.tronWeb.trx.getBalance(
      tronShrimpContract.address
    );
    var stringlength = message.toString().length - 6;
    var realbalance = message.toString().substr(0, stringlength);
    return realbalance;
  },
  async fetchTronShrimpInvestment(address) {
    const message = await this.tronShrimpContract
      .hatcheryShrimp(address)
      .call();

    return message.toNumber().toLocaleString("en") + " srmp";
  },
  async fetchTronShrimpAvailableDividend(address) {
    const myeggcount = await this.tronShrimpContract.getMyEggs().call();
    if (myeggcount && myeggcount > 0) {
      const sellPrive = await this.tronShrimpContract
        .calculateEggSell(myeggcount)
        .call();

      // const devFee = await this.tronShrimpContract.devFee(sellPrive).call();

      var taxfee = sellPrive.toNumber() * 0.2;
      var totaldivs = sellPrive.toNumber() - taxfee;

      //calculateEggSell
      return (totaldivs * 0.000001).toFixed(2).toString();
    } else {
      return "0";
    }
  },

  async fetchTronShrimpRefferalReward(address) {
    return "--";
    const message = await this.tronShrimpContract.myDividends("false").call();
    const message2 = await this.tronShrimpContract.myDividends("true").call();

    const total = message.toNumber() - message2.toNumber();
    return (total * 0.000001).toFixed(2).toString();
  },

  //888
  //Balance
  async fetchEEEBalance() {
    //  console.log("hihi88");
    const response2 = await axios.post(
      "https://888tron.com/api1/getCabinetDividends"
    );

    return (Number(response2.data.data) * 0.000001).toFixed(0);
  },
  async fetchEEEInvestment(address) {
    const message = await this.eeedivdataContract
      .getPlayerToFrozenAmount(address)
      .call();
    return (message.toNumber() * 0.000001).toFixed(2).toString() + " 888";
  },
  async fetchTronBetDivPool() {
    axios
      .get(
        "https://gettrondashdata.azurewebsites.net/api/GetData?code=a0nvjjON1F6XSr/TluuuL3S8uMbMFa0PN2gFIkjuop6GsiFK6yRndA=="
      )
      .then((response) => {
        //    console.log(response.data.TronBetDivPool);
        // create an array of contacts only with relevant data

        // store the new state object in the component's state

        return response.data.TronBetDivPool;
      })
      .catch((error) => console.log(error));
  },
  async fetchEEEAvailableDividend(address) {
    const mydivs = await this.eeedivdControllerContract
      .myBalanceToWithdraw()
      .call();

    //check for collectable divs
    var divs = mydivs.toNumber() * 0.000001;
    //

    if (divs == 0) {
      //calc estimated amount
      const currentlevel = await this.eeedivdataContract.getLastLevel().call();
      const levelinfo = await this.eeedivdataContract
        .getLevelInfo(currentlevel.toNumber())
        .call();
      //get current div pool
      var currentdivpool = levelinfo.dividends.toNumber() * 0.000001;

      const response2 = await axios.post(
        "https://888tron.com/api1/getCabinetDividends"
      );

      var currentdivpool = (Number(response2.data.data) * 0.000001).toFixed(0);

      // /getLevelToFrozenSum
      //my 888 tokens
      const myeee = await this.eeedivdataContract
        .getPlayerToFrozenAmount(address)
        .call();
      var currenteeeusertokens = myeee.toNumber() * 0.000001;
      //total frozen 888 tokens

      var totalfrozen = await this.eeedivdataContract
        .getLevelToFrozenSum(currentlevel.toNumber())
        .call();

      var totalfrozen = totalfrozen.toNumber() * 0.000001;

      var estimateddivs = (currentdivpool / totalfrozen) * currenteeeusertokens;

      return "* " + estimateddivs.toFixed(2).toString();
    } else {
      return divs.toFixed(2).toString();
    }
  },

  async fetchEEERefferalReward(address) {
    return "--";
    const message = await this.eeedivdataContract.myDividends("false").call();
    const message2 = await this.eeedivdataContract.myDividends("true").call();

    const total = message.toNumber() - message2.toNumber();
    return (total * 0.000001).toFixed(2).toString();
  },
  //p3t roi
  async fetchP3TROIContractBalance(trxweb) {
    const message = await this.tronWeb.trx.getBalance(
      p3TDailyROIContract.address
    );
    var stringlength = message.toString().length - 6;
    var realbalance = message.toString().substr(0, stringlength);
    return realbalance;
  },

  // p3t rot

  //not check
  async fetchP3TROIInvestment(address) {
    const message = await this.p3TDailyROIContract
      .checkInvestments(address)
      .call();
    return (message.toNumber() * 0.000001).toFixed(2).toString();
  },
  async fetchP3TROIAvailableDividend(address) {
    const message = await this.p3TDailyROIContract.getDividens(address).call();
    return (message.toNumber() * 0.000001).toFixed(2).toString();
  },

  async fetchP3TROIRefferalReward(address) {
    const message = await this.p3TDailyROIContract
      .checkReferral(address)
      .call();
    return (message.toNumber() * 0.000001).toFixed(2).toString();
  },

  async p3Troireinvest(address, percentage, refferal) {
    var mydivs = await this.p3TDailyROIContract.getDividens(address).call();

    var reinvestamount = mydivs.toNumber();
    reinvestamount = reinvestamount * 0.000001;
    var reinvestpercentage = percentage;
    var newreinvestamount = reinvestamount * reinvestpercentage;
    newreinvestamount = newreinvestamount * 1000000;

    if (!refferal) {
      refferal = this.refferaladdress;
    }

    //withdrawl balance
    this.p3TDailyROIContract.withdraw().send({ feeLimit: 100000000 });
    // reinvest here
    await this.p3TDailyROIContract.buy(refferal).send({
      callValue: newreinvestamount.toFixed(0),
    });

    return;
  },
  //pays token
  //Balance
  async fetchTronPaysTokenBalance() {
    const message = await this.tronWeb.trx.getBalance(
      tronPaysTokenContract.address
    );
    var stringlength = message.toString().length - 6;
    var realbalance = message.toString().substr(0, stringlength);
    return realbalance;
  },

  //not check
  async fetchTronPaysTokenInvestment(address) {
    const message = await this.tronPaysTokenContract.balanceOf(address).call();

    return (message * 0.000000000000000001).toFixed(2).toString() + " pays";
  },
  async fetchTronPaysTokenAvailableDividend(address) {
    const message = await this.tronPaysTokenContract
      .myDividends("false")
      .call();
    return (message.toNumber() * 0.000001).toFixed(2).toString();
  },

  async fetchTronPaysTokenRefferalReward(address) {
    const message = await this.tronPaysTokenContract
      .myDividends("false")
      .call();
    const message2 = await this.tronPaysTokenContract
      .myDividends("true")
      .call();

    const total = message.toNumber() - message2.toNumber();
    return (total * 0.000001).toFixed(2).toString();
  },
  async tronpaystokenreinvest(address, percentage, refferal) {
    const message = await this.tronPaysTokenContract
      .myDividends("false")
      .call();

    var reinvestamount = message.toNumber();
    reinvestamount = reinvestamount * 0.000001;
    var reinvestpercentage = percentage;
    var newreinvestamount = reinvestamount * reinvestpercentage;
    newreinvestamount = newreinvestamount * 1000000;

    if (!refferal) {
      refferal = this.refferaladdress;
    }

    //withdrawl balance
    await this.tronPaysTokenContract.withdraw().send({ feeLimit: 100000000 });

    // reinvest here
    await this.tronPaysTokenContract.buy(refferal).send({
      //callValue: Number(newreinvestamount)
      callValue: newreinvestamount.toFixed(0),
    });
  },
  //twinkenare token
  async fetchTewkenaireContractTokenBalance() {
    const message = await this.tronWeb.trx.getBalance(
      tewkenaireContract.address
    );

    return (message * 0.000001).toFixed(0).toLocaleString("en");
  },
  async fetchTewkenaireTokenInvestment(address) {
    const message = await this.tewkenaireContract.balanceOf(address).call();

    return (message * 0.000000000000000001).toFixed(2).toString() + " tewken";
  },
  async fetchTewkenaireTokenAvailableDividend(address) {
    const message = await this.tewkenaireContract.dividendsOf(address).call();
    return (message.toNumber() * 0.000001).toFixed(2).toString();
  },
  async fetchTewkenaireTokenRefferalReward(address) {
    const message = await this.tewkenaireContract.myDividends("false").call();
    const message2 = await this.tewkenaireContract.myDividends("true").call();

    const total = message.toNumber() - message2.toNumber();

    return (total * 0.000001).toFixed(2).toString();
  },
  async fetchTewkenaireTokenBuyPrice() {
    const message = await this.tewkenaireContract.buyPrice().call();
    return (message.toNumber() * 0.000001).toFixed(2).toString();
  },
  async fetchTewkenaireTokenSellPrice() {
    const message = await this.tewkenaireContract.sellPrice().call();
    return (message.toNumber() * 0.000001).toFixed(2).toString();
  },
  async tewkenaireTokenwithdrawl() {
    this.tewkenaireContract.withdraw().send({
      feeLimit: 100000000,
    });
    return;
  },
  async tewkenaireTokenReinvest() {
    this.tewkenaireContract.reinvest().send({
      feeLimit: 100000000,
    });
    return;
  },

  async tewkenaireTokenBuy(trxamount) {
    let refferal = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    let calculatedamount = trxamount * 1000000;
    this.tewkenaireContract.buy(refferal).send({
      callValue: calculatedamount.toFixed(0),
      feeLimit: 100000000,
    });
    return;
  },
  async tewkenaireTokenSell(trxamount) {
    let fixedamount = trxamount * 1000000;
    let finalnum = fixedamount.toString() + "000000000000";

    this.tewkenaireContract.sell(finalnum).send({
      feeLimit: 100000000,
    });

    return;
  },
  //twinkenare stable token
  async fetchTewkenaireStableContractTokenBalance() {
    const message = await this.tronWeb.trx.getBalance(
      tewkenaireStableContract.address
    );

    return (message * 0.000001).toFixed(0).toLocaleString("en");
  },
  async fetchTewkenaireStableTokenInvestment(address) {
    const message = await this.tewkenaireStableContract
      .balanceOf(address)
      .call();

    return (message * 0.000001).toFixed(2).toString() + " trx";
  },
  async fetchTewkenaireStableTokenAvailableDividend(address) {
    const message = await this.tewkenaireStableContract
      .dividendsOf(address)
      .call();
    return (message.toNumber() * 0.000001).toFixed(2).toString();
  },
  async fetchTewkenaireStableTokenRefferalReward(address) {
    const message = await this.tewkenaireStableContract
      .myDividends("false")
      .call();
    const message2 = await this.tewkenaireStableContract
      .myDividends("true")
      .call();

    const total = message.toNumber() - message2.toNumber();

    return (total * 0.000001).toFixed(2).toString();
  },
  async fetchTewkenaireStableTokenBuyPrice() {
    const message = await this.tewkenaireStableContract.buyPrice().call();
    return (message.toNumber() * 0.000001).toFixed(2).toString();
  },
  async fetchTewkenaireStableTokenSellPrice() {
    const message = await this.tewkenaireStableContract.sellPrice().call();
    return (message.toNumber() * 0.000001).toFixed(2).toString();
  },
  async tewkenaireStableTokenwithdrawl() {
    this.tewkenaireStableContract.withdraw().send({
      feeLimit: 100000000,
    });
    return;
  },
  async tewkenaireStableTokenReinvest() {
    this.tewkenaireStableContract.reinvest().send({
      feeLimit: 100000000,
    });
    return;
  },

  async tewkenaireStableTokenBuy(trxamount) {
    let refferal = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    let calculatedamount = trxamount * 1000000;
    this.tewkenaireStableContract.buy(refferal).send({
      callValue: calculatedamount.toFixed(0),
      feeLimit: 100000000,
    });
    return;
  },
  async tewkenaireStableTokenSell(trxamount) {
    let fixedamount = trxamount * 1000000;
    let finalnum = fixedamount.toString() + "000000000000";

    this.tewkenaireStableContract.sell(finalnum).send({
      feeLimit: 100000000,
    });

    return;
  },
  //p3t token
  //Balance
  async fetchP3TTokenBalance() {
    const message = await this.tronWeb.trx.getBalance(p3TTokenContract.address);

    var stringlength = message.toString().length - 6;
    var realbalance = message.toString().substr(0, stringlength);
    return realbalance;
  },
  async fetchP3TTokenInvestment(address) {
    const message = await this.p3TTokenContract.balanceOf(address).call();

    return (message * 0.000000000000000001).toFixed(2).toString() + " p3t";
  },
  async fetchP3TTokenAvailableDividend(address) {
    const message = await this.p3TTokenContract.dividendsOf(address).call();
    return (message.toNumber() * 0.000001).toFixed(2).toString();
  },

  async fetchP3TTokenRefferalReward(address) {
    const message = await this.p3TTokenContract.myDividends("false").call();
    const message2 = await this.p3TTokenContract.myDividends("true").call();

    const total = message.toNumber() - message2.toNumber();

    return (total * 0.000001).toFixed(2).toString();
  },
  async p3TTokenreinvest(address, percentage, refferal) {
    var message = await this.p3TTokenContract.dividendsOf(address).call();

    var reinvestamount = message.toNumber();
    reinvestamount = reinvestamount * 0.000001;
    var reinvestpercentage = percentage;
    var newreinvestamount = reinvestamount * reinvestpercentage;
    newreinvestamount = newreinvestamount * 1000000;

    if (!refferal) {
      refferal = this.refferaladdress;
    }

    //withdrawl balance
    await this.p3TTokenContract.withdraw().send({
      feeLimit: 100000000,
    });

    // reinvest here
    await this.p3TTokenContract.buy(refferal).send({
      callValue: newreinvestamount.toFixed(0),
    });

    // return;
  },
  //double token
  //Balance
  async fetchD3TTokenBalance() {
    const message = await this.tronWeb.trx.getBalance(d3TTokenContract.address);
    var stringlength = message.toString().length - 6;
    var realbalance = message.toString().substr(0, stringlength);
    return realbalance;
  },
  async fetchD3TTokenInvestment(address) {
    const message = await this.d3TTokenContract.balanceOf(address).call();

    return (message * 0.000000000000000001).toFixed(2).toString() + " p3t";
  },
  async fetchD3TTokenAvailableDividend(address) {
    const message = await this.d3TTokenContract.dividendsOf(address).call();
    return (message.toNumber() * 0.000001).toFixed(2).toString();
  },

  async fetchD3TTokenRefferalReward(address) {
    const message = await this.d3TTokenContract.myDividends("false").call();
    const message2 = await this.d3TTokenContract.myDividends("true").call();

    const total = message.toNumber() - message2.toNumber();

    return (total * 0.000001).toFixed(2).toString();
  },
  async d3Ttokenreinvest(percentage, refferal) {
    const message = await this.d3TTokenContract.myDividends("false").call();

    var reinvestamount = message.toNumber();
    reinvestamount = reinvestamount * 0.000001;
    var reinvestpercentage = percentage;
    var newreinvestamount = reinvestamount * reinvestpercentage;
    newreinvestamount = newreinvestamount * 1000000;

    if (!refferal) {
      refferal = this.refferaladdress;
    }

    //withdrawl balance
    await this.d3TTokenContract.withdraw().send({ feeLimit: 100000000 });

    // reinvest here
    await this.d3TTokenContract.buy(refferal).send({
      callValue: newreinvestamount.toFixed(0),
    });

    return;
  },

  //fetch bankroll

  //check

  async fetchBankRollROIContractBalance() {
    const message = await this.tronWeb.trx.getBalance(
      bankRollDailyROIContract.address
    );
    var stringlength = message.toString().length - 6;
    var realbalance = message.toString().substr(0, stringlength);
    return realbalance;
  }, //not check
  async fetchBankRollROIContractBalance2() {
    const message = await this.bankRollDailyROIContract.gstats().call();
    let foundnum = message[2].toNumber();
    return (foundnum * 0.000001).toFixed(0).toLocaleString("en");
  },
  async fetchBankRollROIInvestment(address) {
    const message = await this.bankRollDailyROIContract.statsOf(address).call();

    return Number((message[0].toNumber() * 0.000001).toFixed(2)).toLocaleString(
      "en"
    );
  },
  async fetchBankRollROIAvailableDividend(address) {
    const message = await this.bankRollDailyROIContract
      .myDividends(false)
      .call();
    return (message.toNumber() * 0.000001).toFixed(2).toString();
  },
  async fetchBankRollROIAvailableDividendNumber(address) {
    const message = await this.bankRollDailyROIContract
      .myDividends(false)
      .call();
    return (message.toNumber() * 0.000001).toFixed(2).toString();
  },

  async fetchBankRollROIRefferalReward() {
    const message = await this.bankRollDailyROIContract.myReferrals().call();
    return (message.toNumber() * 0.000001).toFixed(2).toString();
  },
  async bankrollwithdrawl() {
    this.bankRollDailyROIContract.claim().send({ feeLimit: 100000000 });
    return;
  },
  async bankrollreinvest(address, percentage, refferal) {
    const message = await this.bankRollDailyROIContract
      .checkAvailableBalance()
      .call();

    var reinvestamount = message.toNumber();
    reinvestamount = reinvestamount * 0.000001;
    var reinvestpercentage = percentage;
    var newreinvestamount = reinvestamount * reinvestpercentage;
    newreinvestamount = newreinvestamount * 1000000;

    if (!refferal) {
      refferal = this.refferaladdress;
    }
    await this.bankRollDailyROIContract.withdraw().send({ feeLimit: 100000000 });
    // reinvest here
    await this.bankRollDailyROIContract.buy(refferal).send({
      callValue: newreinvestamount.toFixed(0),
    });

    //  return;
  },

  async shrimpreinvest(percentage, refferal) {
    if (!refferal) {
      refferal = this.refferaladdress;
    }
    await this.tronShrimpContract
      .hatchEggs(refferal)
      .send({ feeLimit: 100000000 });
    // reinvest here

    return;
  },
  async p3troiwithdrawl() {
    this.p3TDailyROIContract.withdraw().send({ feeLimit: 100000000 });
    return;
  },
  async p3ttokenwithdrawl() {
    this.p3TTokenContract.withdraw().send({ feeLimit: 100000000 });
    return;
  },
  async doubleroiwithdrawl() {
    this.tronDoubleDailyROIContract.withdraw().send({ feeLimit: 100000000 });
    return;
  },
  async doubleTokenwithdrawl() {
    this.d3TTokenContract.withdraw().send({ feeLimit: 100000000 });
    return;
  },

  async paystokenwithdrawl() {
    this.tronPaysTokenContract.withdraw().send({ feeLimit: 100000000 });
    return;
  },
  async doowithdrawl() {
    // console.log(address);
    this.dooTronToken
      .withdrawDividends("0x0000000000000000000000000000000000000000")
      .send({ feeLimit: 100000000 });
    return;
  },
  async shrimpwithdrawl() {
    // console.log(address);
    this.tronShrimpContract.sellEggs().send({ feeLimit: 100000000 });
    return;
  },
  async eeewithdrawl() {
    this.eeedivdControllerContract
      .withdrawDividends()
      .send({ feeLimit: 100000000 });
    // this.eeedivdControllerContract.unfreezeTokens().send({ feeLimit: 100000000 });
    //this.eeedivdControllerContract().send({ feeLimit: 100000000 });
    return;
  },
  //fetch tronpays
  async paysroiwithdrawl(address) {
    this.tronPaysDailyROIContract
      .withdraw(address)
      .send({ feeLimit: 100000000 });
    return;
  },

  async paysroireinvest(address, percentage, refferal) {
    const mydivs = await this.tronPaysDailyROIContract.checkBalance().call();

    var reinvestamount = mydivs.toNumber();
    reinvestamount = reinvestamount * 0.000001;
    var reinvestpercentage = percentage;
    var newreinvestamount = reinvestamount * reinvestpercentage;
    newreinvestamount = newreinvestamount * 1000000;

    if (!refferal) {
      refferal = this.refferaladdress;
    }

    //withdrawl balance
    this.tronPaysDailyROIContract
      .withdraw(address)
      .send({ feeLimit: 100000000 });
    // reinvest here
    await this.tronPaysDailyROIContract
      .buy(address, this.refferaladdress)
      .send({
        callValue: newreinvestamount.toFixed(0),
      });

    return;
  },
  //check

  async fetchSafeMathROIUSersDonated() {
    const message = await this.safemathroicontract.totaldonated().call();
    return (message.toNumber() * 0.000001).toFixed(0).toString();
  },
  async fetchSafeMathROITotalDeposited() {
    const message = await this.safemathroicontract.totaldeposited().call();
    return (message.toNumber() * 0.000001).toFixed(0).toString();
  },
  async fetchSafeMathROITotalWithdrawn() {
    const message = await this.safemathroicontract.totalwithdrawn().call();
    return (message.toNumber() * 0.000001).toFixed(0).toString();
  },

  async fetchSafeMathROIUSers() {
    const message = await this.safemathroicontract.users().call();
    return message.toNumber().toLocaleString("en");
  },
  async fetchSafeMathROIWhaleStatus() {
    const message = await this.safemathroicontract.getWhaleStatus().call();
    return (message.toNumber() * 0.000001).toFixed(2).toString();
  },
  async fetchSafeMathROItransactions() {
    const message = await this.safemathroicontract.transactionCount().call();
    return message.toNumber().toLocaleString("en");
  },
  async mathroiwithdrawl(address) {
    this.safemathroicontract.withdraw(address).send({
      feeLimit: 100000000,
      originEnergyLimit: 30000, // Set origin energy limit
      shouldPollResponse: false,
    });
    return;
  },
  async mathroireinvest(address, refferal) {
    if (!refferal) {
      refferal = "0x0000000000000000000000000000000000000000";
    }
    this.safemathroicontract
      .reinvest(address, refferal)
      .send({ feeLimit: 100000000 });
    return;
  },

  async mathroifund(address, amount, refferal) {
    if (!refferal) {
      refferal = "0x0000000000000000000000000000000000000000";
    }

    var fundamount = amount * 1000000;
    await this.safemathroicontract.buy(address, refferal).send({
      callValue: fundamount.toFixed(0),
    });

    return;
  },
  async fetchSafeMathROIContractBalance() {
    const message = await this.tronWeb.trx.getBalance(
      this.safemathroicontract.address
    );

    var stringlength = message.toString().length - 6;
    var realbalance = message.toString().substr(0, stringlength);
    return realbalance;
  }, //not check
  async fetchSafeMathROIInvestment(address) {
    const message = await this.safemathroicontract
      .checkdeposits(address)
      .call();

    return (message.toNumber() * 0.000001).toFixed(2).toLocaleString("en");
  },
  async fetchSafeMathROIAvailableDividend(address) {
    const message = await this.safemathroicontract.getBalance(address).call();
    return (message.toNumber() * 0.000001).toFixed(2).toLocaleString("en");
  },

  async fetchSafeMathROIRefferalReward(address) {
    const message = await this.safemathroicontract
      .checkReferral(address)
      .call();
    return (message.toNumber() * 0.000001).toFixed(2).toLocaleString("en");
  },

  async fetchTronPaysROIContractBalance() {
    const message = await this.tronWeb.trx.getBalance(
      tronPaysDailyROIContract.address
    );

    var stringlength = message.toString().length - 6;
    var realbalance = message.toString().substr(0, stringlength);
    return realbalance;
  }, //not check

  async fetchTronWowContractBalance() {
    const message = await this.tronWeb.trx.getBalance(
      "TZ7y9zuk1LMfp4JLFPrs1EcqXuqZukmBYG"
    );

    var stringlength = message.toString().length - 6;
    var realbalance = message.toString().substr(0, stringlength);

    return realbalance;
  }, //not check

  //TZ7y9zuk1LMfp4JLFPrs1EcqXuqZukmBYG
  async fetchTronPaysROIInvestment(address) {
    const message = await this.tronPaysDailyROIContract
      .checkdeposits(address)
      .call();
    return (message.toNumber() * 0.000001).toFixed(2).toString();
  },
  async fetchTronPaysROIAvailableDividend(address) {
    const message = await this.tronPaysDailyROIContract.checkBalance().call();
    return (message.toNumber() * 0.000001).toFixed(2).toString();
  },

  async fetchTronPaysROIRefferalReward(address) {
    const message = await this.tronPaysDailyROIContract
      .checkReferral(address)
      .call();
    return (message.toNumber() * 0.000001).toFixed(2).toString();
  },

  //fetch tronDouble

  //check
  async fetchTronDoubleROIContractBalance() {
    const message = await this.tronWeb.trx.getBalance(
      tronDoubleDailyROIContract.address
    );
    var stringlength = message.toString().length - 6;
    var realbalance = message.toString().substr(0, stringlength);
    return realbalance;
  }, //not check
  async fetchTronDoubleROIInvestment(address) {
    const userid = await this.tronDoubleDailyROIContract
      .GetIdByAddr(address)
      .call();

    const message = await this.tronDoubleDailyROIContract
      .GetPlanByUid(userid)
      .call();

    var total = 0;
    message[2].forEach(function(element) {
      total = total + element.toNumber();
    });

    return (total * 0.000001).toFixed(2).toString();
  },
  async fetchTronDoubleROIAvailableDividend(address) {
    //this is wrong
    const userid = await this.tronDoubleDailyROIContract
      .GetIdByAddr(address)
      .call();

    const message = await this.tronDoubleDailyROIContract
      .GetPlanByUid(userid)
      .call();

    var total = 0;

    message[3].forEach(function(element) {
      total = total + element.toNumber();
    });

    return (total * 0.00000000001).toFixed(2).toString();
  },

  async fetchTronDoubleROIRefferalReward(address) {
    return "--";
    const message = await this.tronDoubleDailyROIContract
      .checkReferral(address)
      .call();
    return 0;
    return message.toNumber();
  },
  async tronDoubleROIreinvest(address) {
    //need to do this one later
    return;
    var mydivstring = await this.fetchTronDoubleROIAvailableDividend(address);
    var mydivs = mydivstring.replace(" trx", "");

    var mydivnumber = mydivs * 1000000;
    //withdrawl balance
    this.tronDoubleDailyROIContract.withdraw().send({ feeLimit: 100000000 });
    // reinvest here
    await this.tronDoubleDailyROIContract.buy(this.refferaladdress).send({
      callValue: mydivs,
    });
  },
  //doo tron
  //

  //fetch doo tron

  //check
  async fetchDooTronROIContractBalance() {
    const balance = await this.dooTronToken
      .availableBalance("0x0000000000000000000000000000000000000000")
      .call();

    const principal = 97000000000;

    var balanceconvert = parseInt(balance._hex, 16);

    var toaldiv = (balanceconvert - principal) * 0.000001;
    toaldiv = toaldiv - 100;
    return toaldiv.toFixed(0);
  },
  async fetchDooTronROIInvestment(address) {
    const message = await this.dooTronToken.frozenBalances(address).call();
    return (
      Number((message.toNumber() * 0.000001).toFixed(2)).toLocaleString("en") +
      " doo"
    );
  },

  async fetchDooTronROIAvailableDividend(address) {
    const message = await this.dooTronToken
      .dividendOf("0x0000000000000000000000000000000000000000", address)
      .call();

    //check if you have any dodo waiting
    if (message.toNumber() <= 0) {
      //we have no tron lets take a guess on how much well make

      //get your balance
      const doodoobalance = await this.dooTronToken
        .frozenBalances(address)
        .call();

      //get div pool
      var divpool = await this.fetchDooTronROIContractBalance();

      //get total frozen

      var totafrozen = await this.dooTronToken.totalFrozenBalances().call();

      var total =
        ((divpool * 100000) / totafrozen.toNumber()) * doodoobalance.toNumber();

      return "* " + (total * 0.00001).toFixed(2).toString();
    } else {
      return (message.toNumber() * 0.000001).toFixed(2).toString();
    }
  },

  async fetchDooTronROIRefferalReward(address) {
    //dont think u can get this easily
    return "--";
  },

  //tron bet
  //check
  async fetchTronBetAnteStakerContractBalance() {
    //retrn div pool
    //20000000000000
    //og 20000000000000

    const getPoolAnteBalance = await this.tronBetAnteStakerContract2
      .getPoolAnteBalance()
      .call();

    var contractbalance = await this.tronWeb.trx.getBalance(
      "TD31SKej4iFWZ7NvWVC9DapJNZA3ofaKbB"
    );

    var percentage = 0.94;

    const stk = await this.tronBetAnteStakerContract.getTotalStakeAnte().call();

    var poolanbal = getPoolAnteBalance.toNumber();
    var ogamount = 20000000000000;
    var conbal = contractbalance;

    var total = (poolanbal - ogamount) * percentage - conbal;

    return (total * 0.000001).toFixed(2);
  },
  async fetchTronBetAnteStakerInvestment(address) {
    // return total ante balance

    const message = await this.tronBetAnteStakerContract
      .getStakeInfoByAddress(address)
      .call();

    var myante = message.anteAmount.toNumber();
    var myantestring = (myante * 0.000001).toFixed(2).toLocaleString("en");

    return myantestring + " dice";
  },
  async fetchTronBetAnteStakerAvailableDividend(address, divpool) {
    if (!divpool) {
      return "--";
    }

    var poolbal = divpool.replace(",", "").replace(" TRX", "");
    //get pool
    poolbal = poolbal.replace(",", "");

    //get steaked
    const getsteaked = await this.dicecontract.getTotalStakeDice().call();

    const getmysteaked = await this.tronBetAnteStakerContract
      .getStakeInfoByAddress(address)
      .call();

    var num2 = getsteaked.totalAmount.toNumber();
    var num3 = getmysteaked.anteAmount.toNumber();

    var total = ((poolbal * 100000) / num2) * num3;
    if (total < 0) {
      return "0";
    } else {
    }

    return "* " + (total * 0.00001).toFixed(2).toString();
  },

  async fetchTronBetAnteStakerRefferalReward(address) {
    //nog availabvle now
    return "--";
  },
  async fetchtokentotalbalance(tokenaddress) {
    //nog availabvle now
    this.erc20contract.address = tokenaddress;
    let getbalance = await this.erc20contract.totalSupply().call();

    getbalance = getbalance * 0.000000000000000001;
    return getbalance.toFixed(0).toLocaleString("en");
  },
  async fetchuserbalance(tokenaddress, useraddress) {
    //nog availabvle now
    this.erc20contract.address = tokenaddress;
    let getbalance = await this.erc20contract.balanceOf(useraddress).call();

    getbalance = getbalance * 0.000000000000000001;
    return getbalance.toFixed(2).toLocaleString("en");
  },
  async fetchbnkrtokentotalbalance() {
    //nog availabvle now
    // erc20contractbnkr

    let getbalance = await this.erc20contractbnkr.totalSupply().call();

    getbalance = getbalance.toNumber() * 0.000001;
    return getbalance.toFixed(0).toLocaleString("en");
  },
  async fetchdashtokentotalbalance() {
    //nog availabvle now
    // erc20contractbnkr

    let getbalance = await this.erc20contractdash.totalSupply().call();

    getbalance = getbalance.toNumber() * 0.000001;
    return getbalance.toFixed(0).toLocaleString("en");
  },
  async fetchdashusertokentotalbalance(useraddress) {
    //nog availabvle now
    // erc20contractbnkr

    let getbalance = await this.erc20contractdash.balanceOf(useraddress).call();

    getbalance = getbalance.toNumber() * 0.000001;
    return getbalance.toFixed(2).toLocaleString("en");
  },
  async fetchbnkrusertokentotalbalance(useraddress) {
    //nog availabvle now
    // erc20contractbnkr

    let getbalance = await this.erc20contractbnkr.balanceOf(useraddress).call();

    getbalance = getbalance.toNumber() * 0.000001;
    return getbalance.toFixed(2).toLocaleString("en");
  },
  async fetchtotalfragstaked() {
    //nog availabvle now
    // erc20contractbnkr

    let getbalance = await this.fragcontract.balance().call();
    let stringlength = getbalance.toString().length;
    let retutnvalue = getbalance.toString().substring(0, stringlength - 5);
    let returnnumber = Number(retutnvalue) * 0.0000000000001;
    return returnnumber.toFixed(0).toLocaleString("en");
  },
  async fetchuserfragstaked(address) {
    //nog availabvle now
    // erc20contractbnkr

    let getbalance = await this.fragcontract.savingsOf(address).call();
    let stringlength = getbalance.toString().length;
    let retutnvalue = getbalance.toString().substring(0, stringlength - 5);
    let returnnumber = Number(retutnvalue) * 0.0000000000001;
    return returnnumber.toFixed(2).toLocaleString("en");
  },
  async fetchuserdivsfrags(address) {
    //nog availabvle now
    // erc20contractbnkr

    let getbalance = await this.fragcontract.dividendsOf(address).call();
    let stringlength = getbalance.toString().length;
    let retutnvalue = getbalance.toString().substring(0, stringlength - 5);

    let getbalanceref = await this.fragcontract.referralsHeld(address).call();
    let stringlengthref = getbalanceref.toString().length;
    let retutnvalueref = getbalanceref
      .toString()
      .substring(0, stringlengthref - 5);

    let returnnumber =
      (Number(retutnvalue) + Number(retutnvalueref)) * 0.0000000000001;
    //let returnnumber = Number(retutnvalueref) * 0.0000000000001;
    return returnnumber.toFixed(2).toLocaleString("en");
  },
  async fetchtotalvoidstaked() {
    //nog availabvle now
    // erc20contractbnkr

    let getbalance = await this.voidcontract.totalStaked().call();

    let stringlength = getbalance.toString().length;
    let retutnvalue = getbalance.toString().substring(0, stringlength - 5);
    let returnnumber = Number(retutnvalue) * 0.0000000000001;
    return returnnumber.toFixed(0).toLocaleString("en");
  },
  async fetchuservoidstaked(address) {
    //nog availabvle now
    // erc20contractbnkr

    let getbalance = await this.voidcontract.userStake(address).call();
    let stringlength = getbalance.toString().length;
    let retutnvalue = getbalance.toString().substring(0, stringlength - 5);
    let returnnumber = Number(retutnvalue) * 0.0000000000001;
    return returnnumber.toFixed(2).toLocaleString("en");
  },
  async fetchuserdivsvoids(address) {
    //nog availabvle now
    // erc20contractbnkr

    let getbalance = await this.voidcontract.unclaimedReward(address).call();
    let stringlength = getbalance.toString().length;
    let retutnvalue = getbalance.toString().substring(0, stringlength - 5);
    let returnnumber = Number(retutnvalue) * 0.0000000000001;
    return returnnumber.toFixed(2).toLocaleString("en");
  },
  async withdrawlvoiddivs() {
    //nog availabvle now
    // erc20contractbnkr
    const message = await this.voidcontract
      .withdraw()
      .send({ feeLimit: 100000000 });
    return;
  },
  async withdrawlfragdivs() {
    //nog availabvle now
    // erc20contractbnkr
    const message = await this.fragcontract
      .withdraw()
      .send({ feeLimit: 100000000 });
    return;
  },
  async reinvestvoiddivs(address) {
    //nog availabvle now
    // erc20contractbnkr
    const amount = await this.voidcontract.unclaimedReward(address).call();

    const withdrawl = await this.voidcontract
      .withdraw()
      .send({ feeLimit: 100000000 });

    const message = await this.voidcontract
      .withdraw()
      .send({ feeLimit: 100000000 });
    //stake
    return;
  },
  async reinvestfragdivs() {
    //nog availabvle now
    // erc20contractbnkr
    const message = await this.fragcontract
      .depositDivs()
      .send({ feeLimit: 100000000 });
    return;
  },

  //boost
  async fetchtotalbooststaked() {
    let getbalance = await this.boostcontract.totalSupply().call();
    let stringlength = getbalance.toString().length;
    let retutnvalue = getbalance.toString().substring(0, stringlength - 6);
    let returnnumber = Number(retutnvalue);
    return returnnumber.toFixed(0).toLocaleString("en");
  },
  async fetchuserbooststaked(address) {
    //nog availabvle now
    // erc20contractbnkr

    let getbalance = await this.boostcontract.balanceOf(address).call();
    let stringlength = getbalance.toString().length;
    let retutnvalue = getbalance.toString().substring(0, stringlength - 6);
    let returnnumber = Number(retutnvalue);
    return returnnumber.toFixed(2).toLocaleString("en");
  },
  async fetchuserdivsboost(address) {
    //nog availabvle now
    // erc20contractbnkr

    let getbalance1 = await this.boostcontract.myDividends(0).call();
    let returnnumber = getbalance1.toNumber() * 0.000001;
    return returnnumber.toFixed(2).toLocaleString("en");
  },
  async boostwithdrawlDivs() {
    this.boostcontract.withdraw().send({
      feeLimit: 100000000,
    });
    return;
  },
  async boostReinvestDivs() {
    this.boostcontract.reinvest().send({
      feeLimit: 100000000,
    });
    return;
  },
  //BTT Bank
  async fetchtotalbttstaked() {
    let getbalance = await this.bttBankContract.totalBTTBalance().call();
    let stringlength = getbalance.toString().length;
    let retutnvalue = getbalance.toString().substring(0, stringlength - 6);
    let returnnumber = Number(retutnvalue);
    return returnnumber.toFixed(0).toLocaleString("en");
  },
  async fetchuserheldbtt(address) {
    let getbalance = await this.bttBankContract
      .getBTTTokenBalance(address)
      .call();

    let stringlength = getbalance.toString().length;
    let retutnvalue = getbalance.toString().substring(0, stringlength - 6);
    let returnnumber = Number(retutnvalue);
    return returnnumber.toFixed(0).toLocaleString("en");
  },
  async fetchtotalbttsupply() {
    let getbalance = await this.bttBankContract.totalBTTBalance().call();
    let stringlength = getbalance.toString().length;
    let retutnvalue = getbalance.toString().substring(0, stringlength - 6);
    let returnnumber = Number(retutnvalue);
    return returnnumber.toFixed(0).toLocaleString("en");
  },
  async fetchuserbttstaked(address) {
    //nog availabvle now
    // erc20contractbnkr

    let getbalance = await this.bttBankContract.balanceOf(address).call();
    let stringlength = getbalance.toString().length;
    let retutnvalue = getbalance.toString().substring(0, stringlength - 6);
    let returnnumber = Number(retutnvalue);
    return returnnumber.toFixed(2).toLocaleString("en");
  },
  async fetchuserbttrefferals(address) {
    //nog availabvle now
    // erc20contractbnkr

    let getbalance1 = await this.bttBankContract.myDividends(0).call();
    let getbalance2 = await this.bttBankContract.myDividends(1).call();
    let total = getbalance2.toNumber() - getbalance1.toNumber();

    let returnnumber = total * 0.000001;
    return returnnumber.toFixed(2).toLocaleString("en");
  },
  async fetchuserdivsbtt(address) {
    //nog availabvle now
    // erc20contractbnkr

    let getbalance1 = await this.bttBankContract.myDividends(0).call();
    let returnnumber = getbalance1.toNumber() * 0.000001;
    return returnnumber.toFixed(2).toLocaleString("en");
  },
  async fetchuserwalletbtt(address) {
    //nog availabvle now
    // erc20contractbnkr

    let getbalance1 = await this.bttBankContract
      .getBTTTokenBalance(address)
      .call();
    let returnnumber = getbalance1.toNumber() * 0.000001;
    return returnnumber.toFixed(2).toLocaleString("en");
  },

  async bttbankwithdrawlDivs() {
    this.bttBankContract.withdraw().send({
      feeLimit: 100000000,
    });
    return;
  },
  async bttbankReinvestDivs() {
    this.bttBankContract.reinvest().send({
      feeLimit: 100000000,
    });
    return;
  },

  async bttbankDeposit(trxamount, userrefferal, useraddress) {
    let refferal = "0x0000000000000000000000000000000000000000";
    if (userrefferal != "") {
      refferal = userrefferal;
    }
    let calculatedamount = trxamount * 1000000;
    console.log(calculatedamount);
    //check if the user has enough
    let getuserbalance = await this.bttBankContract
      .getBTTTokenBalance(useraddress)
      .call();

    if (calculatedamount > getuserbalance) {
      //if they dont have enough send their balance
      calculatedamount = getuserbalance;
    }

    this.bttBankContract
      .buy(refferal)
      .send({
        tokenId: 1002000,
        tokenValue: calculatedamount,
        feeLimit: 100000000,
      })
      .then((response) => {
        return "d";
      })
      .catch((error) => console.log(error));
  },
  async bttbankwithdrawl(trxamount) {
    let fixedamount = trxamount * 1000000;
    let finalnum = fixedamount.toString();

    this.bttBankContract.sell(finalnum).send({
      feeLimit: 100000000,
    });

    return;
  },

  //TRX Bank
  async fetchtotaltrxstaked() {
    let getbalance = await this.trxBankContract.totalTronBalance().call();
    let stringlength = getbalance.toString().length;
    let retutnvalue = getbalance.toString().substring(0, stringlength - 6);
    let returnnumber = Number(retutnvalue);
    return returnnumber.toFixed(0).toLocaleString("en");
  },
  async fetchuserheldtrx(address) {
    let getbalance = await this.bttBankContract
      .getBTTTokenBalance(address)
      .call();
    console.log(getbalance.toNumber());
    let stringlength = getbalance.toString().length;
    let retutnvalue = getbalance.toString().substring(0, stringlength - 6);
    let returnnumber = Number(retutnvalue);
    return returnnumber.toFixed(0).toLocaleString("en");
  },
  async fetchtotaltrxsupply() {
    let getbalance = await this.trxBankContract.totalTronBalance().call();
    let stringlength = getbalance.toString().length;
    let retutnvalue = getbalance.toString().substring(0, stringlength - 6);
    let returnnumber = Number(retutnvalue);
    return returnnumber.toFixed(0).toLocaleString("en");
  },
  async fetchusertrxstaked(address) {
    //nog availabvle now
    // erc20contractbnkr

    let getbalance = await this.trxBankContract.balanceOf(address).call();
    let stringlength = getbalance.toString().length;
    let retutnvalue = getbalance.toString().substring(0, stringlength - 6);
    let returnnumber = Number(retutnvalue);
    return returnnumber.toFixed(2).toLocaleString("en");
  },
  async fetchusertrxrefferals(address) {
    //nog availabvle now
    // erc20contractbnkr

    let getbalance1 = await this.trxBankContract.myDividends(0).call();
    let getbalance2 = await this.trxBankContract.myDividends(1).call();
    let total = getbalance2.toNumber() - getbalance1.toNumber();

    let returnnumber = total * 0.000001;
    return returnnumber.toFixed(2).toLocaleString("en");
  },
  async fetchuserdivstrx(address) {
    //nog availabvle now
    // erc20contractbnkr

    let getbalance1 = await this.trxBankContract.myDividends(0).call();
    let returnnumber = getbalance1.toNumber() * 0.000001;
    return returnnumber.toFixed(2).toLocaleString("en");
  },
  async fetchuserwallettrx(address) {
    //nog availabvle now
    // erc20contractbnkr

    let getbalance1 = await this.bttBankContract
      .getBTTTokenBalance(address)
      .call();
    let returnnumber = getbalance1.toNumber() * 0.000001;
    return returnnumber.toFixed(2).toLocaleString("en");
  },

  async trxbankwithdrawlDivs() {
    this.trxBankContract.withdraw().send({
      feeLimit: 100000000,
    });
    return;
  },
  async trxbankReinvestDivs() {
    this.trxBankContract.reinvest().send({
      feeLimit: 100000000,
    });
    return;
  },

  async trxbankDeposit(trxamount, userrefferal, useraddress) {
    let refferal = "0x0000000000000000000000000000000000000000";
    if (userrefferal != "") {
      refferal = userrefferal;
    }
    let calculatedamount = trxamount * 1000000;
    console.log(calculatedamount);
    //check if the user has enough
    let getuserbalance = await this.tronWeb.trx.getBalance(useraddress);

    if (calculatedamount > getuserbalance) {
      //if they dont have enough send their balance
      calculatedamount = getuserbalance;
    }

    this.trxBankContract
      .buy(refferal)
      .send({
        callValue: calculatedamount,
        feeLimit: 100000000,
      })
      .then((response) => {
        return "d";
      })
      .catch((error) => console.log(error));
  },
  async trxbankwithdrawl(trxamount) {
    let fixedamount = trxamount * 1000000;
    let finalnum = fixedamount.toString();

    this.trxBankContract.sell(finalnum).send({
      feeLimit: 100000000,
    });

    return;
  },

  //Dashbank
  async fetchtotaldashstaked() {
    //nog availabvle now
    // erc20contractbnkr

    let getbalance = await this.dashbankcontract.totalSupply().call();
    let stringlength = getbalance.toString().length;
    let retutnvalue = getbalance.toString().substring(0, stringlength - 5);
    let returnnumber = Number(retutnvalue) * 0.0000000000001;
    return returnnumber.toFixed(0).toLocaleString("en");
  },
  async fetchuserdashstaked(address) {
    //nog availabvle now
    // erc20contractbnkr

    let getbalance = await this.dashbankcontract.balanceOf(address).call();
    let stringlength = getbalance.toString().length;
    let retutnvalue = getbalance.toString().substring(0, stringlength - 5);
    let returnnumber = Number(retutnvalue) * 0.0000000000001;
    return returnnumber.toFixed(2).toLocaleString("en");
  },
  async fetchuserdashrefferals(address) {
    //nog availabvle now
    // erc20contractbnkr

    let getbalance = await this.dashbankcontract.myReferralEarnings().call();
    let stringlength = getbalance.toString().length;
    let retutnvalue = getbalance.toString().substring(0, stringlength - 5);
    let returnnumber = Number(retutnvalue) * 0.0000000000001;
    return returnnumber.toFixed(2).toLocaleString("en");
  },
  async fetchuserdivsdash(address) {
    //nog availabvle now
    // erc20contractbnkr

    let getbalance = await this.dashbankcontract.myDividends("false").call();
    let stringlength = getbalance.toString().length;
    let retutnvalue = getbalance.toString().substring(0, stringlength - 5);
    let returnnumber = Number(retutnvalue) * 0.0000000000001;
    return returnnumber.toFixed(2).toLocaleString("en");
  },
  async reinvestdashdivs() {
    //nog availabvle now
    // erc20contractbnkr
    const message = await this.dashbankcontract
      .reinvest()
      .send({ feeLimit: 100000000 });
    return;
  },
  async withdrawlldashdivs() {
    //nog availabvle now
    // erc20contractbnkr
    const message = await this.dashbankcontract
      .withdraw()
      .send({ feeLimit: 100000000 });
    return;
  },
  async withdrawlldash(amount) {
    //add some 0s to the amount
    let fixedamount = Number(amount) * 1000000;
    let finalnum = fixedamount.toString() + "000000000000";

    const message = await this.dashbankcontract
      .sell(finalnum)
      .send({ feeLimit: 100000000 });
    return;
  },
  async depositdash(amount, useraddress) {
    let fixedamount = Number(amount) * 1000000;

    let depositaddress = "TKQNbgzYT4SrTiv9zCSGebX6iACpPyfrRZ";
    //nog availabvle now
    // erc20contractbnkr
    //make sure htey have enough

    let getbalance = await this.erc20contractdash.balanceOf(useraddress).call();

    getbalance = getbalance.toNumber();
    console.log(getbalance);
    console.log(fixedamount);
    if (fixedamount > getbalance) {
      //if they dont have enough send their balance
      fixedamount = getbalance;
    }

    let deposit = await this.erc20contractdash
      .transfer(depositaddress, fixedamount)
      .send({ feeLimit: 100000000 });

    return;
  },
  async fetchenergytokentotalbalance() {
    //nog availabvle now
    // erc20contractbnkr

    let getbalance = await this.energycontract.totalSupply().call();

    getbalance = getbalance.toNumber() * 0.000001;
    return getbalance.toFixed(0).toLocaleString("en");
  },
  async fetchenergyusertokentotalbalance(useraddress) {
    //nog availabvle now
    // erc20contractbnkr

    let getbalance = await this.energycontract.balanceOf(useraddress).call();

    getbalance = getbalance.balance.toNumber() * 0.000001;

    return getbalance.toFixed(2).toLocaleString("en");
  },
  async fetchWeeklyJackpot() {
    //nog availabvle now
    // erc20contractbnkr

    let getbalance = await this.dashlottocontract
      .getCurrentProgressiveBalance()
      .call();

    getbalance = getbalance.toNumber() * 0.000001;
    getbalance = getbalance / 2;
    return getbalance.toFixed(0).toLocaleString("en");
  },
  async fetchweeklyusers() {
    //nog availabvle now
    // erc20contractbnkr

    let getbalance = await this.dashlottocontract
      .getCurrentProgressiveTicketCount()
      .call();

    getbalance = getbalance.toNumber();
    return getbalance.toFixed(0).toLocaleString("en");
  },
  async fetchDailyJackpot() {
    //nog availabvle now
    // erc20contractbnkr

    return "1,000";
  },
  async fetchdailyusers() {
    //nog availabvle now
    // erc20contractbnkr

    let getbalance = await this.dashlottocontract
      .getCurrentDailyTicketCount()
      .call();

    getbalance = getbalance.toNumber();
    return getbalance.toFixed(0).toLocaleString("en");
  },
  async fetchuserdailywins() {
    //nog availabvle now
    // erc20contractbnkr

    let getbalance = await this.dashlottocontract
      .getUserTotalDailyWins()
      .call();
    getbalance = getbalance.toNumber() * 0.000001;
    // getbalance = getbalance.toNumber();
    return getbalance.toFixed(0).toLocaleString("en");
  },
  async fetchuserprogressivewins() {
    //nog availabvle now
    // erc20contractbnkr

    let getbalance = await this.dashlottocontract
      .getUserTotalProgressiveWins()
      .call();

    getbalance = getbalance.toNumber();
    return getbalance.toFixed(0).toLocaleString("en");
  },
  async buyLottoticket() {
    //nog availabvle now
    // erc20contractbnkr
    let deposit = await this.dashlottocontract.buyTicket().send({
      feeLimit: 100000000,
      callValue: 10000000,
      shouldPollResponse: true,
    });

    return;
  },
  async fetchTronBetWinStakerInvestment(address) {
    // return total ante balance

    const message = await this.tronbetwincontract
      .getStateInfoByAddress(address)
      .call();

    var myante = message.winAmount.toNumber();
    var myantestring = (myante * 0.000001).toFixed(2).toLocaleString("en");

    return myantestring + " win";
  },

  async fetchTronBetWintotalfrozen() {
    //get user frozen
    const message2 = await this.tronbetwincontract.getFreezeWinBalance().call();

    let userfrozen = message2.frozenAmount.toNumber() * 0.000001;

    return userfrozen.toLocaleString("en") + " win";
  },

  async fetchTronBetWinplayerdiv(address, divamount) {
    //get player value
    const message = await this.tronbetwincontract
      .getStateInfoByAddress(address)
      .call();

    var mywin = message.winAmount.toNumber() * 0.000001;

    //get user frozen
    const message2 = await this.tronbetwincontract.getFreezeWinBalance().call();

    let totalfrozen = Number(message2.frozenAmount) * 0.000001;

    //    117,213,953,482,590,300

    divamount = divamount * 0.7;

    let myprofit = (divamount / totalfrozen) * mywin;

    //   var myantestring = (myante * 0.000001).toFixed(2).toLocaleString("en");

    return "* " + myprofit.toLocaleString("en");
  },
  async fetchTronTopiaContractBalance() {
    //trontopiacontract
    const returnval = await this.trontopiadivcontract
      .displayAvailableDividendALL()
      .call();

    // console.log("*********************");
    // console.log(returnval);
    let total = returnval[1].toNumber();
    //  console.log(total);
    return (total * 0.000001).toFixed(0).toString();
  }, //not check
  async fetchTronTopiaInvestment(address) {
    const total = await this.trontopiatokencontract.frozenTopia(address).call();

    return (total * 0.00000001).toFixed(2).toString() + " topia";
  }, //not check
  async fetchTronTopiaRefferal(address) {
    const total = await this.trontopiatokencontract.frozenTopia(address).call();

    return (total * 0.00000001).toFixed(2).toString();
  }, //not check
  async fetchTronTopiaDivs(address) {
    const availabledivs = await this.trontopiadivcontract
      .userConfirmedDividendDivRake(address)
      .call();

    let currentdivs = (availabledivs * 0.000001).toFixed(2);

    if (currentdivs > 0) {
      return currentdivs.toString();
    }

    //okay we have no divs so lets figure out how many we will get

    //get total frozen
    //frozenTopiaGlobal
    let totalfrozen = await this.trontopiatokencontract
      .frozenTopiaGlobal()
      .call();

    let totalfrozenreturn = totalfrozen.toNumber();
    //get my frozen
    let myinvestment = await this.trontopiatokencontract
      .frozenTopia(address)
      .call();

    let myinvestmentreturn = myinvestment.toNumber();
    //get get div pool
    let retdivpool = await this.trontopiadivcontract
      .displayAvailableDividendALL()
      .call();
    let divpool = retdivpool[1].toNumber();

    let totalestimate = (divpool / totalfrozenreturn) * myinvestmentreturn;

    let returnvaluest = (totalestimate * 0.000001).toFixed(2);
    return "* " + returnvaluest.toString();
  },
  async topiawithdrawl() {
    const message = await this.trontopiadivcontract
      .withdrawDividendDivRake()
      .send({ feeLimit: 100000000 });

    return;
  },
  async fetchTronTopiaDiamondContractBalance() {
    //trontopiacontract
    const returnval = await this.trontopiadiamonddivcontract
      .getDividendPotential()
      .call();
    let total = returnval.toNumber();
    return (total * 0.000001).toFixed(0).toString();
  }, //not check
  async fetchTronTopiaDiamondInvestment(address) {
    const total = await this.trontopiadiamondtokencontract
      .usersDiamondFrozen(address)
      .call();

    return (total * 0.000001).toFixed(2).toString() + " dvs";
  }, //not check

  async fetchTronTopiaDiamondDivs(address) {
    const availabledivs = await this.trontopiadiamonddivcontract
      .userConfirmedDividendTRX(address)
      .call();

    let currentdivs = (availabledivs * 0.000001).toFixed(2);

    if (currentdivs > 0) {
      return currentdivs.toString();
    }

    //okay we have no divs so lets figure out how many we will get

    //get total frozen
    //frozenTopiaGlobal
    let totalfrozen = await this.trontopiadiamondtokencontract
      .frozenDiamondsGlobal()
      .call();

    let totalfrozenreturn = totalfrozen.toNumber();
    //get my frozen
    let myinvestment = await this.trontopiadiamondtokencontract
      .usersDiamondFrozen(address)
      .call();

    let myinvestmentreturn = myinvestment.toNumber();
    //get get div pool
    let retdivpool = await this.trontopiadiamonddivcontract
      .getDividendPotential()
      .call();
    let divpool = retdivpool.toNumber();

    let totalestimate = (divpool / totalfrozenreturn) * myinvestmentreturn;

    let returnvaluest = (totalestimate * 0.000001).toFixed(2);
    return "* " + returnvaluest.toString();
  },
  async topiaDiamondwithdrawl() {
    const message = await this.trontopiadiamonddivcontract
      .withdrawDividendsEverything()
      .send({ feeLimit: 100000000 });

    return;
  }, //
  async fetchContractBalance(trxweb) {
    const message = await this.tronWeb.trx.getBalance(trxweb);
    var stringlength = message.toString().length - 6;
    var realbalance = message.toString().substr(0, stringlength);
    return realbalance;
  }, //justgame
  async fetchjustgameuserinvestment(address) {
    const total = await this.justgamecontract.playerMetadataOf(address).call();

    return (
      (total.ticketsOwned.toNumber() * 0.000001).toFixed(0).toString() +
      " boxes"
    );
  },
  async fetchjustgameuserdivs(address) {
    const total = await this.justgamecontract.playerMetadataOf(address).call();

    return "** " + (total.backing.toNumber() * 0.000001).toFixed(2).toString();
  },
  async fetchvoidprice() {
    let contract = await this.tronWeb
      .contract()
      .at("4124521fd5346c772c8501206a3a3c0f916e73a997");

    let currentValue = await contract
      .getTokenToTrxInputPrice("1000000000000000000")
      .call();

    console.log(currentValue);

    return (currentValue.toNumber() * 0.000001).toFixed(2).toString();
  },
};

export default utils;
