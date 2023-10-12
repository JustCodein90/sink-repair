const applicationState = {
    requests: []
}

const API = "http://localhost:8088"

const mainContainer = document.querySelector("#container")


export const getRequests = () => {
    return applicationState.requests.map(request => ({ ...request }))
}


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
           mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}



// Function initiate the fetch request to delete a request must have primary key sent to it as and argument
export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}