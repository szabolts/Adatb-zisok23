import { type } from "os";

export type Csapat = {
  csapatID: number;
  csapatnev: string;
  varos: string;
  alapitva: number;
};

export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
};
export type Jatekos = {
  jatekosID: number;
  jatekosnev: string;
  szul_datum: Date;
  allampolgarsag: string;
  poszt: string;
  csapatID: number;
};

export type Merkozes = {
  merkozesID: number;
  palya?: string;
  datumIdopont?: Date;
  hazaiCsapat?: Csapat;
  vendegCsapat?: Csapat;
  hazaiEredmeny?: number;
  vendegEredmeny?: number;
  hazaiCsapatNev?: string;
  vendegCsapatNev?: string;
};

export type FiatalJatekos = {
  jatekosID: number;
  jatekosnev: string;
  szul_datum: Date;
  allampolgarsag: string;
  poszt: string;
  csapatID: number;
  csapatnev: string;
};

export type CsapatEredmenyek = {
  csapatnev: string;
  gyozelmek: number;
  veresegek: number;
  dontetlenek: number;
  pontok: number;
};

export type csapatGolok = {
  csapatnev: string;
  hazaiGolok: number;
  vendegGolok: number;
  osszesGol: number;
};

export type CsapatEredmenyekGolok = {
  csapatnev: string;
  gyozelmek: number;
  veresegek: number;
  dontetlenek: number;
  pontok: number;
  hazaiGolok: number;
  vendegGolok: number;
  osszesGol: number;
};


export type JatekosCsoportositas = {
  allampolgarsag: string;
  darab: string;
};

export type AtlagEletkor = {
  csapatnev: string;
  atlag: number;
}

export type AtlagEletkorString = {
  csapatnev: string;
  atlag: string;
}

export type SessionType = {
  user: {
    name: string;
    email: string;
  };
  expires: string;
};
