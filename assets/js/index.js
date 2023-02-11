document.addEventListener("DOMContentLoaded", () => {
    // aqui tendra TODO el codigo de mi aplicacion
    const saveBtn = document.getElementById("saveBtn");
    const changeThemeBtn = document.getElementById("changeThemeBtn");
    const inputName = document.getElementById("inputName");
    const inputPuesto = document.getElementById("inputPuesto");
    let tableBody = document.getElementById("tableBody");

    function loadData() {
        tableBody.innerHTML = `
            <tr id="noData">
                <td> No hay datos por el momento</td>
            </tr>
        `;

        console.log("Entro a load data.");
        // carge informacion por default de mi aplicacion
        const data = JSON.parse(localStorage.getItem("data")) || [];

        if(data.length){
            document.getElementById("noData").remove();
        }

        data.forEach((empleado, index) => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${empleado.name}</td>
            <td>${empleado.puesto}</td>
            <td class="text-center">
              <button type="button" class="btn btn-warning btn-edit" data-index="${index}">Editar</button>
              <button type="button" class="btn btn-danger btn-delete" data-index="${index}">Eliminar</button>
            </td>
          `;
            tableBody.appendChild(tr);
        });
    }

    const cleanForm = () => {
        inputName.value = "";
        inputPuesto.value = "";
    }

    saveBtn.addEventListener("click", () => {
        // Este es el evento del boton guardar
        const name = inputName.value;
        const puesto = inputPuesto.value;
        if(!name /** name === "" */){
            return;
        }
        console.log(name);
        console.log(puesto);
        let data = JSON.parse(localStorage.getItem("data")) || [];
        const index = saveBtn.getAttribute("data-index")
        console.log(index)
        if(index){
            data[index] = { name, puesto }
            saveBtn.removeAttribute("data-index") 
        } else {
            data.push({name, puesto});
        }
        localStorage.setItem("data", JSON.stringify(data));
        cleanForm();
        loadData();
    });

    tableBody.addEventListener("click", (e) => {
        console.log(e.target.classList)
        if(e.target.classList.contains('btn-edit')){
            const index = e.target.dataset.index;
            const data = JSON.parse(localStorage.getItem("data"))
            const item = data[index]; 
            inputName.value = item.name
            inputPuesto.value = item.puesto
            saveBtn.setAttribute("data-index", index)
            data.splice(index, 1, {...item})
        } else if (e.target.classList.contains('btn-delete')){
            const index = e.target.dataset.index;
            const data = JSON.parse(localStorage.getItem("data"))
            data.splice(index, 1)
            localStorage.setItem("data", JSON.stringify(data))
            loadData()
        }
    })
    loadData()
});