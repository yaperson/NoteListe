export default class {
    static async getNotes (){
        let response = await fetch('http://localhost:5050/api/getNote')
        let data = await response.json()
        return data
    }
}