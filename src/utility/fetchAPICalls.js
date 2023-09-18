async function fetchGetRequest(endpoint){
    try{
        const responseData = await fetch(import.meta.env.VITE_SERVER_ADDRESS + endpoint, {
            credentials: 'include',
            method: 'GET',
            mode: 'cors',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('albedoAccessToken')},
        }).then(response => response.status === 200 && response.json()).catch(error => {throw error});
        if(!responseData) throw Error('Empty Response');
        if(responseData.token) localStorage.setItem('albedoAccessToken', responseData.token);
        return responseData.data;
    } catch( error ){
        throw error;
    }
}

async function fetchPostRequest(endpoint, bodyData){
    try{
        const responseData = await fetch(import.meta.env.VITE_SERVER_ADDRESS + endpoint, {
            credentials: 'include',
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('albedoAccessToken')},
            body: JSON.stringify(bodyData)
        }).then(response => response.status === 200 && response.json()).catch(error => {throw error});
        if(!responseData) throw Error('Empty Response');
        if(responseData.token) localStorage.setItem('albedoAccessToken', responseData.token);
        return responseData.data;
    } catch( error ){
        throw error;
    }
}

export { fetchGetRequest, fetchPostRequest };