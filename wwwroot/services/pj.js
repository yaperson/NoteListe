export default class {
    static async getReports (){
        let response = await fetch('/api/report/list2.json')
        let data = await response.json()
        return data
    }
}