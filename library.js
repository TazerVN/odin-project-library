const display = document.querySelector(".display")
const dialog = document.querySelector("dialog")
const submitButton = document.querySelector("#submit")
const myLibrary = [];



function Book(title,author,pages,readState){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readState = readState;
}

function addBookToLibrary(title, author, pages, readState){
    const newBook = new Book(title, author, pages, readState);
    myLibrary.push(newBook);
    console.table(newBook)
}

function displayLibrary(){
    if(display.hasChildNodes()){
        while(display.lastElementChild){
            display.removeChild(display.lastElementChild);
        }
    }
    myLibrary.forEach((book) => {
        const bookCard = document.createElement("div")
        bookCard.classList.add("card")
        for(const prop in book){
                const displayProp = document.createElement("p")
                if(prop === "readState" & book[prop] === true){
                    displayProp.textContent = "COMPLETED"
                    displayProp.classList.add("readState")
                    let isRead = true
                    displayProp.addEventListener("click",()=>{
                        if(isRead === true){
                            isRead = false;
                            displayProp.textContent = "NOT COMPLETED";
                            book.readState = false;
                            console.table(book);
                        }
                        else{
                            isRead = true;
                            displayProp.textContent = "COMPLETED";
                            book.readState = true;
                            console.table(book);
                        }
                    })
                }
                else if(prop === "readState" & book[prop] === false){
                    displayProp.textContent = "NOT COMPLETED"
                    displayProp.classList.add("readState")
                    let isRead = false
                    displayProp.addEventListener("click",()=>{
                        if(isRead === false){
                            isRead = true;
                            displayProp.textContent = "COMPLETED";
                        }
                        else{
                            isRead = false;
                            displayProp.textContent = "NOT COMPLETED"
                        }
                    })
                }
                else{
                    displayProp.textContent = book[prop]
                }
                
                bookCard.appendChild(displayProp)
        }
        const removeButton = document.createElement("button")
        removeButton.textContent = "REMOVE"
        removeButton.addEventListener("click", (e)=>{
            removeItemfromLibrary(bookCard, myLibrary.indexOf(book))
        })
        bookCard.appendChild(removeButton)
        display.appendChild(bookCard)

    })      
}

function removeItemfromLibrary(removeItem, indexRemoveItem){
    removeItem.remove()
    myLibrary.splice(indexRemoveItem, 1)
    console.table(myLibrary)
}

function prompt(){
    dialog.showModal()
}

function submit(){
    const submittedTitle = document.querySelector("#title").value;
    const submittedAuthor = document.querySelector("#author").value;
    const submittedPages = document.querySelector("#pages").value;
    const completedState = function()
    {return document.querySelector("#completed").checked === true ? true : false};
    addBookToLibrary(submittedTitle,submittedAuthor,submittedPages,completedState());
    displayLibrary();
    dialog.close()
    submittedTitle = "";
    submittedAuthor = "";
    submittedPages = "";

}


function closeDialog(){
    dialog.close()
}

submitButton.addEventListener("click",(event)=>{
    event.preventDefault();
    submit()
})


addBookToLibrary("How to Train Your Dragon", "Cressida Cowell", "NA", true);
addBookToLibrary("A Game of Thrones", "George R. R. Martin", 694, false);
displayLibrary();