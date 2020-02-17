import uuid from 'uuid/v1';
import moment from 'moment';
import mock from 'src/utils/mock';

mock.onGet('/api/management/customers').reply(200, {
  dappData: [
    {
      ID: 'e39ece4e-ac7c-479e-9fc0-49c69a243e0b',
      Name: 'DashBank Dash',
      Website: null,
      MyProperty: null,
      ImageURL: null,
      DappType: { ID: 'ab219c17-dd19-49ba-a51a-ab2a753022fa', Name: 'Bank' },
      ContractAddress: 'TWEiEdjKTGDwgXhsfNu2RuXzUCvdrdrsUU',
      Trc20TokenAddress: null,
      Trc20TokenDecimals: 0,
      DappDecimals: 18,
      TokenType: null,
      PaysOutIn: 'trx',
      Active: true,
      PoloniexDexID: 0,
      DivPool: {
        ID: 'd9153598-be85-4f59-817f-796c799d6af4',
        ContractAddress: 'TWEiEdjKTGDwgXhsfNu2RuXzUCvdrdrsUU',
        ContractFunctionSelector: 'totalSupply()',
        ContractParameter: ''
      },
      Investment: {
        ID: '49db9b5a-7d59-41ee-87f9-667f1aca3052',
        ContractAddress: 'TWEiEdjKTGDwgXhsfNu2RuXzUCvdrdrsUU',
        ContractFunctionSelector: 'balanceOf(address)',
        ContractParameter: 'UserKey'
      },
      Referral: {
        ID: 'b0255afc-bf8e-4409-94bd-757bc9fec233',
        ContractAddress: 'TWEiEdjKTGDwgXhsfNu2RuXzUCvdrdrsUU',
        ContractFunctionSelector: 'dividendsOf(address)',
        ContractParameter: 'true'
      },
      UserDividend: {
        ID: '37d4f602-6e4a-4a16-a875-48b8febc6d0f',
        ContractAddress: 'TWEiEdjKTGDwgXhsfNu2RuXzUCvdrdrsUU',
        ContractFunctionSelector: 'dividendsOf(address)',
        ContractParameter: 'false'
      },
      Invest: {
        ID: '4d6642e0-58c4-4137-b263-a90b69cb4b1c',
        ContractAddress: 'TWEiEdjKTGDwgXhsfNu2RuXzUCvdrdrsUU',
        ContractFunctionSelector: 'buy(uint256)',
        ContractParameter: 'UserAmount'
      },
      Devest: {
        ID: 'fd3c74f9-5d19-4997-a6ca-7888dae0a1f7',
        ContractAddress: 'TWEiEdjKTGDwgXhsfNu2RuXzUCvdrdrsUU',
        ContractFunctionSelector: 'sell(uint256)',
        ContractParameter: 'UserAmount'
      },
      ReInvest: {
        ID: 'd235e5bd-89b5-4e0d-8f63-e64df37c002f',
        ContractAddress: 'TWEiEdjKTGDwgXhsfNu2RuXzUCvdrdrsUU',
        ContractFunctionSelector: 'reinvest()',
        ContractParameter: ''
      },
      WithDrawl: {
        ID: '7ea0558c-2010-4d66-8ec6-1f466e366b2c',
        ContractAddress: 'TWEiEdjKTGDwgXhsfNu2RuXzUCvdrdrsUU',
        ContractFunctionSelector: 'withdraw()',
        ContractParameter: ''
      },
      BuyPrice: {
        ID: '1d8127e7-4709-4ecd-b4f4-1d4a2cb22d79',
        ContractAddress: 'TWEiEdjKTGDwgXhsfNu2RuXzUCvdrdrsUU',
        ContractFunctionSelector: 'buyPrice()',
        ContractParameter: ''
      },
      SellPrice: {
        ID: '31930476-798a-4999-b269-c1b13ea820d5',
        ContractAddress: 'TWEiEdjKTGDwgXhsfNu2RuXzUCvdrdrsUU',
        ContractFunctionSelector: 'sellPrice()',
        ContractParameter: ''
      }
    },
    {
      ID: '987641f8-d9e9-4da7-8e7d-51bb69f4c379',
      Name: 'Bank Roll Credits',
      Website: 'bankroll.network',
      MyProperty: null,
      ImageURL: null,
      DappType: { ID: 'ab219c17-dd19-49ba-a51a-ab2a753022fa', Name: 'Bank' },
      ContractAddress: 'TUTik4srgKuzgXoL4KfV75foQbYuP8SirY',
      Trc20TokenAddress: null,
      Trc20TokenDecimals: 0,
      DappDecimals: 6,
      TokenType: null,
      PaysOutIn: 'trx',
      Active: true,
      PoloniexDexID: 0,
      DivPool: {
        ID: '7c1502d2-24bd-4986-9bf1-371ca1a240f8',
        ContractAddress: 'TUTik4srgKuzgXoL4KfV75foQbYuP8SirY',
        ContractFunctionSelector: 'totalSupply()',
        ContractParameter: ''
      },
      Investment: {
        ID: 'bd0679c1-7036-45b3-a99b-92069f7cebd6',
        ContractAddress: 'TUTik4srgKuzgXoL4KfV75foQbYuP8SirY',
        ContractFunctionSelector: 'balanceOf(address)',
        ContractParameter: 'UserKey'
      },
      Referral: {
        ID: 'ba340c5b-3a7a-4b85-a2fe-2b1831430f05',
        ContractAddress: 'TUTik4srgKuzgXoL4KfV75foQbYuP8SirY',
        ContractFunctionSelector: 'dividendsOf(address)',
        ContractParameter: 'true'
      },
      UserDividend: {
        ID: '744d6cb7-438d-480c-b638-944116e5fb5b',
        ContractAddress: 'TUTik4srgKuzgXoL4KfV75foQbYuP8SirY',
        ContractFunctionSelector: 'dividendsOf(address)',
        ContractParameter: 'false'
      },
      Invest: {
        ID: '2bc87452-fce4-4298-b44b-5b2ddb33e1f3',
        ContractAddress: 'TUTik4srgKuzgXoL4KfV75foQbYuP8SirY',
        ContractFunctionSelector: 'buy(uint256)',
        ContractParameter: 'UserAmount'
      },
      Devest: {
        ID: 'eea57f32-4e8a-42f1-bf42-c228c5b31896',
        ContractAddress: 'TUTik4srgKuzgXoL4KfV75foQbYuP8SirY',
        ContractFunctionSelector: 'sell(uint256)',
        ContractParameter: 'UserAmount'
      },
      ReInvest: {
        ID: '9c2b9519-06fa-4d46-b88a-44458e29c457',
        ContractAddress: 'TUTik4srgKuzgXoL4KfV75foQbYuP8SirY',
        ContractFunctionSelector: 'reinvest()',
        ContractParameter: ''
      },
      WithDrawl: {
        ID: '4ab8ed54-8e54-41dd-8345-355782119593',
        ContractAddress: 'TUTik4srgKuzgXoL4KfV75foQbYuP8SirY',
        ContractFunctionSelector: 'withdraw()',
        ContractParameter: ''
      },
      BuyPrice: {
        ID: 'b6732f08-11d4-4e30-bdff-f9f1f99b728f',
        ContractAddress: 'TUTik4srgKuzgXoL4KfV75foQbYuP8SirY',
        ContractFunctionSelector: 'buyPrice()',
        ContractParameter: ''
      },
      SellPrice: {
        ID: 'aa765fb3-047d-4648-b3af-72cd10f15285',
        ContractAddress: 'TUTik4srgKuzgXoL4KfV75foQbYuP8SirY',
        ContractFunctionSelector: 'sellPrice()',
        ContractParameter: ''
      }
    },
    {
      ID: '8531c258-bd74-4e3c-a8a4-6d3a05ed8f26',
      Name: 'Boost',
      Website: null,
      MyProperty: null,
      ImageURL: null,
      DappType: { ID: 'ab219c17-dd19-49ba-a51a-ab2a753022fa', Name: 'Bank' },
      ContractAddress: 'TMmWrjjKGRCdoUzmv6YUaov7mwxy1swDnq',
      Trc20TokenAddress: null,
      Trc20TokenDecimals: 0,
      DappDecimals: 6,
      TokenType: null,
      PaysOutIn: 'trx',
      Active: true,
      PoloniexDexID: 0,
      DivPool: {
        ID: 'c76ec413-cc57-434d-9344-86c3068d9f3a',
        ContractAddress: 'TMmWrjjKGRCdoUzmv6YUaov7mwxy1swDnq',
        ContractFunctionSelector: 'totalSupply()',
        ContractParameter: ''
      },
      Investment: {
        ID: '098165e4-0ae8-47f3-bb36-3ed317f5400a',
        ContractAddress: 'TMmWrjjKGRCdoUzmv6YUaov7mwxy1swDnq',
        ContractFunctionSelector: 'balanceOf(address)',
        ContractParameter: 'UserKey'
      },
      Referral: {
        ID: '079a6cc9-ce34-4a10-a7a2-17c0ec8ec029',
        ContractAddress: 'TMmWrjjKGRCdoUzmv6YUaov7mwxy1swDnq',
        ContractFunctionSelector: 'dividendsOf(address)',
        ContractParameter: 'true'
      },
      UserDividend: {
        ID: 'fefe9640-fb61-4834-b0d1-2090c32a0f3d',
        ContractAddress: 'TMmWrjjKGRCdoUzmv6YUaov7mwxy1swDnq',
        ContractFunctionSelector: 'dividendsOf(address)',
        ContractParameter: 'false'
      },
      Invest: {
        ID: '946b927d-0308-452e-959e-1388eec2d90a',
        ContractAddress: 'TMmWrjjKGRCdoUzmv6YUaov7mwxy1swDnq',
        ContractFunctionSelector: 'buy(uint256)',
        ContractParameter: 'UserAmount'
      },
      Devest: {
        ID: '218af1dc-904d-4097-897a-aa958140d94e',
        ContractAddress: 'TMmWrjjKGRCdoUzmv6YUaov7mwxy1swDnq',
        ContractFunctionSelector: 'sell(uint256)',
        ContractParameter: 'UserAmount'
      },
      ReInvest: {
        ID: '160cd8c0-aa90-499a-971f-b6d34b8c44a1',
        ContractAddress: 'TMmWrjjKGRCdoUzmv6YUaov7mwxy1swDnq',
        ContractFunctionSelector: 'reinvest()',
        ContractParameter: ''
      },
      WithDrawl: {
        ID: '2d730544-8be4-4ad2-a4b5-941badb1d095',
        ContractAddress: 'TMmWrjjKGRCdoUzmv6YUaov7mwxy1swDnq',
        ContractFunctionSelector: 'withdraw()',
        ContractParameter: ''
      },
      BuyPrice: {
        ID: '59ba463c-a5a9-4f68-9829-295f08b0328e',
        ContractAddress: 'TMmWrjjKGRCdoUzmv6YUaov7mwxy1swDnq',
        ContractFunctionSelector: 'buyPrice()',
        ContractParameter: ''
      },
      SellPrice: {
        ID: '0547f2b1-edd3-4963-805b-18cd29f52efd',
        ContractAddress: 'TMmWrjjKGRCdoUzmv6YUaov7mwxy1swDnq',
        ContractFunctionSelector: 'sellPrice()',
        ContractParameter: ''
      }
    },
    {
      ID: '79a7dc0f-79ed-4a3b-a69b-8540237c15e9',
      Name: 'DashBank TRX',
      Website: null,
      MyProperty: null,
      ImageURL: null,
      DappType: { ID: 'ab219c17-dd19-49ba-a51a-ab2a753022fa', Name: 'Bank' },
      ContractAddress: 'TKBWWZUkgTrsYTTfxNY2pxzGE9acqNr2Na',
      Trc20TokenAddress: null,
      Trc20TokenDecimals: 0,
      DappDecimals: 6,
      TokenType: null,
      PaysOutIn: 'trx',
      Active: true,
      PoloniexDexID: 0,
      DivPool: {
        ID: '3fedf0d0-0c40-498c-ac3b-f0093c5a34a6',
        ContractAddress: 'TKBWWZUkgTrsYTTfxNY2pxzGE9acqNr2Na',
        ContractFunctionSelector: 'totalSupply()',
        ContractParameter: ''
      },
      Investment: {
        ID: '8eb6e257-f0be-4ef7-b7b9-3e027395ec8e',
        ContractAddress: 'TKBWWZUkgTrsYTTfxNY2pxzGE9acqNr2Na',
        ContractFunctionSelector: 'balanceOf(address)',
        ContractParameter: 'UserKey'
      },
      Referral: {
        ID: 'e06c4a3d-1a68-4ab4-a0d4-2af70ccb4412',
        ContractAddress: 'TKBWWZUkgTrsYTTfxNY2pxzGE9acqNr2Na',
        ContractFunctionSelector: 'dividendsOf(address)',
        ContractParameter: 'true'
      },
      UserDividend: {
        ID: 'bc3a0d7f-bfcb-4aee-bcb7-ae1f484bae14',
        ContractAddress: 'TKBWWZUkgTrsYTTfxNY2pxzGE9acqNr2Na',
        ContractFunctionSelector: 'dividendsOf(address)',
        ContractParameter: 'false'
      },
      Invest: {
        ID: 'b3f3b5f1-d49f-4157-a66f-ac8b80bc3676',
        ContractAddress: 'TKBWWZUkgTrsYTTfxNY2pxzGE9acqNr2Na',
        ContractFunctionSelector: 'buy(uint256)',
        ContractParameter: 'UserAmount'
      },
      Devest: {
        ID: 'd5a3afe7-4ddb-48a9-a371-ef4894bd4dff',
        ContractAddress: 'TKBWWZUkgTrsYTTfxNY2pxzGE9acqNr2Na',
        ContractFunctionSelector: 'sell(uint256)',
        ContractParameter: 'UserAmount'
      },
      ReInvest: {
        ID: 'd265a6d7-06e9-43b5-9f88-1c8826678570',
        ContractAddress: 'TKBWWZUkgTrsYTTfxNY2pxzGE9acqNr2Na',
        ContractFunctionSelector: 'reinvest()',
        ContractParameter: ''
      },
      WithDrawl: {
        ID: 'b16517fd-5c47-452b-83d7-67dc355185f2',
        ContractAddress: 'TKBWWZUkgTrsYTTfxNY2pxzGE9acqNr2Na',
        ContractFunctionSelector: 'withdraw()',
        ContractParameter: ''
      },
      BuyPrice: {
        ID: '2dddd6c0-1ff4-46a9-90cb-1ea64c782d15',
        ContractAddress: 'TKBWWZUkgTrsYTTfxNY2pxzGE9acqNr2Na',
        ContractFunctionSelector: 'buyPrice()',
        ContractParameter: ''
      },
      SellPrice: {
        ID: '3d0a15ae-2a3a-4a0e-81f8-b8974866f87c',
        ContractAddress: 'TKBWWZUkgTrsYTTfxNY2pxzGE9acqNr2Na',
        ContractFunctionSelector: 'sellPrice()',
        ContractParameter: ''
      }
    },
    {
      ID: 'bedf704d-76ed-4a59-8bfd-85d0924ee721',
      Name: 'Tewkenaire Stable',
      Website: 'https://tewkenaire.network/stable.html',
      MyProperty: null,
      ImageURL: null,
      DappType: { ID: 'ab219c17-dd19-49ba-a51a-ab2a753022fa', Name: 'Bank' },
      ContractAddress: 'TSXnUzYWuockj3KspfGAd8hnRhshPm1yyw',
      Trc20TokenAddress: null,
      Trc20TokenDecimals: 0,
      DappDecimals: 6,
      TokenType: null,
      PaysOutIn: 'trx',
      Active: true,
      PoloniexDexID: 0,
      DivPool: {
        ID: '249307e3-e153-4caa-a620-19f679d66a08',
        ContractAddress: 'TSXnUzYWuockj3KspfGAd8hnRhshPm1yyw',
        ContractFunctionSelector: 'totalSupply()',
        ContractParameter: ''
      },
      Investment: {
        ID: 'fe32f567-1047-4e96-ae50-6b425dd3d657',
        ContractAddress: 'TSXnUzYWuockj3KspfGAd8hnRhshPm1yyw',
        ContractFunctionSelector: 'balanceOf(address)',
        ContractParameter: 'UserKey'
      },
      Referral: {
        ID: 'cdcd6373-17d1-4738-a77f-d2acaccec34e',
        ContractAddress: 'TSXnUzYWuockj3KspfGAd8hnRhshPm1yyw',
        ContractFunctionSelector: 'dividendsOf(address)',
        ContractParameter: 'true'
      },
      UserDividend: {
        ID: '595243fc-0ac7-4854-8710-679f82be63a6',
        ContractAddress: 'TSXnUzYWuockj3KspfGAd8hnRhshPm1yyw',
        ContractFunctionSelector: 'dividendsOf(address)',
        ContractParameter: 'false'
      },
      Invest: {
        ID: '6cb14a40-6281-44c9-aab7-3a82043d48e8',
        ContractAddress: 'TSXnUzYWuockj3KspfGAd8hnRhshPm1yyw',
        ContractFunctionSelector: 'buy(uint256)',
        ContractParameter: 'UserAmount'
      },
      Devest: {
        ID: '93a3797d-57bb-4cb1-a197-3171944cee25',
        ContractAddress: 'TSXnUzYWuockj3KspfGAd8hnRhshPm1yyw',
        ContractFunctionSelector: 'sell(uint256)',
        ContractParameter: 'UserAmount'
      },
      ReInvest: {
        ID: 'dad60d99-ef44-425a-ac7d-ec02f1e0552a',
        ContractAddress: 'TSXnUzYWuockj3KspfGAd8hnRhshPm1yyw',
        ContractFunctionSelector: 'reinvest()',
        ContractParameter: ''
      },
      WithDrawl: {
        ID: '5007247f-72a7-4c4e-b835-3e6fe24f531a',
        ContractAddress: 'TSXnUzYWuockj3KspfGAd8hnRhshPm1yyw',
        ContractFunctionSelector: 'withdraw()',
        ContractParameter: ''
      },
      BuyPrice: {
        ID: '2b5d3958-2e23-4a8e-aaf8-a0ab216cb00f',
        ContractAddress: 'TSXnUzYWuockj3KspfGAd8hnRhshPm1yyw',
        ContractFunctionSelector: 'buyPrice()',
        ContractParameter: ''
      },
      SellPrice: {
        ID: '3eeef0e8-f4c5-4fde-b00a-b77173a20be8',
        ContractAddress: 'TSXnUzYWuockj3KspfGAd8hnRhshPm1yyw',
        ContractFunctionSelector: 'sellPrice()',
        ContractParameter: ''
      }
    },
    {
      ID: '995aa190-1bcf-46fc-b154-c995313e3dd6',
      Name: 'Tewkenaire Crazy',
      Website: null,
      MyProperty: null,
      ImageURL: null,
      DappType: { ID: 'ab219c17-dd19-49ba-a51a-ab2a753022fa', Name: 'Bank' },
      ContractAddress: 'TCSw8e8M6BRUYvh1vHhHZCZPiiBrcDjv7R',
      Trc20TokenAddress: null,
      Trc20TokenDecimals: 0,
      DappDecimals: 18,
      TokenType: null,
      PaysOutIn: 'trx',
      Active: true,
      PoloniexDexID: 0,
      DivPool: {
        ID: 'c0b8729b-53da-47a2-8845-ed75950603ee',
        ContractAddress: 'TCSw8e8M6BRUYvh1vHhHZCZPiiBrcDjv7R',
        ContractFunctionSelector: 'totalSupply()',
        ContractParameter: ''
      },
      Investment: {
        ID: '062e3f48-7abe-43db-a59c-7bd3c2bd1b0d',
        ContractAddress: 'TCSw8e8M6BRUYvh1vHhHZCZPiiBrcDjv7R',
        ContractFunctionSelector: 'balanceOf(address)',
        ContractParameter: 'UserKey'
      },
      Referral: {
        ID: '90a38306-a8b6-42fe-93a6-d26323450416',
        ContractAddress: 'TCSw8e8M6BRUYvh1vHhHZCZPiiBrcDjv7R',
        ContractFunctionSelector: 'dividendsOf(address)',
        ContractParameter: 'true'
      },
      UserDividend: {
        ID: '42f0d320-9c36-480d-b8eb-448ff026e073',
        ContractAddress: 'TCSw8e8M6BRUYvh1vHhHZCZPiiBrcDjv7R',
        ContractFunctionSelector: 'dividendsOf(address)',
        ContractParameter: 'false'
      },
      Invest: {
        ID: '770f1bf2-b251-4d4b-b4ee-c9cdd716c543',
        ContractAddress: 'TCSw8e8M6BRUYvh1vHhHZCZPiiBrcDjv7R',
        ContractFunctionSelector: 'buy(uint256)',
        ContractParameter: 'UserAmount'
      },
      Devest: {
        ID: '4d325541-375d-4cc6-bfe2-08f4fe54e478',
        ContractAddress: 'TCSw8e8M6BRUYvh1vHhHZCZPiiBrcDjv7R',
        ContractFunctionSelector: 'sell(uint256)',
        ContractParameter: 'UserAmount'
      },
      ReInvest: {
        ID: '4d434757-5bc7-49f5-83d8-e40f2e48637d',
        ContractAddress: 'TCSw8e8M6BRUYvh1vHhHZCZPiiBrcDjv7R',
        ContractFunctionSelector: 'reinvest()',
        ContractParameter: ''
      },
      WithDrawl: {
        ID: '08f35790-1eb0-49e0-8169-01b929137c92',
        ContractAddress: 'TCSw8e8M6BRUYvh1vHhHZCZPiiBrcDjv7R',
        ContractFunctionSelector: 'withdraw()',
        ContractParameter: ''
      },
      BuyPrice: {
        ID: '08dbab79-afe7-4876-bf25-571a8c0f8622',
        ContractAddress: 'TCSw8e8M6BRUYvh1vHhHZCZPiiBrcDjv7R',
        ContractFunctionSelector: 'buyPrice()',
        ContractParameter: ''
      },
      SellPrice: {
        ID: 'c4d7500c-5f49-4140-9adb-eeccea64e016',
        ContractAddress: 'TCSw8e8M6BRUYvh1vHhHZCZPiiBrcDjv7R',
        ContractFunctionSelector: 'sellPrice()',
        ContractParameter: ''
      }
    },
    {
      ID: '7e28c97b-56db-41ba-b790-dd6aeab74861',
      Name: 'DashBank BTT',
      Website: 'https://trondash.com/bttbank',
      MyProperty: null,
      ImageURL: null,
      DappType: { ID: 'ab219c17-dd19-49ba-a51a-ab2a753022fa', Name: 'Bank' },
      ContractAddress: 'TDwhzSDTWufUcfVp5JDm182F8GB8cQkeZ5',
      Trc20TokenAddress: null,
      Trc20TokenDecimals: 0,
      DappDecimals: 6,
      TokenType: null,
      PaysOutIn: 'btt',
      Active: true,
      PoloniexDexID: 0,
      DivPool: {
        ID: '90f63680-f6ed-44d2-8e66-0ec3b5a7279c',
        ContractAddress: 'TDwhzSDTWufUcfVp5JDm182F8GB8cQkeZ5',
        ContractFunctionSelector: 'totalSupply()',
        ContractParameter: ''
      },
      Investment: {
        ID: '40df7638-9502-4a90-b589-44c55209fc31',
        ContractAddress: 'TDwhzSDTWufUcfVp5JDm182F8GB8cQkeZ5',
        ContractFunctionSelector: 'balanceOf(address)',
        ContractParameter: 'UserKey'
      },
      Referral: {
        ID: '76333777-d3ff-4128-ae13-efcaf0a0fe82',
        ContractAddress: 'TDwhzSDTWufUcfVp5JDm182F8GB8cQkeZ5',
        ContractFunctionSelector: 'dividendsOf(address)',
        ContractParameter: 'true'
      },
      UserDividend: {
        ID: '71b21fa0-9955-4ec0-a2bc-2d9946d8fbf3',
        ContractAddress: 'TDwhzSDTWufUcfVp5JDm182F8GB8cQkeZ5',
        ContractFunctionSelector: 'dividendsOf(address)',
        ContractParameter: 'false'
      },
      Invest: {
        ID: 'e842d16d-e467-42b8-9006-07c1c1477618',
        ContractAddress: 'TDwhzSDTWufUcfVp5JDm182F8GB8cQkeZ5',
        ContractFunctionSelector: 'buy(uint256)',
        ContractParameter: 'UserAmount'
      },
      Devest: {
        ID: '22e3d180-e67b-4212-ab72-3347aef4e96f',
        ContractAddress: 'TDwhzSDTWufUcfVp5JDm182F8GB8cQkeZ5',
        ContractFunctionSelector: 'sell(uint256)',
        ContractParameter: 'UserAmount'
      },
      ReInvest: {
        ID: '57df3f24-1e59-4c03-96d4-885a641bdd25',
        ContractAddress: 'TDwhzSDTWufUcfVp5JDm182F8GB8cQkeZ5',
        ContractFunctionSelector: 'reinvest()',
        ContractParameter: ''
      },
      WithDrawl: {
        ID: '7d67239b-8f80-463c-bcde-228f65d165ce',
        ContractAddress: 'TDwhzSDTWufUcfVp5JDm182F8GB8cQkeZ5',
        ContractFunctionSelector: 'withdraw()',
        ContractParameter: ''
      },
      BuyPrice: {
        ID: '0c1c90d1-aca7-41ea-ab1a-f46622df3342',
        ContractAddress: 'TDwhzSDTWufUcfVp5JDm182F8GB8cQkeZ5',
        ContractFunctionSelector: 'buyPrice()',
        ContractParameter: ''
      },
      SellPrice: {
        ID: '8a8f211f-a2b4-45a1-8ad5-24763394fb9a',
        ContractAddress: 'TDwhzSDTWufUcfVp5JDm182F8GB8cQkeZ5',
        ContractFunctionSelector: 'sellPrice()',
        ContractParameter: ''
      }
    },
    {
      ID: '3a9061dc-6e7d-4043-b007-ef965331166b',
      Name: 'Frag Box',
      Website: null,
      MyProperty: null,
      ImageURL: null,
      DappType: { ID: 'ab219c17-dd19-49ba-a51a-ab2a753022fa', Name: 'Bank' },
      ContractAddress: 'TTXAkorQWkzwZADnULju1jKSEv3vaum5gz',
      Trc20TokenAddress: null,
      Trc20TokenDecimals: 0,
      DappDecimals: 18,
      TokenType: null,
      PaysOutIn: 'trx',
      Active: true,
      PoloniexDexID: 0,
      DivPool: {
        ID: 'abd96df8-6445-4c56-b7b7-5bfe37a0f6f0',
        ContractAddress: 'TTXAkorQWkzwZADnULju1jKSEv3vaum5gz',
        ContractFunctionSelector: 'balance()',
        ContractParameter: ''
      },
      Investment: {
        ID: '98b75975-aa88-4609-9fb9-ec8f0b9dd9b3',
        ContractAddress: 'TTXAkorQWkzwZADnULju1jKSEv3vaum5gz',
        ContractFunctionSelector: 'savingsOf(address)',
        ContractParameter: 'UserKey'
      },
      Referral: {
        ID: 'fdfda973-563a-4d58-91f6-7216b6810803',
        ContractAddress: 'TTXAkorQWkzwZADnULju1jKSEv3vaum5gz',
        ContractFunctionSelector: 'dividendsOf(address)',
        ContractParameter: 'true'
      },
      UserDividend: {
        ID: '745ee8ea-374d-46dc-90f1-598dbbfb11b0',
        ContractAddress: 'TTXAkorQWkzwZADnULju1jKSEv3vaum5gz',
        ContractFunctionSelector: 'dividendsOf(address)',
        ContractParameter: 'false'
      },
      Invest: {
        ID: 'ae2445cf-5474-46ab-b1aa-c5acf828168f',
        ContractAddress: 'TTXAkorQWkzwZADnULju1jKSEv3vaum5gz',
        ContractFunctionSelector: 'buy(uint256)',
        ContractParameter: 'UserAmount'
      },
      Devest: {
        ID: '1dadcc06-55ec-4934-ba8a-b96aa7104d3b',
        ContractAddress: 'TTXAkorQWkzwZADnULju1jKSEv3vaum5gz',
        ContractFunctionSelector: 'sell(uint256)',
        ContractParameter: 'UserAmount'
      },
      ReInvest: {
        ID: '38ae51e5-57e7-4718-9199-a75d8811a929',
        ContractAddress: 'TTXAkorQWkzwZADnULju1jKSEv3vaum5gz',
        ContractFunctionSelector: 'reinvest()',
        ContractParameter: ''
      },
      WithDrawl: {
        ID: '20c7f9ef-97e5-4cdc-9146-91b215ec60d5',
        ContractAddress: 'TTXAkorQWkzwZADnULju1jKSEv3vaum5gz',
        ContractFunctionSelector: 'withdraw()',
        ContractParameter: ''
      },
      BuyPrice: {
        ID: 'c925dbfe-99fe-46cd-81f0-4e9116e9a3da',
        ContractAddress: 'TTXAkorQWkzwZADnULju1jKSEv3vaum5gz',
        ContractFunctionSelector: 'buyPrice()',
        ContractParameter: ''
      },
      SellPrice: {
        ID: '14a9eb4d-0888-45ba-b964-c2458f3e9820',
        ContractAddress: 'TTXAkorQWkzwZADnULju1jKSEv3vaum5gz',
        ContractFunctionSelector: 'sellPrice()',
        ContractParameter: ''
      }
    }
  ]
});
