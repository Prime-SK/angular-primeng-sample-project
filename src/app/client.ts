export interface Client {
  id?: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  bankBalance: number | null;
  outstandingLoan: number | null;
  clientType: "Individual" | "Business" | null;
  registrationDate: Date | null;
  isActive: boolean | null;
}
