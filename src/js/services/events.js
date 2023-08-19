import { baseUrl } from "../variables.js";

async function getEvents(userName) {
    const response = await fetch(`${baseUrl}/${userName}/events`);
    const events = await response.json();
    return events.filter(event => event.type === "CreateEvent" || event.type === "PushEvent").filter(event => event.payload.commits !== undefined).slice(0,10);
}

export { getEvents };