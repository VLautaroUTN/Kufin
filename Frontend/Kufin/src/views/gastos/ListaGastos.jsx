import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, MenuItem
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

// 1. Agregamos la nueva categoría a la lista de opciones
const categorias = ['Pendiente de clasificar', 'Alimentos', 'Servicios', 'Transporte', 'Ocio', 'Otros'];

const obtenerFechaActual = () => {
  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  return `${anio}-${mes}-${dia}`;
};

// 2. Le decimos al formulario que arranque con esa categoría seleccionada por defecto
const estadoInicialFormulario = { 
  fecha: obtenerFechaActual(), 
  monto: '', 
  descripcion: '', 
  categoria: 'Pendiente de clasificar' 
};

const ListaGastos = () => {
  const [openModal, setOpenModal] = useState(false);
  const [formulario, setFormulario] = useState(estadoInicialFormulario);
  const [gastos, setGastos] = useState([]);
  const [idEnEdicion, setIdEnEdicion] = useState(null);

  useEffect(() => {
    const cargarGastos = async () => {
      try {
        const respuesta = await axios.get('http://localhost:3000/gastos');
        setGastos(respuesta.data); 
      } catch (error) {
        console.error("Error al cargar los gastos:", error);
      }
    };
    cargarGastos();
  }, []);

  const handleAbrirModal = () => {
    setFormulario(estadoInicialFormulario);
    setIdEnEdicion(null);
    setOpenModal(true);
  };
  
  const handleAbrirEditar = (gasto) => {
    setFormulario({
      fecha: gasto.fecha,
      monto: gasto.monto,
      descripcion: gasto.descripcion,
      categoria: gasto.categoria
    });
    setIdEnEdicion(gasto.id);
    setOpenModal(true);
  };

  const handleCerrarModal = () => { 
    setOpenModal(false); 
    setFormulario(estadoInicialFormulario); 
    setIdEnEdicion(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleGuardar = async () => {
    try {

      const usuarioIdReal = localStorage.getItem('kufin_usuario_id');

      const datosParaEnviar = {
        ...formulario,
        monto: Number(formulario.monto), 
        usuarioId: usuarioIdReal || 'no-logueado'     
      };

      if (idEnEdicion) {
        const respuesta = await axios.patch(`http://localhost:3000/gastos/${idEnEdicion}`, datosParaEnviar);
        setGastos(gastos.map(g => g.id === idEnEdicion ? respuesta.data : g));
      } else {
        const respuesta = await axios.post('http://localhost:3000/gastos', datosParaEnviar);
        setGastos([...gastos, respuesta.data]);
      }
      
      handleCerrarModal();

    } catch (error) {
      const mensajeError = error.response?.data?.message || error.message;
      console.error("Error devuelto por NestJS:", mensajeError);
      alert(`No se pudo guardar el gasto. Error: ${JSON.stringify(mensajeError)}`);
    }
  };

  const handleBorrar = async (id) => {
    if (window.confirm("¿Estás seguro de que querés eliminar este gasto?")) {
      try {
        await axios.delete(`http://localhost:3000/gastos/${id}`);
        setGastos(gastos.filter(g => g.id !== id));
      } catch (error) {
        console.error("Error al borrar:", error);
        alert("Hubo un error al intentar borrar el gasto.");
      }
    }
  };

  return (
    <MainCard title="Mis Gastos" secondary={<Button variant="contained" color="primary" onClick={handleAbrirModal}>Nuevo Gasto</Button>}>
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Fecha</strong></TableCell>
              <TableCell><strong>Descripción</strong></TableCell>
              <TableCell><strong>Categoría</strong></TableCell>
              <TableCell align="right"><strong>Monto ($)</strong></TableCell>
              <TableCell align="center"><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gastos.map((gasto) => (
              <TableRow key={gasto.id}>
                <TableCell>{gasto.fecha}</TableCell>
                <TableCell>{gasto.descripcion}</TableCell>
                <TableCell>{gasto.categoria}</TableCell>
                <TableCell align="right">${Number(gasto.monto).toLocaleString('es-AR')}</TableCell>
                <TableCell align="center">
                  <Button size="small" color="secondary" onClick={() => handleAbrirEditar(gasto)}>Editar</Button>
                  <Button size="small" color="error" onClick={() => handleBorrar(gasto.id)}>Borrar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openModal} onClose={handleCerrarModal} fullWidth maxWidth="sm">
        <DialogTitle>{idEnEdicion ? 'Editar Gasto' : 'Registrar Nuevo Gasto'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type="date" label="Fecha" InputLabelProps={{ shrink: true }} name="fecha" value={formulario.fecha} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type="number" label="Monto ($)" placeholder="0.00" name="monto" value={formulario.monto} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Descripción" placeholder="Ej. Compra en Carrefour" name="descripcion" value={formulario.descripcion} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth select label="Categoría" name="categoria" value={formulario.categoria} onChange={handleChange}>
                {categorias.map((opcion) => ( <MenuItem key={opcion} value={opcion}>{opcion}</MenuItem> ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCerrarModal} color="error">Cancelar</Button>
          <Button variant="contained" color="primary" onClick={handleGuardar}>
            {idEnEdicion ? 'Actualizar' : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default ListaGastos;