let arrayProyectos = [];
    let arrayTask = [];

            function agregarProyecto() {
                const nombreInput = document.getElementById('nombreInput').value;
                var descripcionInput = document.getElementById('descripcionInput').value;
                if (nombreInput == null || nombreInput == "") {
                    return alert("No has ingresado el nombre del proyecto");
                }
                else {
                    if (descripcionInput == "") {
                        descripcionInput = "-   " }
                    var project = {
                        nombre: nombreInput,
                        descripcion: descripcionInput,
                        array: arrayTask
                    };
                    arrayProyectos.push(project);
                    crearTabla()
                    
                }
                

            }

            function crearTabla() {
                const tabla = document.getElementById('tablaProyectos');
                tabla.innerHTML = '';
            
                
                const tbl = document.createElement('table');
                const tblBody = document.createElement('tbody');
            
                
                arrayProyectos.forEach(proyecto => {
                    const row = document.createElement('tr'); 
                    
                    
                    const cell1 = document.createElement('td');
                    const cell2 = document.createElement('td');
                    const cell3 = document.createElement('td');
            
                    
                    const cellText1 = document.createTextNode(proyecto.nombre);
                    const cellText2 = document.createTextNode(proyecto.descripcion);
                    cell1.appendChild(cellText1);
                    cell2.appendChild(cellText2);
                    

                    

                    const button = document.createElement('button');
                     button.textContent = 'agregar tarea';

                     button.onclick = function() {

                        agregarTarea(proyecto);
                    };


             cell3.appendChild(button);

                    row.appendChild(cell1);
                    row.appendChild(cell2);
                    row.appendChild(cell3);
            
                   
                    tblBody.appendChild(row);
                });
            
               
                tbl.appendChild(tblBody);
                tabla.appendChild(tbl);
                tbl.setAttribute("border", "1");

            }
            
            function agregarTarea() {
                const descripcion = prompt("Ingresa la descripción de la tarea:");
                let vencimiento = prompt("Ingresa la fecha de vencimiento de la tarea (en formato YYYY-MM-DD):");


                if (descripcion == null || descripcion == "") {
                    return alert("No has ingresado el nombre de la tarea");
                }
                else {
                    if (vencimiento == "") {
                        vencimiento = "-" }

                    var tarea = {
                        descripcionT: descripcion,
                        vencimientoT: vencimiento,
                        estadoT: "pendiente"
                    };
                    arrayTask.push(tarea);
            }
        }


