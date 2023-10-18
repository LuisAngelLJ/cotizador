import { useState, useEffect } from "react"
import Header from "./components/Header"
import Button from "./components/button";
import { formatearDinero, calcularTotalPagar } from "./helpers";

function App() {
  // valor, función que va a modificar el state = valor inicial
  const [cantidad, setCantidad] = useState(10000);
  const [meses, setMeses] = useState(6);
  const [total, setTotal] = useState(0);
  const [pago, setPago] = useState(0);

  //actualizar siempre que la cantidad o los meses cambien
  useEffect(() => {
    const resultadoTotalPagar = calcularTotalPagar(cantidad, meses);
    setTotal(resultadoTotalPagar);
  }, [cantidad, meses]);

  // calcular el pago mensual, agrego el total al useEffect para que recargue la info
  useEffect(() => {
    setPago(total / meses);
  }, [total]);

  const min = 0,
  max = 20000,
  step = 100;
  
  const handleChange = (e) => {
    setCantidad(+e.target.value);
  }

  const handleClickDecremento = () => {
    const valor = cantidad - step;
    if(valor < min) {
      alert('Cantidad no valida');
      return;
    }
    setCantidad(valor);
  }

  const handleClickIncremento = () => {
    const valor = cantidad + step;
    if(valor > max) {
      alert('Cantidad no valida');
      return;
    }
    setCantidad(valor);
  }

  const handleMeses = (e) => {
    setMeses(+e.target.value);
  }

  return (
    <div className="my-20 max-w-lg mx-auto bg-white shadow p-20">
      <Header />

      <div className="flex justify-between my-6">
        <Button
          operador='-'
          fn={handleClickDecremento}
        />
        
        <Button
          operador='+'
          fn={handleClickIncremento}
        />
      </div>

      <input 
        type="range"
        className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600"
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        value={cantidad}
        name="" 
        id="" 
      />
      <p className="text-center my-10 text-5xl font-extrabold text-indigo-600">{formatearDinero(cantidad)}</p>

      <h2 className="text-2xl font-extrabold text-gray-500 text-center">
        Elije un <span className="text-indigo-600">Plazo </span> a pagar
      </h2>

      <select className="mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500" value={meses} onChange={handleMeses}>
        <option value="6">6 meses</option>
        <option value="12">12 meses</option>
        <option value="24">24 meses</option>
      </select>


      <div className="my-5 space-y-3 bg-gray-50 p-5">
        <h2 className="text-2xl font-extrabold text-gray-500 text-center">
          Resumen <span className="text-indigo-600">de pagos</span>
        </h2>

        <p className="text-xl text-gray-500 text-center font-bold">{meses} Meses</p>
        <p className="text-xl text-gray-500 text-center font-bold">{formatearDinero(total)} Total a pagar</p>
        <p className="text-xl text-gray-500 text-center font-bold">{formatearDinero(pago)} Mensuales</p>
      </div>
    </div>
  )
}

export default App
