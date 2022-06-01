document.querySelectorAll(".listing").forEach(e => {
    e.addEventListener("click", (e) => {

        const contact = e.currentTarget.querySelector(".contact-details");

        const visibility = contact.style.visibility

        contact.style.visibility = visibility === "" ? "visible" : ""
    
    })
})