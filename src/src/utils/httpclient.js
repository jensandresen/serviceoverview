import 'whatwg-fetch';

export default class HttpClient {
    get(url, callback) {
        fetch(url)
            .then(response => response.json())
            .then(json => callback(null, json))
            .catch(err => callback(err, null));
    }

    post(url, data, callback) {
        fetch(url, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    callback(null);
                } else {
                    throw new Error(`${response.status} - ${response.statusText}`);
                }
            })
            .catch(err => callback(err));
    }
}