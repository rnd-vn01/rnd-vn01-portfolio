export class AcupointDto {
  _id: string;
  code: string;
  name: string;
  description: string;
  anatomy: string;
  technique: string;
  functionality: string[];
  caution: string;
}

export class AcupointResponeDto {
  'vi': AcupointDto;
  'en': AcupointDto;
}
