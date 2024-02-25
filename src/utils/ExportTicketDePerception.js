import { SaveFormat, manipulateAsync } from "expo-image-manipulator";
import { Asset } from "expo-asset";

const moment = require("moment");

export const getSelectedOperationTextByTag = (tag) => {
  if (tag == "saving") return "Epargne";
  else if (tag == "saving_card") return "Buakisa carte";
  else if (tag == "loan") return "Crédit";
};

async function generateHearder(data, user) {
  // const asset = Asset.fromModule(
  //   require("../../assets/img/logo/logo-light-streamline.png")
  // );
  // const image = await manipulateAsync(asset.localUri ?? asset.uri, [], {
  //   base64: true,
  //   format: SaveFormat.PNG,
  // });

  return `
  <div style="background: #fff;width: 100%; display: flex; justify-content: center; align-items: center;">
  <div>

  </div>
</div>

<br />

<h1 style="text-align:center; padding-bottom:0px; font-size:28px;">${
    user.platform.name
  }</h1>
<h1 style="text-align:center; margin:0; padding-bottom:10px; font-size:20px;">${
    user.partition.name
  }</h1>
<div style="text-align:center; margin:0; padding-bottom:20px; font-size:15px;  border-bottom: 1px solid #aaa">${
    user.partition.address
  }</div>
<h1 style="text-align:center; padding-bottom:5px; font-size:12px;">${
    user.business_role.label
  }</h1>

<h1 style="text-align:center; padding-bottom:20px; font-size:18px; border-bottom: 2px solid #aaa">${
    user.displayName
  }</h1>


   <h2 style="text-align:center; font-size:12px">${moment(new Date()).format(
     "DD/MM/YY HH:mm"
   )}</h2>
  <div style="text-align:center; padding-bottom:20px; font-size:28px;"> ${getSelectedOperationTextByTag(
    data.typeOperation
  )}</div>

<div
style="
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
"
>
<div style="width: 100%">
  <div style="display:flex; font-size: 20px; align-items: center; justify-content: space-between; ">
      <div style="width:100%">
        <div style="display: flex; justify-content: space-between; align-items:center;margin-bottom: 10px">
            <div>Numéro de compte :</div>
            <div style="font-weight: bold; text-align: right">${
              data.recipient
            }</div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center;margin-bottom: 10px">
            <div>Montant :  </div>
            <div style="font-size:38px; font-weight: bold">${data.amount}</div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items:center; margin-bottom: 10px">
            <div  >Devise :</div>
            <div style="font-weight: bold; text-align: right">${
              data?.currency
            }</div>
          </div>
          <div style="display: flex; justify-content: space-between;  align-items:center; margin-bottom: 10px">
            <div  >Description :</div>
            <div style="font-weight: bold; text-align: right">${
              data?.description == "" ? "-" : data.description
            }</div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items:center; margin-bottom: 10px">
          <div>Date :</div>
          <div style="font-weight: bold; text-align: right">${moment(
            data?.created_at
          ).format("DD-MM-YYYY")}</div>
        </div>
      </div>
  </div>

</div>
</div>

<br />
<br />
<br />
<br />
<br />

    <br />

    `;
}

export default async function generateTemplate(data, user) {
  let header = await generateHearder(data, user);
  // const asset = Asset.fromModule(
  //   require("../../assets/img/logo/logo-light-streamline.png")
  // );
  // const image = await manipulateAsync(asset.localUri ?? asset.uri, [], {
  //   base64: true,
  //   format: SaveFormat.PNG,
  // });

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
    </div>
  </body>
</html>


`;

  return html;
}
