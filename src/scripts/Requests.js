import { getRequests } from "./dataAccess.js";

// Function converts request (parameter) array to HTML list items
const convertRequestToList = (request) => {
    let html = `<li>Description: ${request.description}</li>
                <li>Address: ${request.address}</li>
                <li>Budget: ${request.budget}</li>
                <li>Needed By: ${request.neededBy}</li>`

    return html
}


 
export const Requests = () => {
    const requests = getRequests()
    
    let html= `
        <ul>
        ${
            requests.map(convertRequestToList).join("")
        }  
        </ul>`

    return html
}