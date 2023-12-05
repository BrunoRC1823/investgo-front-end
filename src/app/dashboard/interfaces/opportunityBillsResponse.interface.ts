import { Bill, ListResponse, Opportunity } from './';

export interface OpportunityBillsResponse {
  oportunidad: Opportunity;
  facturas: ListResponse<Bill>;
}
