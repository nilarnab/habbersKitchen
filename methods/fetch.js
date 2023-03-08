/* make a customized fetch request */

// import fetch

export default async function fetch_home(url, payload) {
    try {
        var response = await fetch(url, payload)

        if (response.status == 200) {
            return response
        }
        else {
            return response.status
        }

    }
    catch (err) {
        console.log(err)
    }
}
