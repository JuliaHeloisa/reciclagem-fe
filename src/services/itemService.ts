// src/services/itemService.ts
import api from './api';

export async function registerRecyclingItem(data: {
  material: string;
  quantity: string;
  unit: string;
  date: string;
  recyclingLocationId: string;
}) {
  return api.post('/recycling-items', {
    material: data.material,
    quantity: Number(data.quantity),
    unit: data.unit,
    date: data.date,
    recyclingLocationId: data.recyclingLocationId,
  });
}

interface RecyclingItem {
  id: string;
  material: string;
  quantity: number;
  unit: string;
  date: string;
  location: {
    name: string;
    address: string;
  };
}

export async function getMyItems() {
  try {
    const response = await api.get("/recycling-items/common/items");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar itens do usuário:", error);
    return [];
  }
}


export async function getItemsFromMyLocations(): Promise<RecyclingItem[]> {
  try {
    const response = await api.get<RecyclingItem[]>('recycling-items/owner/items');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar itens reciclados dos seus locais:', error);
    return [];
  }
}
