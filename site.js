let arrayProyectos = [];

function agregarProyecto() {
  const nombreInput = document.getElementById('nombreInput').value;
  const descripcionInput = document.getElementById('descripcionInput').value || "-";
  
  if (!nombreInput.trim()) {
    return alert("No has ingresado el nombre del proyecto");
  }

  const proyecto = {
    nombre: nombreInput,
    descripcion: descripcionInput,
    tareas: []
  };

  arrayProyectos.push(proyecto);
  crearTablaProyectos();
}

function crearTablaProyectos() {
  const tablaProyectos = document.getElementById('tablaProyectos');
  tablaProyectos.innerHTML = '';

  arrayProyectos.forEach(proyecto => {
    const divProyecto = document.createElement('div');
    divProyecto.innerHTML = `
      <h3>${proyecto.nombre}</h3>
      <p>${proyecto.descripcion}</p>
      <button onclick="agregarTarea(${arrayProyectos.indexOf(proyecto)})">Agregar Tarea</button>
      <table border="1">
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Vencimiento</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody id="tablaTareas_${arrayProyectos.indexOf(proyecto)}"></tbody>
      </table>
    `;
    tablaProyectos.appendChild(divProyecto);
    crearTablaTareas(proyecto);
  });
}

function agregarTarea(indexProyecto) {
  const descripcion = prompt("Ingresa la descripción de la tarea:");
  const vencimiento = prompt("Ingresa la fecha de vencimiento de la tarea (en formato YYYY-MM-DD):") || "-";
  
  if (!descripcion.trim()) {
    return alert("No has ingresado la descripción de la tarea");
  }

  const tarea = {
    descripcion: descripcion,
    vencimiento: vencimiento,
    estado: "pendiente"
  };

  arrayProyectos[indexProyecto].tareas.push(tarea);
  crearTablaTareas(arrayProyectos[indexProyecto]);
}

function crearTablaTareas(proyecto) {
  const tablaTareas = document.getElementById(`tablaTareas_${arrayProyectos.indexOf(proyecto)}`);
  tablaTareas.innerHTML = '';

  proyecto.tareas.forEach(tarea => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${tarea.descripcion}</td>
      <td>${tarea.vencimiento}</td>
      <td>${tarea.estado}</td>
      <td>
        <button onclick="editarTarea(${arrayProyectos.indexOf(proyecto)}, ${proyecto.tareas.indexOf(tarea)})">Editar</button>
        <button onclick="eliminarTarea(${arrayProyectos.indexOf(proyecto)}, ${proyecto.tareas.indexOf(tarea)})">Eliminar</button>
      </td>
    `;
    tablaTareas.appendChild(row);
  });
}

function editarTarea(indexProyecto, indexTarea) {
  const completado = "Completado"
  arrayProyectos[indexProyecto].tareas[indexTarea].estado = completado;
  crearTablaTareas(arrayProyectos[indexProyecto]);
}

function eliminarTarea(indexProyecto, indexTarea) {
  arrayProyectos[indexProyecto].tareas.splice(indexTarea, 1);
  crearTablaTareas(arrayProyectos[indexProyecto]);
}
