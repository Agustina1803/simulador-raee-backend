import { congruencialMixto } from "../utils/random.js";
import Simulacion from "../models/simulacion.js";

export async function ejecutarSimulacion(CT, CM, meses, aleatoria = false) {
  const rand = congruencialMixto(Date.now());

  function poisson(lambda) {
    let b = Math.exp(-lambda);
    let x = 0;
    let p = 1;
    do {
      p = p * rand();
      x = x + 1;
    } while (p > b);
    return x - 1;
  }

  if (!aleatoria) {
    if (CT === null || CT === undefined ||
      CM === null || CM === undefined ||
      meses === null || meses === undefined) {
      throw new Error("Debes completar todos los parámetros para iniciar la simulación manual.");
    }
  }

  if (aleatoria) {

    if (!CT || CT <= 0) {
      CT = poisson(500);
    }
    if (!CM || CM <= 0) {
      CM = poisson(300);
    }
    if (!meses || meses < 1) {
      meses = Math.floor(rand() * 12) + 1;
    }
  }

  let resultados = {
    totalProcesados: 0,
    tecladosTratados: 0,
    totalTiempoProcesamiento: 0,
    mousesTratados: 0,
    reutilizados: 0,
    desmantelados: 0,
    cantidadDeResiduosDescartados: 0,
    porcentajeReutilizacion: 0,
    cantidadTotaldeMaterialesRecuperados: 0,
    detalleMateriales: { metales: 0, plasticos: 0, otros: 0 },
  };

  for (let mes = 1; mes <= meses; mes++) {
    const NPR = CT + CM;

    let CTR = 0, CTD = 0, CMR = 0, CMD = 0, TMP = 0, TP, CRD, CTMR, CMER, CMPL;

    for (let i = 0; i < CT; i++) {
      TP = 3 + 2 * rand();
      if (rand() < 0.25) {
        CTR++;
      } else {
        CTD = CTD + 1;
        TMP = TMP + TP;
      }
    }

    for (let i = 0; i < CM; i++) {
      TP = 3 + 2 * rand();
      if (rand() < 0.15) {
        CMR++;
      } else {
        CMD = CMD + 1;
        TMP = TMP + TP;
      }
    }

    CRD = (CTD * 0.5) + (CMD * 0.25);
    CMER = 0.5 * CRD;
    CMPL = 0.25 * CRD;
    CTMR = CMER + CMPL;


    resultados.totalProcesados += NPR;
    resultados.mousesTratados += CM;
    resultados.tecladosTratados += CT;
    resultados.reutilizados += CTR + CMR;
    resultados.desmantelados += CTD + CMD;
    resultados.cantidadTotaldeMaterialesRecuperados += CTMR;
    resultados.cantidadDeResiduosDescartados += CRD;
    resultados.totalTiempoProcesamiento += TMP;
    resultados.detalleMateriales.metales += CMER;
    resultados.detalleMateriales.plasticos += CMPL;
    resultados.detalleMateriales.otros += 0.25 * CRD;
  }

  resultados.detalleMateriales.metales = Number(resultados.detalleMateriales.metales.toFixed(2));
  resultados.detalleMateriales.plasticos = Number(resultados.detalleMateriales.plasticos.toFixed(2));
  resultados.detalleMateriales.otros = Number(resultados.detalleMateriales.otros.toFixed(2));
  resultados.cantidadTotaldeMaterialesRecuperados = Number(resultados.cantidadTotaldeMaterialesRecuperados.toFixed(2));
  resultados.cantidadDeResiduosDescartados = Number(resultados.cantidadDeResiduosDescartados.toFixed(2));
  resultados.totalTiempoProcesamiento = Number(resultados.totalTiempoProcesamiento.toFixed(2));


  resultados.porcentajeReutilizacion = (
    (resultados.reutilizados / resultados.totalProcesados) * 100
  ).toFixed(2);

  if (resultados.porcentajeReutilizacion > 20) {
    resultados.informe1 =
      "El porcentaje de reutilización supera el 20%. La empresa puede disminuir el desmantelamiento y optimizar recursos.";
  } else {
    resultados.informe1 =
      "El porcentaje de reutilización es bajo. Se deben reforzar procesos de reciclaje y recuperación.";
  }


  let tasaReciclaje = "0.00";
  if (resultados.cantidadTotaldeMaterialesRecuperados > 0) {
    tasaReciclaje = (
      (resultados.desmantelados / resultados.cantidadTotaldeMaterialesRecuperados) * 100
    ).toFixed(2);
  }

  resultados.tasaReciclaje = tasaReciclaje;

  if (tasaReciclaje > 75) {
    resultados.informe2 =
      "La tasa de reciclaje supera el 75%. El sistema es eficiente y se reducen los residuos descartados.";
  } else {
    resultados.informe2 =
      "La tasa de reciclaje es baja. Aumentan los desechos finales y disminuye la recuperación de materiales.";
  }

  const simulacion = new Simulacion({
    teclados: CT,
    mouses: CM,
    meses,
    reutilizados: resultados.reutilizados,
    desmantelados: resultados.desmantelados,
    materialesRecuperados: resultados.cantidadTotaldeMaterialesRecuperados,
    porcentajeReutilizacion: resultados.porcentajeReutilizacion,
    detalleMateriales: resultados.detalleMateriales,
    informe1: resultados.informe1,
    informe2: resultados.informe2,
    tasaReciclaje: resultados.tasaReciclaje,
    totalTiempoProcesamiento: resultados.totalTiempoProcesamiento,
    cantidadDeResiduosDescartados: resultados.cantidadDeResiduosDescartados,
    esAleatoria: aleatoria,
  });

  await simulacion.save();

  return resultados;
}
