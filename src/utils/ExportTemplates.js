import { SaveFormat, manipulateAsync } from "expo-image-manipulator";
import { Asset } from "expo-asset";

const moment = require("moment");

const PeriodDescriptionOfAccountStatement = ({ fromDate, toDate }) => {
  if (fromDate != null && toDate != null) {
    return `  <div style="font-size: 9px ">
                <span>du </span>
                <span
                    style="
                        font-weight: bold;
                        margin-left: 5px;
                    "
                >
                    ${fromDate ?? " - "}
                </span>
                <span style=" margin-left: 5px ">au </span>
                <span
                    style="
                        font-weight: bold;
                        margin-left: 5px;
                    "
                >
                    ${toDate ?? " - "}
                </span>
            </div>`;
  }

  if (fromDate != null && toDate == null) {
    return ` <div style=" font-size: 9px ">
                <span>depuis </span>
                <span
                  style="
                    font-weight: bold;
                    margin-left: 5px;
                  "
                >
                  ${fromDate ?? " - "}
                </span>
              </div>`;
  }

  if (fromDate == null && toDate != null) {
    return ` <div style=" font-size: 9px ">
                <span>Avant le </span>
                <span
                  style="
                    font-weight: bold,
                    margin-left: 5px,
                  ">
                  ${toDate}
                </span>
            </div>`;
  }

  return `<div style="font-size:9px">
      <span>depuis l'ouveture du compte</span>
    </div>`;
};

async function generateHearder(account, fromDate, toDate) {
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

    <h1 style="text-align:center; padding-bottom:20px; font-size:24px; border-bottom: 2px solid #aaa">Relevé de compte</h1>
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
      <h2>Informations du compte</h2>

      <div style="display:flex; align-items: start; justify-content: space-between; ">
          <div style="width:50%">
              <div style="display: grid; grid-template-columns: 150px 30%;">
                <span >Intitulé du compte :  </span>
                <span style="font-weight: bold">${account?.name}</span>
              </div>
              <div style="display: grid; grid-template-columns: 150px 30%;">
                <span style="">Numéro de compte :</span>
                <span style="font-weight: bold">${account.accountNumber}</span>
              </div>
              <div style="display: grid; grid-template-columns: 150px 30%;">
                <span style="">Devise :</span>
                <span style="font-weight: bold">${account.currency}</span>
              </div>
              <div style="display: grid; grid-template-columns: 150px 30%;">
                <span style="">Balance :</span>
                <span style="font-weight: bold">${account.balance}</span>
              </div>
          </div>
          <div style="text-align:right">
              <div style="margin-bottom: 5px">Transactions effectuées en période:</div>
             ${PeriodDescriptionOfAccountStatement({ fromDate, toDate })}

          </div>
      </div>

    </div>
  </div>

    `;
}

const sumByType = (type, entries) => {
  let result = 0;
  entries.forEach((el) => {
    if (el.type === type) result += parseInt(el.transactionAmount);
  });

  return result;
};

async function generateTable(entries = []) {
  return `
      ${entries.map(
        (value) => `
      <tr>
          <td>${moment(value?.date).format("DD-MM-YYYY HH:MM")}</td>
          <td>${value.authorizationId}</td>
          <td>${value.label}</td>
          <td>${value?.type == "D" ? value.transactionAmount : ""}</td>
          <td>${value?.type == "C" ? value.transactionAmount : ""}</td>
          <td>${value.balance}</td>
        </tr>
      `
      )}

      <tr style="text-align: center;background-color: #ccc; font-weight: bold">
      <td colSpan="3">
          Total :
      </td>
      <td>
          <div
              style="font-weight: bold"
          >
              ${sumByType("D", entries)}
          </div>
      </td>
      <td className="border-2 p-2">
          <div
              style=" font-weight: bold "
          >
              ${sumByType("C", entries)}
          </div>
      </td>

      <td></td>
  </tr>
  `;
}

export default async function generateTemplate(
  account,
  entries,
  fromDate = null,
  toDate = null
) {
  let header = await generateHearder(account, fromDate, toDate);
  let table = await generateTable(entries);

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
      <br /><table id="customers">
          <thead>
                <tr>
                  <th>Date</th>
                  <th>N° Transaction</th>
                  <th>Motif</th>
                  <th>Débit (${account.currency})</th>
                  <th>Crédit (${account.currency})</th>
                  <th>Solde</th>
                </tr>
          </thead>
          <tbody>
          ${table}
          </tbody>

      </table>

      <div style=" padding: 20px 0px; marginTop: 10px ">
      <div style="display: flex; align-items: center; justify-content: flex-end;">
          <div style="text-align: right">
              <h4 style="font-weight: normal">Résumé</h4>
              <div>
                  <span>Total crédit :</span>
                  <span
                      style="
                          font-weight: bold;
                          margin-left: 5px
                      "
                  >
                      ${sumByType("C", entries)}
                  </span>
              </div>
              <div>
                  <span>Total débit :</span>
                  <span
                      style="
                          font-weight: bold;
                          margin-left: 5px;
                      "
                  >
                      ${sumByType("D", entries)}
                  </span>
              </div>
              <div style="">
                  <span>Solde final :</span>
                  <span
                      style="
                          font-size: 14px;
                          font-weight: bold;
                          margin-left: 5px;
                      "
                  >
                      ${account.balance} ${account.currency}
                  </span>
              </div>
              <div
                  style=" width: 100%; border: 1px solid #aaa "
              ></div>
          </div>
      </div>
  </div>


    </div>
  </body>
</html>


`;

  return html;
}
