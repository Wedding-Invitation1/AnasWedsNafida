let selectedEvent = "";

window.openRSVP = function(event) {

    selectedEvent = event;

    document.getElementById("rsvpTitle").innerHTML =
        "RSVP for " + event;

    document.getElementById("rsvpModal").classList.remove("hidden");
    document.getElementById("rsvpModal").classList.add("flex");

}

window.closeRSVP = function() {

    document.getElementById("rsvpModal").classList.remove("flex");
    document.getElementById("rsvpModal").classList.add("hidden");

}

document.getElementById("rsvpForm").addEventListener("submit", async function(e){

    e.preventDefault();
    const attendance = document.getElementById("attendance").value;

    const submitBtn = document.getElementById("submitBtn");

    submitBtn.innerHTML = "Submitting...";
    submitBtn.disabled = true;

    try{

        await window.fb.addDoc(

            window.fb.collection(window.db,"rsvps"),

            {

                event: selectedEvent,

                name: document.getElementById("guestName").value,

                attendance: document.getElementById("attendance").value,

                guests: Number(document.getElementById("guests").value),

                timestamp: window.fb.serverTimestamp()

            }

        );

        document.getElementById("rsvpForm").reset();

closeRSVP();

document.getElementById("thankYouModal").classList.remove("hidden");
document.getElementById("thankYouModal").classList.add("flex");

if(attendance==="Yes"){

document.getElementById("thankMessage").innerHTML=

`We are delighted that you have confirmed your attendance for the <b>${selectedEvent}</b>.<br><br>We look forward to celebrating together. ✨`;

}else{

document.getElementById("thankMessage").innerHTML=

`Thank you for letting us know.<br><br>Although we'll miss your presence, your prayers and blessings mean the world to us. 🤍`;

}

    }

    catch(err){

        console.error(err);

        alert("Something went wrong.");

    }

    submitBtn.innerHTML="Confirm Attendance";

    submitBtn.disabled=false;

});

window.closeThankYou=function(){

document.getElementById("thankYouModal").classList.remove("flex");

document.getElementById("thankYouModal").classList.add("hidden");

}

document.getElementById("attendance").addEventListener("change", function () {

    const guests = document.getElementById("guests");

    if (this.value === "No") {
        guests.value = "";
        guests.disabled = true;
        guests.required = false;
        guests.placeholder = "Not applicable";
    } else {
        guests.disabled = false;
        guests.required = true;
        guests.placeholder = "Number of Guests";
        guests.value = "1";
    }

});