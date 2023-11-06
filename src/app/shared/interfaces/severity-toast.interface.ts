import { Severity } from "../enums/severity-toast.enum";

export interface ToastBody {
  severity: Severity;
  summary: string;
  detail: string;
}
