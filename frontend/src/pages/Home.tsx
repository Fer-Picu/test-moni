import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Home.css'

export function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [updateTrigger, setUpdateTrigger] = useState(0);

  useEffect(() => {
    if (!token) {
      navigate('/Login');
      return;
    }

    

  axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    
  axios.get('http://localhost:8000/consultas/v1/consultas/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [token, updateTrigger]);

  
  function handleDelete(id) {
    axios.delete('http://localhost:8000/consultas/v1/consulta/'+id)
        .then(response =>{
            toast.success('El registro ' + id + ' se ha eliminado correctamente');
            setUpdateTrigger(prev => prev + 1);
        })
        .catch(error =>{
            toast.error('Hubo un error al intentar eliminar el registro ' + id);
        })
  }

  function handleUpdate(id) {
    navigate(`/Update/${id}`); 
  }

  return (
    <div >
      <h1 className="text-3xl font-bold underline">Home</h1>
      <table className="businessTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Email</th>
            <th>Sexo</th>
            <th>Aprobado</th>
            <th>Descripción</th>
            <th>Fecha de Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>{item.apellido}</td>
              <td>{item.dni}</td>
              <td>{item.email}</td>
              <td>{item.sexo}</td>
              <td>{item.aproved ? "Sí" : "No"}</td>
              <td>{item.description}</td>
              <td>{new Date(item.created).toLocaleString()}</td>
              <td>
                <button className="btn"  onClick={() => handleUpdate(item.id)} ><FontAwesomeIcon icon={faEdit} /> Edit</button>
                <button className="btn"  onClick={() => handleDelete(item.id)} ><FontAwesomeIcon icon={faTrash} /> Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


