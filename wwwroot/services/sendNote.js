export default class {

    sendNote(title, content) {

      const url = 'http://localhost:5050/api/sendNote';
      const headers = {
          "Content-type": "application/json; charset=UTF-8"
          //,"client_id": "1001125",
          //"client_secret": "876JHG76UKFJYGVHf867rFUTFGHCJ8JHV"
      }

      const data = {
          Nt_title: title,
          Nt_content: content
      }

      fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(data) })
          .then(response => response.json())  
          .then(json => console.log(json))
          .catch(err => console.log(err))
          console.log(data)
      //this.shell.gotoView('/views/report-list.js')
      return this.http.post(uri, obj);
    }
  }