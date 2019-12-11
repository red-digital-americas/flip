import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui-pro/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
// import { navItems } from './../../_nav';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatosService } from '../../../datos.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Building } from '../models/building';





@Component({
  templateUrl: 'communities.component.html',
  styleUrls: ['./communities.component.scss']


})
export class CommunitiesComponent implements OnInit {

  posts: any[];
  email: string;
  password: string;
  token: boolean;
  message: {};
  validar: boolean = false;
  idpost: any;
  IDUSR: string = "0";
  IDBUILD: string = "0";
  buildButton = false;
  public user: string[];
  submitted: boolean = false;
  nrooms: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  typeNumber: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  BuildModel: Building;
  photo: any;
  buildingForm: FormGroup;
  constructor(private router: Router,
    private heroService: DatosService,
    private _formBuilder: FormBuilder) { }




  ngOnInit() {
    if (localStorage.getItem("user") == undefined) {
      this.router.navigate(['/login']);
    }
    else {

      this.buildingForm = this._formBuilder.group({
        name: ['', Validators.required],
        direction: ['', Validators.required],
        description: ['', Validators.required],
        photo: ['', Validators.required],
        status: ['',],
        longitud: [],
        latitud: [],
        // roomsNumber: [''],
        // rooms: new FormArray([]),
        typeNumber: [''],
        typeRoom: new FormArray([])
      });

      this.user = JSON.parse(localStorage.getItem("user"));
      console.log(this.user);
      this.IDUSR = JSON.parse(localStorage.getItem("user")).id;
      this.IDBUILD = JSON.parse(localStorage.getItem("user")).buildingId;
      this.get_builds();
    }
  }


  get_builds() {
    // 
    var creadoobj = { buildingid: this.IDBUILD, userid: this.IDUSR };

    this.heroService.ServicioPostBuilds("SeeBuilding", creadoobj).subscribe((value) => {
      debugger;
      switch (value.result) {
        case "Error":
          console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
          break;
        default:
          if (value.result == "Success") {
            this.posts = value.item;
          }
      }
    });
  }

  AddBuilding() {
    this.buildButton = true;
  }


  gotonewsfeed(id?: number) {
    this.router.navigate(['/newsfeed/' + id])

  }

  get f() { return this.buildingForm.controls; }
  get t() { return this.f.rooms as FormArray; }
  get formType() { return this.f.typeRoom as FormArray; }
  onChangeRooms(e) {
    debugger;
    const roomsNumber = parseInt(e.target.value) || 0;
    if (this.t.length < roomsNumber) {
      for (let i = this.t.length; i < roomsNumber; i++) {
        this.t.push(this._formBuilder.group({
          name: ['', Validators.required],
          description: ['', [Validators.required]],
          price: ['', Validators.required],
          typeRoom: ['']

        }));
      }
    } else {
      for (let i = this.t.length; i >= roomsNumber; i--) {
        this.t.removeAt(i);
      }
    }
  }
  onChangeType(e) {
    debugger;
    const typeNumber = parseInt(e.target.value) || 0;
    if (this.formType.length < typeNumber) {
      for (let i = this.formType.length; i < typeNumber; i++) {
        this.formType.push(this._formBuilder.group({
          type: ['', Validators.required],
          capacity: ['', [Validators.required]],
        }));
      }
    } else {
      for (let i = this.formType.length; i >= typeNumber; i--) {
        this.formType.removeAt(i);
      }
    }
  }

  onSubmit() {
    debugger;
    this.submitted = true;
    this.BuildModel = this.buildingForm.value;
    this.BuildModel.status = true;
    this.BuildModel.id = 0;

    this.heroService.ServiceSaveBuilding(this.buildingForm.value).subscribe(response => {
      debugger;
    }, error => {
      debugger;
      alert("Error al guardar")
    });
    // stop here if form is invalid
    // if (this.buildingForm.invalid) {
    //     return;
    // }

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.buildingForm.value, null, 4));
  }
  uploadPhoto(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (imageRender: any) => {
        this.buildingForm.controls["photo"] = imageRender.target.result;
        this.photo= imageRender.target.result;
        // this.equipment.comercialInvoice = imageRender.target.result;
      }
    }
  }

  cancel(){
    this.buildingForm.reset();
    this.buildButton = false;
  }

}




