import axios from "axios";
import { csv2json } from "json-2-csv";

export async function httpsReqest(url) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: "GET",
      responseType: "blob",
    }).then(
      (res) => {
        const reader = new FileReader()
        reader.readAsText(res.data)
        reader.onload = () => {
          const ret = reader.result as string
          
          resolve(csv2json(ret));
        }
      },
      ({ respose }) => {
        reject(respose.data);
      }
    );
  });
}
