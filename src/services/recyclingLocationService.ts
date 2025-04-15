import api from "./api";

interface RecyclingLocation {
  id?: string;
  name: string;
  address: string;
  materialsAccepted?: string;
  contact?: string;
  openingHours?: string;
  latitude?: number;
  longitude?: number;
}

export async function getRecyclingLocations() {
  try {
    const response = await api.get<RecyclingLocation[]>("/recycling-locations");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar locais de reciclagem:", error);
    return [];
  }
}

export async function createRecyclingLocation(data: RecyclingLocation) {
  try {
    const response = await api.post("/recycling-locations", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar local de reciclagem:", error);
    throw error;
  }
}

export async function deleteRecyclingLocation(id: string) {
  try {
    await api.delete(`/recycling-locations/${id}`);
  } catch (error) {
    console.error(`Erro ao deletar local de reciclagem:`, error);
    throw error;
  }
  
}

export async function getMyRecyclingLocations() {
  try {
    const response = await api.get<RecyclingLocation[]>("/recycling-locations/my-locations");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar seus locais de reciclagem:", error);
    return [];
  }
}

export async function getAllLatitudeLongitude() {
  try {
    const response = await api.get<RecyclingLocation[]>("/recycling-locations");
    return response.data.map(location => (
      {
        id: location.id,
        latitude: location.latitude,
        longitude: location.longitude,
        name: location.name,
      }
    ));
  } catch (error) {
    console.error("Erro ao buscar todos os locais de reciclagem:", error);
    return [];
  }
}

