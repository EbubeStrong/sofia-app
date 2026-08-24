import { IOptions } from "./general";

export type DepartmentRequest = Sofiamatics.Request<
  null,
  null,
  {
    departments: {
      departmentName: string;
      isCenterOfExcellence: boolean;
    }[];
  }
>;

export type DepartmentResponse = Sofiamatics.Response<{
  departments: {
    departmentName: string;
    isCenterOfExcellence: boolean;
    id: string;
    staffCount: number;
    createdAt: Date;
  }[];
}>;

export type TDepartmentsResp = Sofiamatics.Response<{
  data: {
    departmentName: string;
    isCenterOfExcellence: boolean;
    id: string;
    staffCount: number;
    createdAt: Date;
  }[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}>;

export type WardsRequest = Sofiamatics.Request<
  null,
  null,
  {
    name: string;
    code: string;
    departmentId: string;
    floor: number;
    capacity: number;
    description: string;
  }
>;

export type WardsResponse = Sofiamatics.Response<{
  name: string;
  code: string;
  department: string;
  building: string;
  floor: number;
  capacity: number;
  description: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}>;

export type TWardsResp = Sofiamatics.Response<{
  data: {
    name: string;
    code: string;
    department: string;
    building: string;
    floor: number;
    capacity: number;
    description: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}>;

export type RoomsRequest = Sofiamatics.Request<
  null,
  null,
  {
    roomNumber: string;
    wardId: string;
    roomTypeId: number;
    hasPrivateBathroom: boolean;
    features: string;
  }
>;

export type RoomsResponse = Sofiamatics.Response<{
  id: string;
  roomboolean: string;
  wardId: string;
  roomTypeId: number;
  hasPrivateBathroom: number;
  features: boolean;
  createdAt: Date;
  updatedAt: Date;
}>;

export type TRoomTypesResp = Sofiamatics.Response<
  {
    id: number;
    name: string;
    description: string;
  }[]
>;

export type TRoomsResp = Sofiamatics.Response<{
  data: {
    roomNumber: string;
    roomTypeName: string;
    roomTypeId: number;
    hasPrivateBathroom: boolean;
    features: string[];
    wardId: string;
    wardName: string;
    capacity: number;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}>;

export type BedsRequest = Sofiamatics.Request<
  null,
  null,
  {
    bedNumber: string;
    dailyRate?: number;
    roomId: string;
    bedTypeId: number;
    features: string;
    equipments: string;
  }
>;

export type BedsResponse = Sofiamatics.Response<{
  id: string;
  bedNumber: string;
  dailyRate: number;
  roomId: string;
  bedTypeId: number;
  features: string;
  equipments: string;
  isOccupied: boolean;
  createdAt: Date;
  updatedAt: Date;
}>;

export type TBedTypesResp = Sofiamatics.Response<
  {
    id: number;
    name: string;
    description: string;
  }[]
>;

export type TBedsResp = Sofiamatics.Response<{
  data: {
    name: string;
    equipments: string[];
    features: string[];
    bedTypeName: string;
    bedTypeId: number;
    dailyRate: number;
    bedNumber: string;
    roomNumber: string;
    isOccupied: boolean;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}>;

export interface WardSchemaProps {
  deptOptions: IOptions[];
  deptLoading: boolean;
}

export interface RoomSchemaProps {
  wardOptions: IOptions[];
  wardLoading: boolean;
  roomTypeOptions: IOptions[];
  roomTypeLoading: boolean;
}

export interface BedSchemaProps {
  roomTypeOptions?: IOptions[];
  roomTypeLoading?: boolean;
  bedTypeOptions: IOptions[];
  bedTypeLoading: boolean;
}
