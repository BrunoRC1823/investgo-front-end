import { Bill } from "src/app/dashboard/interfaces/bill.interface";

export interface ConfirmResponse{
    mensaje: string;
    listaFacturas?: Bill[];
}