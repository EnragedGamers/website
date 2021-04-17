/**
 * EnragedGamers - servers.js
 * @author Gabriel Santamaria <gabyfle@enragedgamers.net>
 */


/**
 * Launch an http request to get servers.json
 * @param {function}
 */
function getJson(setup) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            setup(this.responseText);
        }
    };
 
    xhttp.open("GET", "https://enragedgamers.net/servers.json", true);
    xhttp.send();
}

/**
 * Return a child with classname "name"
 */
function getChild(element, name) {
    return element.getElementsByClassName(name).item(0);
}

/**
 * Add everything nicely into the html dom
 * @param {string} id server0's id
 * @param {*} data server's data
 */
function addInfo(id, data) {
    let section = document.getElementById(id);

    if (data["status"] == 0) {
        for(info in data["infos"]) {
            if (info == "hostname") {
                data["infos"][info] = 'Offline';
                continue;
            }
            data["infos"][info] = "NA";
        }
    }

    let child = getChild(section, "server-players");
        child.innerHTML = data["infos"]["numplayers"] + ' / ' + data["infos"]["maxplayers"];

        child = getChild(section, "server-map");
        child.innerHTML = data["infos"]["map"];

        console.log(child);

        child = getChild(section, "server-name");
        child.innerHTML = data["infos"]["hostname"];

        child = getChild(section, "server-gamemode");
        child.innerHTML = data["infos"]["gamedesc"];

}

function drawData(server_json) {
    let data = JSON.parse(server_json);

    console.log(data);

    for(server in data) {
        addInfo(server, data[server]);
    }
}

getJson(drawData);
