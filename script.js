
function createme() {
  let Password = document.getElementById('passID').value;
  let SSIDname = document.getElementById('ssidID').value;
  var typeNumber = 4;
  var errorCorrectionLevel = 'H';
  var qr = qrcode(typeNumber, errorCorrectionLevel);
  let value = "";
  let checked_hidden = document.querySelector('#hiddenSSID').checked;
  let wpa_value="";

  
  if (document.querySelector('#wpa').checked) {
  wpa_value="WPA2";
  }
  else if (document.querySelector('#wpa2-eap').checked) {
    wpa_value="WPA2-EAP";
  }
  else {
    wpa_value="WEP";
  }

  if (checked_hidden)
    value = `WIFI:S:${SSIDname};T:${wpa_value};P:${Password};H:true;;`
  else
    value = `WIFI:S:${SSIDname};T:${wpa_value};P:${Password};;`

  
  
  qr.addData(value);
  qr.make();
  let tempDiv = document.createElement('div');
  tempDiv.innerHTML = qr.createImgTag(10);
  let imgSrc = tempDiv.querySelector('img').src;
  document.getElementById('qrImage').src = imgSrc;
}
createme();

document.getElementById('passID').addEventListener('input', createme)
document.getElementById('ssidID').addEventListener('input', createme)
document.querySelectorAll('.wpa-security').forEach((e)=>{
  e.addEventListener('click', createme);
})


function printme(){
let numbers = document.getElementById('num_codes').value;
 let SSIDname = document.getElementById('ssidID');
  if (!SSIDname.value) {
    SSIDname.setCustomValidity("");
    SSIDname.setCustomValidity("WiFi Name is required!");
    SSIDname.reportValidity();
    return;
  }
  if(numbers==1)
  window.print();
  else{

    let printSection = document.createElement('div');
    printSection.id = 'print-section';
    printSection.style.display = 'none';


    for (let i = 1; i < numbers; i++) {
      let qrClone = document.getElementById('containerId').cloneNode(true);
      printSection.appendChild(document.createElement('br'));
      printSection.appendChild(qrClone);
    }
    document.body.appendChild(printSection);
    window.print();
    document.body.removeChild(printSection);
  }
}
document.querySelector('.buttonClass').addEventListener('click',printme)