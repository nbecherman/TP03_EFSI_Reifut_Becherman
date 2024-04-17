let arrayProyectos = [];

function agregarProyecto() {
  const nombreInput = document.getElementById('nombreInput').value;
  const descripcionInput = document.getElementById('descripcionInput').value || "-";
  
  if (!nombreInput.trim())//trim saca espacios vacios
   {
    return alert("No has ingresado el nombre del proyecto");
  }

  //hacemos el objeto
  const proyecto = {
    nombre: nombreInput,
    descripcion: descripcionInput,
    tareas: []//array de tareas
  };

  //ponemos el objeto en un array de objetos
  arrayProyectos.push(proyecto);
  crearTablaProyectos();
}

function crearTablaProyectos() {
  const tablaProyectos = document.getElementById('tablaProyectos');//id del html
  tablaProyectos.innerHTML = ''; //añadir html desde js(innerHTML)
  arrayProyectos.forEach(proyecto => { //foreach para obtener cada proyecto con su nombre, descripcion y tabla de tareas
    const divProyecto = document.createElement('div');//creamos un div para el proyecto
    divProyecto.innerHTML = `
      <h3>Nombre: ${proyecto.nombre}</h3>
      <p>Descripcion: ${proyecto.descripcion}</p>
      <input type="text" id="nombreTarea_${arrayProyectos.indexOf(proyecto)}"> 
      <input type="date" id="fechaTarea_${arrayProyectos.indexOf(proyecto)}"> 
      <button onclick="agregarTarea(${arrayProyectos.indexOf(proyecto)})">Agregar Tarea</button>
      
      <div class="acciones">
      <input type="date" id="fechaBusqueda${arrayProyectos.indexOf(proyecto)}"> 
      <button onclick="buscarTareasPorFecha(${arrayProyectos.indexOf(proyecto)})">Buscar Tareas</button>
  </div>

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
    tablaProyectos.appendChild(divProyecto); //insertamos todo el div que hicimos arriba en el id del html
    crearTablaTareas(proyecto);//existe el tdbody idtablatareas
  });
//anotaciones, indexOf lo usariamos para buscar la posicion en el array del objeto proyecto
}

function agregarTarea(indexProyecto) {
  const descripcion = document.getElementById(`nombreTarea_${indexProyecto}`).value;//lo recibimos todo de la funcion agregartarea
  const vencimiento = document.getElementById(`fechaTarea_${indexProyecto}`).value;

  if (!descripcion.trim()) { 
    return alert("No has ingresado la descripción de la tarea");
  }

  const tarea = {
    descripcion: descripcion,
    vencimiento: vencimiento,//opcional
    estado: "pendiente"//pasa a completado
  };

  arrayProyectos[indexProyecto].tareas.push(tarea);//pusheamos las tareas al arrayTareas del objeto proyecto
  crearTablaTareas(arrayProyectos[indexProyecto]);
}

function crearTablaTareas(proyecto) {
  const tablaTareas = document.getElementById(`tablaTareas_${arrayProyectos.indexOf(proyecto)}`);//usamos el parametro del indice
  tablaTareas.innerHTML = '';

  proyecto.tareas.forEach(tarea => {
    const row = document.createElement('tr');//insertamos todo en la tabla
    row.innerHTML = `
      <td>${tarea.descripcion}</td>
      <td>${tarea.vencimiento}</td>
      <td>${tarea.estado}</td>
      <td>
        <button onclick="editarTarea(${arrayProyectos.indexOf(proyecto)}, ${proyecto.tareas.indexOf(tarea)})">Editar</button>
        <button onclick="eliminarTarea(${arrayProyectos.indexOf(proyecto)}, ${proyecto.tareas.indexOf(tarea)})">Eliminar</button>
      </td>
    `;
    tablaTareas.appendChild(row);//insertamos en el id que hicimos antes, aparecen las nuevas funciones donde pasamos los indices de pr y ta
  });
}

function editarTarea(indexProyecto, indexTarea) {
  const completado = "Completado"
  arrayProyectos[indexProyecto].tareas[indexTarea].estado = completado;//pasamos indice de proyecto y tarea que esta dentro de su array
  crearTablaTareas(arrayProyectos[indexProyecto]);
}

function eliminarTarea(indexProyecto, indexTarea) {
  arrayProyectos[indexProyecto].tareas.splice(indexTarea, 1);
  crearTablaTareas(arrayProyectos[indexProyecto]);
}
function buscarTareasPorFecha(indexProyecto) {
  const fecha = document.getElementById(`fechaBusqueda${indexProyecto}`).value; //recibimos de un id y tenemos la fecha
  
  if (!fecha) {
    alert("Por favor, seleccione una fecha de vencimiento.");
    return;
  }

  const proyecto = arrayProyectos[indexProyecto];
  const tareasFiltradas = proyecto.tareas.filter(tarea => tarea.vencimiento === fecha); //filter
  
  if (tareasFiltradas.length === 0) {
    alert(`No se encontraron tareas con fecha de vencimiento ${fecha} para el proyecto ${proyecto.nombre}`);
    return;
  }

  let mensaje = `Tareas con fecha de vencimiento ${fecha} para el proyecto ${proyecto.nombre}:\n\n`;
  tareasFiltradas.forEach(tarea => {
    mensaje += `Descripción: ${tarea.descripcion}, Vencimiento: ${tarea.vencimiento}, Estado: ${tarea.estado}\n`;
  });

  alert(mensaje);
}

