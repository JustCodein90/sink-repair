import { getRequests } from "./dataAccess.js";
import { deleteRequest } from "./dataAccess.js";

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

// Function converts request (parameter) array to HTML list items
const convertRequestToList = (request) => {
    let html = `
        <div class="listParent"> 
            <li> 
                Description: ${request.description} 
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