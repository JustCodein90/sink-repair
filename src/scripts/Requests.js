import { getRequests } from "./dataAccess.js";
import { getPlumbers } from "./dataAccess.js";
import { deleteRequest } from "./dataAccess.js";
import { sendCompletion } from "./dataAccess.js";


   
const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                 serviceRequestId: parseInt(requestId),
                plumberId: parseInt(plumberId),
                date_completed: Date.now()
            
            }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            sendCompletion(completion)
        }
    }
)

// Function converts request (parameter) array to HTML list items
const convertRequestToList = (request) => {
    const plumbers = getPlumbers()
    let html = `
        <div class="listParent"> 
            <li> 
                Description: ${request.description} 

                <select class="plumbers" id="plumbers">
                    <option value="">Choose</option>
                    ${plumbers.map(plumber => {
                         return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                            }
                        )    
                     .join("")
                    }
                </select>

                <button class="request__delete"
                    id="request--${request.id}"> 
                    Delete 
                </button>
            
            </li>
        </div>` 
           
    return html
}


 
export const Requests = () => {
    const requests = getRequests()
   

    let html= `
        <ul class="newRequest">
        ${
            requests.map(convertRequestToList).join("")
        }  
        </ul>`

    return html
}