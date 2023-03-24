/* make a customized fetch request */
import { BASE_URL } from "../env"



export default async function fetch_home(url, payload) {
    try {
        // life check
        var resp_life = await (await fetch(BASE_URL + 'check_life')).json()

        console.log('resp life', resp_life)
        if (!resp_life.life) {
            alert(resp_life.message)
        }
        else {
            var response = await fetch(url, payload)

            if (response.status == 200) {
                return response
            }
            else {
                return response.status
            }
        }


    }
    catch (err) {
        console.log(err)
    }
}
