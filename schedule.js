const schedule = document.getElementById("schedule");
const friendToggles = document.getElementById("friend-toggles");

// Data: Example time sheets for friends
const friends = [
    { name: "Jonas", color: "green", schedule: [{day:0,start:13,end:14},{day:0,start:17,end:18},{day:1,start:13,end:18},{day:2,start:13,end:14},{day:3,start:14,end:18},{day:4,start:13,end:14}] },
    { name: "Leo", color: "blue", schedule: [{ day: 1, start: 10, end: 15 }] },
    { name: "Charlie", color: "red", schedule: [{ day: 2, start: 9, end: 17 }] },
    { name: "Diana", color: "purple", schedule: [{ day: 3, start: 13, end: 18 }] },
    { name: "Eve", color: "orange", schedule: [{ day: 4, start: 8, end: 20 }] },
];

// Render the schedule grid
function renderSchedule() {
    schedule.innerHTML = "";

    // Add time column
    const timeColumn = document.createElement("div");
    timeColumn.className = "time-column";
    for (let i = 8; i <= 21; i++) {
        const timeSlot = document.createElement("div");
        timeSlot.className = "time-slot";
        timeSlot.textContent = `${i}:00`;
        timeColumn.appendChild(timeSlot);
    }
    schedule.appendChild(timeColumn);

    // Add schedule columns for days
    for (let i = 0; i < 5; i++) {
        const dayColumn = document.createElement("div");
        dayColumn.className = "schedule-day";
        for (let j = 8; j <= 21; j++) {
            const slot = document.createElement("div");
            slot.className = "schedule-slot empty";
            slot.dataset.day = i;
            slot.dataset.hour = j;
            dayColumn.appendChild(slot);
        }
        schedule.appendChild(dayColumn);
    }
}

// Update schedule based on friend toggles
function updateSchedule() {
    renderSchedule();
    const activeFriends = friends.filter(friend =>
        document.getElementById(`toggle-${friend.name}`).checked
    );

    activeFriends.forEach(friend => {
        friend.schedule.forEach(event => {
            for (let i = event.start; i < event.end; i++) {
                const slot = document.querySelector(
                    `.schedule-slot[data-day="${event.day}"][data-hour="${i}"]`
                );
                if (slot) {
                    slot.className = "schedule-slot";
                    slot.style.backgroundColor = friend.color;
                    slot.textContent = friend.name;
                }
            }
        });
    });
}

// Create friend toggles
function createToggles() {
    friends.forEach(friend => {
        const toggle = document.createElement("input");
        toggle.type = "checkbox";
        toggle.id = `toggle-${friend.name}`;
        toggle.checked = true;

        const label = document.createElement("label");
        label.textContent = friend.name;
        label.htmlFor = `toggle-${friend.name}`;

        const container = document.createElement("div");
        container.appendChild(toggle);
        container.appendChild(label);
        friendToggles.appendChild(container);

        toggle.addEventListener("change", updateSchedule);
    });
}

createToggles();
renderSchedule();
updateSchedule();
