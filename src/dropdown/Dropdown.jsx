import React,{useEffect, useState} from 'react';
import {  collection, getDocs , addDoc, limit, query, where, startAfter } from "firebase/firestore";

import './Drodown.css';

 function Dropdown({db}) {
  
  const [select, setSelect]=useState('name')
  const [lastPage, setLastPage]=useState('')
  const [companies, setCompanies]=useState([]);
  const [inputValue, setInputValue]=useState('');
  const [name, setName]=useState('');
  const [businessName, setBusinessName]=useState('');
  const [phone, setPhone]=useState('');
  const [nit, setNit]=useState('');
  const [code, setCode]=useState('');
  const [focus, setFocus]=useState(false);

  // sera llamada cuando se haga scroll
  const getlastPage = async()=>{
    const q = query(collection(db, "Companies"), startAfter(lastPage),limit(3));
    const data = await getDocs(q)
    const lastVisible = data.docs[data.docs.length-1];
    const array=[]
    data.forEach((company)=> array.push( company.data()))
    setCompanies([...companies,...array])
    setLastPage(lastVisible)

  }
  //sera llamada cuando cambie el input 

  const getDataBy= async()=>{
    const q = query(collection(db, "Companies"), where(select,"==", inputValue));
    const data = await getDocs(q)
    const lastVisible = data.docs[data.docs.length-1];
    setLastPage(lastVisible)

    const array=[]
    data.forEach((company)=> array.push( company.data()))
    setCompanies(array)
  }

  
  // sera llamada cuando se guarde un nuevo registro

  const handleSave= async()=>{
    if(name!=='' && code!=='' && nit!=='' && phone!=='' && businessName!==''){
      try {
        await addDoc(collection(db, "Companies"),{
          name: name,
          businessName: businessName,
          phone:phone,
          nit:nit,
          code:code
        });
        setName('')
        setBusinessName('')
        setNit('')
        setPhone('')
        setCode('')
        getDataAll()
      } catch (e) {console.error("Error adding document: ", e); }
      
    }else alert("Debe completar todos los campos")
  }

  // se llamara cuando se monte el componente , paginas de de 3 en 3 por no tener registros
  const getDataAll= async()=>{
    const q =query(collection(db, "Companies"),limit(3));
    const data = await getDocs(q)
    const lastVisible = data.docs[data.docs.length-1];
    setLastPage(lastVisible)
    
    const array=[]
    data.forEach((company)=> array.push( company.data()))
    setCompanies(array)
  }
        
  useEffect(() => {
    // window.addEventListener('scroll',()=>{
    //   let position = list.getBoundingClientRect().top
    //   console.log(position)
      
    // })
    if(inputValue===""){
      getDataAll()  
    } else getDataBy()
    
  }, [inputValue, select]);
  
  

  return( 
    
    <div className=" container mt-5 text-center">
     
      {/* input buscador */}
      <input 
        className="btn btn-outline-secondary"
        type='text' 
        placeholder=" buscar" 
        Value={inputValue}  
        onClick={()=>setFocus(!focus)} 
        onChange={(e)=>setInputValue(e.target.value)}
      />

      {/* selector de atributos  */}
      <select  className='btn btn-outline-secondary' onChange={(e)=>setSelect(e.target.value)} >
        <option Value="name" selected>Nombre</option>
        <option Value="businessName">Razon social</option>
        <option Value="phone ">Teléfono</option>
        <option Value="nit">NIT</option>
        <option Value="code">Codigo</option>
      </select>
      {/* boton llama a la funcion que tendria que llamar por scroll */}

      {focus&&(
        <button className="btn btn-outline-secondary"onClick={getlastPage}>función del scroll</button>
      )}

        
      {/* lista con datos de firebase */}
      {focus &&(
        <>
        <div className="d-grid gap-2">
          <button 
            type="button" 
            className="btn btn-lg btn btn-outline-secondary" 
            data-bs-toggle="modal" 
            data-bs-target="#staticBackdrop">
            Carga tus datos aquí
          </button>
        </div>
        <table className="table  mx-auto">
          <thead>
            <tr>
              <th scope="col"> #</th>
              <th scope="col">Name</th>
              <th scope="col">Razon Social</th>
              <th scope="col">NIT</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Codigo</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index)=>(
              <tr>
                <th key={index} scope="row">{index}</th>
                  <td>{company.name}</td>
                  <td>{company.businessName}</td>
                  <td>{company.nit}</td>
                  <td>{company.phone}</td>
                  <td>{company.code}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </>
      )}

      {/* modal para cargar registro */}


      <div 
        className="modal fade" 
        id="staticBackdrop" 
        data-bs-backdrop="static" 
        data-bs-keyboard="false" 
        tabindex="-1" 
        aria-labelledby="staticBackdropLabel" 
        aria-hidden="true">

        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Nuevo dato</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-1">
                <span className="input-group-text">Name</span>
                <input type="text" aria-label="First name" className="form-control"  Value={name} onChange={(e)=>setName(e.target.value)}/>
              </div>
              <div className="input-group mb-1">
                <span className="input-group-text">Razón Social</span>
                <input type="text" aria-label="First name" className="form-control" Value={businessName} onChange={(e)=>setBusinessName(e.target.value)}/> 
              </div>  
              <div className="input-group mb-1">
                <span className="input-group-text">Nit</span>
                <input type="text" aria-label="First name" className="form-control"Value={nit}  onChange={(e)=>setNit(e.target.value)}/>
              </div>
              <div className="input-group mb-1">
                <span className="input-group-text">Telefono</span>
                <input type="phone" aria-label="First name" className="form-control" Value={phone} onChange={(e)=>setPhone(e.target.value)}/>
              </div>
              <div className="input-group mb-1">
                <span className="input-group-text">Codigo</span>
                <input type="text" aria-label="First name" className="form-control" Value={code} onChange={(e)=>setCode(e.target.value)}/>
              </div>
            </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" className="btn btn-primary"  data-bs-dismiss="modal" onClick={handleSave}>Guardar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

export default Dropdown;

