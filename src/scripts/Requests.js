import { getRequests } from "./dataAccess.js";
import { getPlumbers } from "./dataAccess.js";
import { deleteRequest } from "./dataAccess.js";
import { saveCompletion } from "./dataAccess.js";

const plumbers = getPlumbers()

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
                requestId,
                plumberId
            }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            saveCompletion(completion)
        }
    }
)

// Function converts request (parameter) array to HTML list items
const convertRequestToList = (request) => {
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
            
          // OTHER VALUES AVAILABLE IN THE REQUEST OBJECT///////
          //ONLY NEED ONE BUTTON TO DELETE  WHOLE REQUEST////////

            // <li> Address: ${request.address} </li>           
            // <li> Budget: ${request.budget} </li>                                     
                    
            // <li>
            //     Needed By: ${request.neededBy} 
            //     <button class="request__delete"
            //         id="request--${request.id}"> 
            //         Delete 
            //     </button>
            // </li>         
              
                  

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