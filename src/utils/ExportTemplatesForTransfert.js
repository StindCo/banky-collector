import { SaveFormat, manipulateAsync } from "expo-image-manipulator";
import { Asset } from "expo-asset";

const moment = require("moment");

async function generateHearder(accountFrom, accountTo) {
  const asset = Asset.fromModule(
    require("../../assets/img/logo/logo-light-streamline.png")
  );
  const image = await manipulateAsync(asset.localUri ?? asset.uri, [], {
    base64: true,
    format: SaveFormat.PNG,
  });

  return `

  <div style="background: #fff; display: flex; justify-content: space-between;align-items: start">
      <div>
        <img src="data:image/png;base64,${
          image.base64
        }"  style="width: 75px; mix-blend-mode:darken; background: #fff" />
      </div>

      <div style="font-size: 11px">
        imprimé en date du: <span style="font-weight: bold"> ${moment(
          new Date()
        ).format("DD-MM-YYYY HH:mm")} </span>
      </div>



  </div>

    <h1 style="text-align:center; padding-bottom:20px; font-size:24px; border-bottom: 2px solid #aaa">Justificatif de transfert</h1>
    <div
    className="flex flex-row justify-between items-center"
    style="
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
    "
  >
    <div style="width: 100%">

      <div style="display:flex; align-items: start; justify-content: space-between; ">
          <div style="width:50%">
              <h2>Informations de l'expéditeur</h2>
              <div style="display: flex, justify-content: space-between; align-items:center;">
                <span >Intitulé du compte :  </span>
                <span style="font-weight: bold">${accountFrom?.name}</span>
              </div>
              <div style="display: flex, justify-content: space-between; align-items:center;">
                <span style="">Numéro de compte :</span>
                <span style="font-weight: bold">${accountFrom.accountNumber}</span>
              </div>
              <div style="display: flex, justify-content: space-between; align-items:center;">
                <span style="">Devise :</span>
                <span style="font-weight: bold">${accountFrom.currency}</span>
              </div>
              <div style="display: flex, justify-content: space-between; align-items:center;">
                <span style="">Balance :</span>
                <span style="font-weight: bold">${accountFrom.balance}</span>
              </div>
          </div>

          <div style="width:50%; text-align: right">
              <h2>Informations du destinataire</h2>
              <div style="display: flex, justify-content: space-between; align-items:center; text-align: right;">
                <span >Intitulé du compte :  </span>
                <span style="font-weight: bold; text-align: right;">${accountTo?.name}</span>
              </div>
              <div style="display: flex, justify-content: space-between; align-items:center; text-align: right; ">
                <span style="">Numéro de compte :</span>
                <span style="font-weight: bold; text-align: right;">${accountTo.accountNumber}</span>
              </div>
              <div style="display: flex, justify-content: space-between; align-items:center; text-align: right;">
                <span style="">Devise :</span>
                <span style="font-weight: bold; text-align: right;">${accountFrom.currency}</span>
              </div>

          </div>

      </div>

    </div>
  </div>

    `;
}


export default async function generateTemplate(
  fromAccount,
  toAccount,
  toAccountNumber,
  transfertData,
) {
  let header = await generateHearder(fromAccount, toAccount);

  const html = `

<html>
  <head>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
    />
    <style>
      body {
        font-family: "Roboto";
        background-color: #fff;
        font-size: 12px;
        padding: 50px;
      }
      #customers {
        font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
          "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
        border-collapse: collapse;
        width: 100%;
        text-align: left;
      }

      #customers td,
      #customers th {
        border: 1px solid #aaa;
        padding: 8px;
        font-size: 12px;
        text-align: left;
      }

      #customers th {
        padding-top: 6px;
        text-align: left;
        padding-bottom: 6px;
        text-align: left;
        background-color: #aaa;
        color: white;
      }
    </style>
  </head>
  <body style="padding: 10px">
    <div>
      ${header}
      <br />



      <div style=" padding: 20px 0px; marginTop: 10px ">
      <div
      style="
          margin: 20px 50px;
          padding: 50px 20px;
          border: 2px solid #aaa;
          border-radius: 5px;
      "
  >
      <div
          style="
              display: flex;
              justify-content: space-between;
              width: 100%;
              align-items: center;
          "
      >
          <div style=" font-size: 12px ">Description:</div>
          <div style=" font-size: 12px; font-weight: bold ">

              ${transfertData.description}
          </div>
      </div>

      <div
          style="
              display: flex;
              justify-content: space-between;
              width: 100%;
              align-items: center;
          "
      >
          <div style=" font-size: 12px ">Montant:</div>
          <div style=" font-size: 25px; font-weight: bold ">

              ${transfertData.amount} ${transfertData.currency}
          </div>
      </div>

      <div
          style="
              display: flex;
              justify-content: space-between;
              width: 100%;
              align-items: center;
          "
      >
          <div style=" font-size: 12px ">
              Frais de la transaction:
          </div>
          <div style=" font-size: 12px ">

              ${transfertData.fee} ${transfertData.feeCurrency}
          </div>
      </div>

      <div
          style="
              display: flex;
              justify-content: space-between;
              width: 100%;
              align-items: center;
          "
      >
          <div style=" font-size: 12px">N° de transaction:</div>
          <div style=" font-size: 12px"> ${transfertData.id}</div>
      </div>
      <div
          style="
              display: flex;
              justify-content: space-between;
              width: 100%;
              align-items: center;
          "
      >
          <div style=" font-size: 12px">
              Date de la transaction:
          </div>
          <div style=" font-size: 12px ">

              ${moment(transfertData.initiatedAt).format(
                  'DD-MM-YY HH:mm'
              )}
          </div>
      </div>
  </div>
      </div>


    </div>
  </body>
</html>


`;

  return html;
}
