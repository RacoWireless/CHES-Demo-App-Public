/*
 * @Author: mamal@korewireless.com
 * @Date: 2021-08-03 13:57:35
 * @Last Modified by: mamal@korewireless.com
 * @desc [Model file that contains interfaces.]
 */

export interface EncryptionKeys {
  key_alias?: string;
  key_id?: string;
  status?: string;
  key_spec?: string;
  id?: number;
}

export interface PatientLists {
  id?: number;
  patient_id?: string;
  shared_user_id?: string;
}

export interface Column {
  field: string;
  header: string;
  is_filter_enabled?: boolean;
  is_sort_enabled?: boolean;
}

export interface SortOrder {
  sort_order: string;
  prime_table_sort_order: number;
}

export interface PeripheralLists {
  id?: number;
  kit_user_id?: string;
  telemetry_encrypted_data?: string;
  telemetry_decrypted_data?: string;
  payload_creation?: number;
  mac_address?: string;
  last_reading?: number;
  kit_id?: string;
  kafka_topic?: string;
  hash?: string;
  gateway_id?: string;
  cert_date?: string;
  device_type?: string;
  make?: string;
  model?: string;
  updated_time?: number;
  created_time?: number;
  created_by?: string;
  updated_by?: string;
  telemetry_data?: TelemetryData;
  reason_code?: string;
}

export interface TelemetryData {
  systolic?: string;
  diastolic?: string;
  pulseRate?: string;
  temperature?: string;
  timestamp?: Date;
}
