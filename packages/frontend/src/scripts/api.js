export async function api({method = 'GET', path, query}) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
        searchParams.append(key, value);
    }
    const queryString = searchParams.toString();
    const url = `/api${path}${(queryString === '' ? '' : `?${queryString}`)}`;

    const response = await fetch(url, {
        method,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    });
    const data = await response.json();

    return {response, data};
}
