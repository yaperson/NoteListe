export default class {
    static async getUsers() {
        let response = await fetch('http://localhost:5050/api/connectUser').then(function (response) {
            return response.json;
        })
        .catch(function (error) {
            console.error()
        })
        .then(function (result) {
            return result.recordset
        });


        let data = await response
        return data
    }
}