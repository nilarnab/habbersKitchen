/* make a customized fetch request */

// import fetch

export default async function fetch_home(url, payload) {
    console.log('at function', url, payload)
    try {
        var response = await fetch(url, payload)
        console.log('at function, status', response.status)

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
