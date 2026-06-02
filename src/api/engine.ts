import type { EngineResponse, DriveResponse } from '../types/api.types';
import { ENGINE_ENDPOINT } from '../constants/api';

export async function startEngine(id: number): Promise<EngineResponse> {
  const res = await fetch(`${ENGINE_ENDPOINT}?id=${id}&status=started`, { method: 'PATCH' });
  return res.json();
}

export async function stopEngine(id: number): Promise<EngineResponse> {
  const res = await fetch(`${ENGINE_ENDPOINT}?id=${id}&status=stopped`, { method: 'PATCH' });
  return res.json();
}

export async function driveEngine(id: number): Promise<DriveResponse> {
  const res = await fetch(`${ENGINE_ENDPOINT}?id=${id}&status=drive`, { method: 'PATCH' });
  if (res.status === 500) return { success: false };
  return res.json();
}
