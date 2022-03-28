export default class {
    static async getUsersConnection() {
        let response = await fetch('POST', '/api/connectUser').then(function (response) {
            return response.json;
        })
        .catch(function (error) {
            console.error()
        })
        .then(function (result) {
            return result.recordset
        });

        let userVerif = await response
        console.error(userVerif)
        return userVerif
    }
}