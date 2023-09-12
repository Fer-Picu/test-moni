import { useState } from "react";
import { toast } from 'react-hot-toast';
import axios from 'axios';

export function FormConsulta ({ id='', formData = {sexo: "Hombre"} }) {
    const [payload, updatePayload] = useState({
      ...formData
    });
    const [error, setError] = useState({});
    const [status, setStatus] = useState('typing');
    const token = localStorage.getItem('token');
    async function handleSubmit(e) {
      e.preventDefault();
      setStatus('submitting');
      try {
        if (id) {
          const response = await submitFormUpdate(id, payload);
          if (response) {
            setStatus('success');
            setError({});
            toast.success('Actualizado');
          }
        } else {
          const response = await submitForm(payload);
          if (response && response.aproved) {
            setStatus('success');
            updatePayload({nombre: '', apellido: '', dni: '', email: '', sexo: 'Hombre'});
            setError({});
            toast.success('Tiene autorizado pedir el préstamo');
          } else if (response && !!response.aproved) {
            setStatus('error');
            setError(prevError => ({ ...prevError, form: 'No está autorizado para pedir el préstamo' }));
            updatePayload({nombre: '', apellido: '', dni: '', email: '', sexo: 'Hombre'});
            toast.error('No está autorizado para pedir el préstamo');

          }else {
            setStatus('error');
            setError(prevError => ({ ...prevError, form: 'Todos los campos son obligatorios' }));
            updatePayload({nombre: '', apellido: '', dni: '', email: '', sexo: 'Hombre'});
            toast.error('Algo salio mal');
          }
        }
    
      } catch (err) {
        setStatus('error');
        setError(prevError => ({ ...prevError, form: 'Algo salió mal' }));
        toast.error('Algo malió sal');
      }
    }

    function handleChange(e) {
      const { name, value } = e.target;
      updatePayload(prevState => ({
        ...prevState,
        [name]: value
      }));
      setError(prevError => ({ ...prevError, [name]: '' }));
    }

    return (
        <>
            <h2 className="text-base leading-7 text-gray-900">Ingresa los datos!</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-4 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input onChange={handleChange} value={payload.nombre} disabled={status === 'submitting'} type="text" name="nombre" id="nombre" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="apellido" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input onChange={handleChange} type="text" name="apellido" id="apellido" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="apellido" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Apellido</label>
                    </div>
                </div>
                <div className="grid md:grid-cols-4 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input onChange={handleChange} value={payload.dni} disabled={status === 'submitting'} type="number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="dni" id="dni" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="dni" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">DNI</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input onChange={handleChange} value={payload.email} disabled={status === 'submitting'} type="" type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                       <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                    </div>
                </div>
                <div className="grid md:grid-cols-4 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sexo</label>
                            <select onChange={handleChange} value={payload.sexo || "Hombre"} disabled={status === 'submitting'} id="sexo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option>Mujer</option>
                            <option>Hombre</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar</button>
            </form>
        </>
    );

    async function submitForm(payload) {
      return axios.post('http://localhost:8000/consultas/v1/consultas/', payload)
        .then(response => {
          return response.data;
        })
        .catch(error => {
          return null;
        });
    }    
    async function submitFormUpdate(id, payload) {
      return axios.put('http://localhost:8000/consultas/v1/consulta/'+id+'/', payload)
        .then(response => {
          return response.data;
        })
        .catch(error => {
          return null;
        });
    }    
}
