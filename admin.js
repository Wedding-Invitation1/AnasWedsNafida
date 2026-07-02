import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    query,
    orderBy,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBfXmj_eToviOMbOzISZA8KfXb52vxbNsg",
    authDomain: "wedding-rsvp-54519.firebaseapp.com",
    projectId: "wedding-rsvp-54519",
    storageBucket: "wedding-rsvp-54519.firebasestorage.app",
    messagingSenderId: "708319765022",
    appId: "1:708319765022:web:1435c780e90275deebc40f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const PASSWORD = "1212";

async function loadRSVPs() {

    const snap = await getDocs(
        query(
            collection(db, "rsvps"),
            orderBy("timestamp", "desc")
        )
    );

    let html = "";

    let totalGuests = 0;
    let nikahGuests = 0;
    let receptionGuests = 0;

    snap.forEach(document => {

        const d = document.data();

        if (d.event === "Nikah") {
            nikahGuests += d.guests;
        } else {
            receptionGuests += d.guests;
        }

        totalGuests += d.guests;

        html += `
        <tr class="border-b border-yellow-900">

            <td class="p-4">${d.name}</td>

            <td>${d.event}</td>

            <td>${d.attendance}</td>

            <td>${d.guests}</td>

            <td class="text-center">

                <button
                    onclick="deleteRSVP('${document.id}')"
                    class="text-red-400 hover:text-red-600 text-xl">

                    🗑️

                </button>

            </td>

        </tr>
        `;
    });

    document.getElementById("tableBody").innerHTML = html;

    document.getElementById("stats").innerHTML = `

    <div class="bg-[#33060B] p-6 rounded-xl">

        <h2>Total RSVPs</h2>

        <p class="text-4xl">${snap.size}</p>

    </div>

    <div class="bg-[#33060B] p-6 rounded-xl">

        <h2>Total Guests</h2>

        <p class="text-4xl">${totalGuests}</p>

    </div>

    <div class="bg-[#33060B] p-6 rounded-xl">

        <h2>Nikah Guests</h2>

        <p class="text-4xl">${nikahGuests}</p>

    </div>

    <div class="bg-[#33060B] p-6 rounded-xl">

        <h2>Reception Guests</h2>

        <p class="text-4xl">${receptionGuests}</p>

    </div>

    `;
}

window.login = async function () {

    if (document.getElementById("password").value !== PASSWORD) {

        alert("Wrong Password");
        return;

    }

    document.getElementById("login").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");

    await loadRSVPs();

}

window.deleteRSVP = async function (id) {

    const ok = confirm("Delete this RSVP?");

    if (!ok) return;

    await deleteDoc(doc(db, "rsvps", id));

    await loadRSVPs();

}