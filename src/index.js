const exTitle = document.getElementById("exhibit-title");
const divImg = document.getElementById("exhibit-image");
const exDescr = document.getElementById("exhibit-description");
const divComent = document.getElementById("comments-section");
const divtickets = document.getElementById("tickets-bought");

const ticketBuy = document.getElementById("buy-tickets-button");

const formComm = document.getElementById("comment-form")

let commentarios = []




    fetch(`http://localhost:3000/current-exhibits`)
    .then(response => response.json())
    .then(data => {

        exTitle.textContent = data[0].title;
        divImg.src = data[0].image;     
        exDescr.textContent = data[0].description;
        divtickets.textContent  = `${data[0].tickets_bought}` +" Tickets Bought"

               

        data[0].comments.forEach(a => {
            const pdivcoment = document.createElement("p");
            pdivcoment.textContent = a
            divComent.appendChild(pdivcoment)
        })
    });

    ticketBuy.addEventListener("click", function() {

        let ticketscontecto = divtickets.textContent
        let currentticket = parseInt(ticketscontecto.slice(0, -15))
        currentticket = currentticket + 1

        divtickets.textContent  = `${currentticket}` +" Tickets Bought"

        let datanueva = {
            tickets_bought: currentticket
        }
        fetch(`http://localhost:3000/current-exhibits/1`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(datanueva)
        })
            .then(response => {
                location.reload()
        })
    })

    formComm.addEventListener('submit', event => {
        event.preventDefault();

        const newComment = document.getElementById("comment-input").value;

        const pdivcoment = document.createElement("p");
        pdivcoment.textContent = newComment;
        divComent.appendChild(pdivcoment);

        const elementos = divComent.querySelectorAll("p")
        const allcomments = []
        elementos.forEach(p => {
            allcomments.push(p.textContent);
          });

        let datanueva = {
            comments: allcomments
        }

        const paragraphElements = (document.getElementById("comments-section")).querySelectorAll('p');
    paragraphElements.forEach(paragraph => {
        paragraph.addEventListener('click', function() {
        // Elimina el elemento <p> al que se le hizo clic
        divComent.removeChild(paragraph);
        });
    });

        fetch(`http://localhost:3000/current-exhibits/1`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(datanueva)
        })
            .then(response => {
                location.reload()
        })
    });





    

