export class promocion {
  constructor() { }

  public id: number = 0; //-
  public nombre: string = "";//-
  public fecha_hora_inicio: string = '01/01/1900:00:00:00';//-
  public fecha_hora_fin: string = '01/01/1900:00:00:00';//-
  public vigencia_indefinida: boolean = false;//-
  public id_tipos_herencia_promo: number = 0; //cat_tipos_herencia //-
  public id_cat_tipo_condicion: number = 0; //cat_tipo_condicion //-
  public monto_condicion: number = 0; //-
  public incluir_desc_adic: boolean = false;//-
  public id_tipo_beneficio: number = 0;
}

export class cat_promos {
  constructor() { }
  public cat_tipos_herencia: any[];
  public cat_tipo_condicion: any[];
  public cat_msi: any[];
  public allProductos: any[];
  public justProductos: any[];
  public allEntidades: any[];
  public allEntidades_e: any[];
  public allsublineas: any[];
  public allsucursales: any[];
  public all_promociones: any[]
}
