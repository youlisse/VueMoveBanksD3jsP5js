
async function foo() {

    let res = await fetch('https://www.movebank.org/movebank/service/direct-read?entity_type=event&study_id=657674643&api-token=7f2c8c37-29dc-408f-82cb-f108fdcd2d1b');
    let licence=res.text();
    const CryptoJS = require("crypto-js");
    const hash = CryptoJS.MD5(licence).toString(CryptoJS.enc.Hex);
    let answer = await fetch('https://www.movebank.org/movebank/service/direct-read?entity_type=event&study_id=220229&api-token=7f2c8c37-29dc-408f-82cb-f108fdcd2d1b&license-md5='+hash);
    return answer.text();
    //return licence;

}


export default { foo }


