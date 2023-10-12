const applicationState = {
    requests: []
}

export const getRequests = () => {
    return applicationState.requests.map(request => ({ ...request }))
}



const API = "http://localhost:8088"


export const fetchRequests = () => {   
    return fetch(`${API}/requests`)

        // Convert JSON string response to JavaScript data structure (object or array)   
        .then(response => response.json())
        .then(
            (serviceRequests) => {

                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}


export const sendRequest = (userServiceRequest) => {

    // Fetch the data from the API
    const fetchOptions = {

        // method: "POST"-- on any HTTP request means "create"
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }

    // Send the data to the API for permanent storage
    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {

        })
}