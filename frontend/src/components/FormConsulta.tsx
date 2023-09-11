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
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
                <div className="sm:col-span-4">
                  <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-gray-900">
                    Nombre
                  </label>
                  <div className="mt-2">
                    <input
                      name="nombre"
                      placeholder="Nombre"
                      onChange={handleChange}
                      value={payload.nombre}
                      disabled={status === 'submitting'}
                      autoComplete="family-name"
                      id="nombre"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {error.nombre && <span>{error.nombre}</span>}
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label htmlFor="apellido" className="block text-sm font-medium leading-6 text-gray-900">
                    Apellido
                  </label>
                  <div className="mt-2">
                    <input
                      name="apellido"
                      placeholder="Apellido"
                      onChange={handleChange}
                      value={payload.apellido}
                      disabled={status === 'submitting'}
                      id="apellido"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {error.apellido && <span>{error.apellido}</span>}
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label htmlFor="dni" className="block text-sm font-medium leading-6 text-gray-900">
                    DNI
                  </label>
                  <div className="mt-2">               
                    <input
                      name="dni"
                      placeholder="DNI"
                      onChange={handleChange}
                      value={payload.dni}
                      disabled={status === 'submitting'}
                      id="dni"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {error.dni && <span>{error.dni}</span>}
                    </div>
                </div>
                <div className="sm:col-span-4">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email
                  </label>
                  <div className="mt-2">        
                    <input
                      name="email"
                      placeholder="Email"
                      onChange={handleChange}
                      value={payload.email}
                      disabled={status === 'submitting'}
                      id="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {error.email && <span>{error.email}</span>}
                    </div>
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="sexo" className="block text-sm font-medium leading-6 text-gray-900">
                    Sexo
                  </label>
                  <div className="mt-2">
                    <select name="sexo"
                        id="sexo"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        onChange={handleChange}
                        value={payload.sexo || "Hombre"}
                        disabled={status === 'submitting'}
                      >
                        <option value="Hombre">Hombre</option>
                        <option value="Mujer">Mujer</option>
                    </select>
                    {error.form && <span>{error.form}</span>}
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="submit" disabled={status === 'submitting'}
                    className="rounded-md bg-sky-500/100 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500/100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-sky-500/100"
                  >
                    Enviar
                  </button>
                </div>
              </div>
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
