export interface InventoryItem {
  id: number;
  name: string;
  type: string;
  serialNumber: string;
  barcode?: string;
  location: string;
  status: string;
}

export interface User {
  id: number;
  username: string;
  is_admin: boolean;
  token: string;
}