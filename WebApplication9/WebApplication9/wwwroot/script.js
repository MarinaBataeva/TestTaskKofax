
async function getProc() {

    const response = await fetch("/api/proc", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const procs = await response.json();
        const rows = document.querySelector("tbody");
        procs.forEach(proc => rows.append(row(proc)));
    }
}

async function deleteProc(id) {
    const response = await fetch(`/api/proc/${id}`, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const proc = await response.json();
        document.querySelector(`tr[data-rowid='${proc.id}']`).remove();
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}

function row(proc) {

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", proc.id);

    const idTd = document.createElement("td");
    idTd.append(proc.id);
    tr.append(idTd);

    const processName = document.createElement("td");
    processName.append(proc.processName);
    tr.append(processName)

    const basePriority = document.createElement("td");
    basePriority.append(proc.basePriority);
    tr.append(basePriority);

    const linksTd = document.createElement("td");

    const removeLink = document.createElement("button");
    removeLink.append("Delete");
    removeLink.addEventListener("click", async () => await deleteProc(proc.id));
    linksTd.append(removeLink);

    tr.appendChild(linksTd);
    return tr;
}
getProc();