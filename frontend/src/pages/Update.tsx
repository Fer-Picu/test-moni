// En Update.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FormConsulta } from "../components/FormConsulta";

export function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/Login');
      return;
    }
  });

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    axios.get(`http://localhost:8000/consultas/v1/consulta/${id}`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id, token]);

  function handleCancel(){
    navigate('/Home');
  }

  return (
    <div>
      <h2>Actualizar Consulta</h2>
      <div className="mt-4 flex items-center justify-end gap-x-4">
            <button
                onClick={handleCancel}
                className="rounded-md bg-sky-500/100 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500/100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-sky-500/100"
                >
                Volver
            </button>
        </div>
      {formData && <FormConsulta id={id} formData={formData} />}
      
      
    </div>
  );
};
