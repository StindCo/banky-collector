import { SaveFormat, manipulateAsync } from "expo-image-manipulator";
import { Asset } from "expo-asset";

const moment = require("moment");

export const getSelectedOperationTextByTag = (tag) => {
  if (tag == "saving") return "Epargne";
  else if (tag == "S") return "Bwakisa carte";
  else if (tag == "L") return "Crédit";
  else if (tag == "D") return "Dépôt";
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
  <div style="background: #fff;width: 100%; display: flex; font-size:25px; justify-content: center; align-items: center;">
  <div>

  </div>
</div>

<br />

<h1 style="text-align:center; padding-bottom:0px; font-size:40px;">${
    user.platform?.name
  }</h1>
<h1 style="text-align:center; margin:0; padding-bottom:10px; font-size:30px;">${
    user.partition?.name
  }</h1>
<div style="text-align:center; margin:0; padding-bottom:20px; font-size:28px;  border-bottom: 1px solid #aaa">${
    user.partition?.address
  }</div>
<p style="text-align:center; padding-bottom:5px; font-size:25px;">Agent collecteur</p>

<h1 style="text-align:center; padding-bottom:20px; font-size:28px; border-bottom: 2px solid #aaa">${
    user?.displayName
  }</h1>


   <h2 style="text-align:center; font-size:25px">${moment(new Date()).format(
     "DD/MM/YY HH:mm"
   )}</h2>
  <div style="text-align:center; margin-bottom: 20px; padding-bottom:20px; font-size:45px;"> ${getSelectedOperationTextByTag(
    data.goal
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
       <div style="display: flex; font-size:25px; justify-content: space-between;  align-items:center; margin-bottom: 10px">
          <div>Nom du client :  <span style="font-weight: bold; font-size: 28px; margin-left: 10px">  ${
            data?.data6 == "" ? "-" : data?.data6
          }</span></div>

        </div>
        <div style="display: flex; font-size:25px; justify-content: space-between; align-items:center;margin-bottom: 10px">
            <div>Numéro de compte : <span style="font-weight: bold; font-size: 28px; margin-left: 10px"> ${
              data.asset
            }
            </span> </div>
          </div>

          <div style="display: flex; font-size:25px; justify-content: space-between; align-items: center;margin-bottom: 10px">
            <div>Montant :  <span style="font-weight: bold; font-size: 28px; margin-left: 10px"> ${
              data.amount
            }
            </span>  </div>
          </div>

          <div style="display: flex; font-size:25px; justify-content: space-between; align-items:center; margin-bottom: 10px">
            <div >Devise : <span style="font-weight: bold; font-size: 28px; margin-left: 10px">  ${
              data?.currency
            }
            </span></div>
          </div>




          <div style="display: flex; font-size:25px; justify-content: space-between;  align-items:center; margin-bottom: 10px">
          <div>Contact :  <span style="font-weight: bold; font-size: 28px; margin-left: 10px">  ${
            data?.data3 == "" ? "-" : data?.data3
          }</span></div>

        </div>
          <div style="display: flex; font-size:25px; justify-content: space-between; align-items:center; margin-bottom: 10px">
          <div>Date :  <span style="font-weight: bold; font-size: 28px; margin-left: 10px">  ${moment(
            data?.data?.data1
          ).format("DD-MM-YYYY HH:mm")}</span></div>

        </div>

        <div style="display: flex; font-size:25px; justify-content: space-between;  align-items:center; margin-bottom: 10px">
            <div  >Description :  <span style="font-weight: bold; font-size: 28px; margin-left: 10px">  ${
              data?.data4 == "" ? "-" : data?.data4
            } </span></div>
          </div>
      </div>
  </div>

</div>
</div>

<br />
<br />
<br />
<div style="text-align: center; font-size: 30px">Merci beaucoup !!!</div>
<br />
<br />

    <br />

    <div style="text-align: center; font-size: 38px">***************************</div>

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
        font-size: 15px;
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
        font-size: 16px;
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
