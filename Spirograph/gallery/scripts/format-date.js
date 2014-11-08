var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function formatDate(unixTimestamp) {
    var date = new Date(unixTimestamp * 1000);
    var output = [];
    output.push(monthNames[date.getMonth()])
    output.push(date.getDate() + ',');
    var hours = date.getHours() % 12;
    hours = hours === 0 ? 12 : hours;
    var minutes = (date.getMinutes());
    minutes = minutes < 10 ? '0' + minutes : minutes;
    output.push(hours + ':' + minutes);
    output.push(date.getHours() < 12 ? "AM" : "PM")
    return output.join(' ');
}