import { ApiUploadService } from './../../../lib/api-upload.service';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import * as moment from 'moment';
import 'rxjs/add/operator/takeUntil';
import { TmplAstText } from '@angular/compiler';
declare var $: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent extends BaseComponent implements OnInit {
  public users: any;
  public user: any;
  public totalRecords:any;
  public pageSize = 10;
  public pageNumber = 1;
  public ascSort = 1;
  public sortCase = 1;
  public page = 1;
  public status = 1;
  public searchKey = "";
  public uploadedFiles: any[] = [];
  public formsearch: any;
  public formdata: any;
  public doneSetupForm: any;  
  public showUpdateModal:any;
  public isCreate:any;
  submitted = false;
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;

  public avatarFile: File;

  constructor(private fb: FormBuilder, injector: Injector) { 
    super(injector);
  }

  ngOnInit(): void {
    this.formsearch = this.fb.group({
      'name': [''],
      // 'taikhoan': [''],     
    });
   
   this.search();
  }

  
  loadPage(pageNumber) { 
    this._api.post('/api/v1/user/user_get_list_paging_sort_search_filter',{pageNumber: this.pageNumber , pageSize: this.pageSize,sortCase:this.sortCase,ascSort:this.ascSort,searchKey:this.searchKey}).takeUntil(this.unsubscribe).subscribe(res => {
      this.users = res.data.content;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  } 

  search() { 
    this.page = 1;
    this.pageSize = 10
    this._api.post('/api/v1/products/product_get_list_paging_sort_search_filter',{pageNumber: this.pageNumber, pageSize: this.pageSize,searchKey:this.searchKey,sortCase:this.sortCase,ascSort:this.ascSort,status:this.status}).takeUntil(this.unsubscribe).subscribe(res => {
      this.users = res.data.content;
      console.log(res.data.content);
      
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }
  searchName() { 
    this.page = 1;
    this.pageSize = 10
    this._api.post('/api/v1/products/product_get_list_paging_sort_search_filter',{pageNumber: this.pageNumber, pageSize: this.pageSize,sortCase:this.sortCase,ascSort:this.ascSort,status:this.status, searchKey: this.formsearch.get('name').value}).takeUntil(this.unsubscribe).subscribe(res => {
      this.users = res.data.content;

      console.log(res.data.content);
      
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }

  pwdCheckValidator(control){
    var filteredStrings = {search:control.value, select:'@#!$%&*'}
    var result = (filteredStrings.select.match(new RegExp('[' + filteredStrings.search + ']', 'g')) || []).join('');
    if(control.value.length < 6 || !result){
        return {password: true};
    }
  }

  get f() { return this.formdata.controls; }

  onSelectFile(event) {
    this.avatarFile = event.target.files[0];
    console.log(event.target.files);
    
  }

  onSubmit(value) {
    this.submitted = true;
    if (this.formdata.invalid) {
      return;
    } 
    if(this.isCreate) {
      // const formData = new FormData();
      // formData.append('file', this.file_image.files[0])

      // let data_image = data == '' ? null : data;
      // const formData = new FormData();
      console.log(this.avatarFile);
      
      const formData = new FormData();
      formData.append('name', value.name)
      formData.append('price', value.price)
      formData.append('description', value.description)
      formData.append('imageFile', this.avatarFile)

      console.log(value , 'value');
      
       let tmp = {
       //imageFile:this.file_image.files[0].name,
        name:value.name,
        price:value.price,  
        description:value.description,      
       // imageFile: this.file_image.files[0]
        };
     // formData.append('tmp',tmp.imageFile);
      //console.log(this.file_image.files[0] , 'File Image');
      console.log(this._apiUpload);
      fetch('http://localhost:8081/api/v1/products/product_create', {
        method: 'POST',
        body: formData
      }).then(
        response => {
          alert('Thêm thành công');
          this.search();
          this.closeModal();
          return true;
        }
      )
      // this._apiUpload.post('/api/v1/products/product_create',formData).takeUntil(this.unsubscribe).subscribe(res => {
      //   closeModal();
      //   });
      this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
        console.log(data);
        
      });
    } else { 
      this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
        let data_image = data == '' ? null : data;
        let tmp = {
          imageFile:data_image,
          name:value.name,
          price:value.price,
          description:value.description,  
          id:this.user.id,          
          };
        console.log(tmp ,'tmp');
        
        this._apiUpload.put('/api/v1/products/product_update',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.search();
          this.closeModal();
          });

        
      });
    }

   
  } 

  onDelete(row) { 
    this._api.post('/api/v1/products/product_delete',[row.id]).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Xóa thành công');
      this.search(); 
      // this.loadPage(1);
      });
  }

  Reset() {  
    this.user = null;
    this.formdata = this.fb.group({
      'name': ['', Validators.required],
      // 'birthDay': [this.today, Validators.required],
      'price': ['', [Validators.required]],
      'description': ['', [Validators.required]],

    }, {
      // validator: MustMatch('password', 'nhaplaipassword')
    }); 
  }

  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.user = null;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this.formdata = this.fb.group({
        'name': ['', Validators.required],
        'price': ['', Validators.required],
        'description': ['',Validators.required],
      }, {
      });
      // this.formdata.get('birthDay').setValue(this.today);
      // this.formdata.get('gender').setValue(this.gender[0].value); 
      // this.formdata.get('role').setValue(this.role[0].value);
      this.doneSetupForm = true;
    });
  }

  public openUpdateModal(row) {
    
    this.doneSetupForm = false;
    this.showUpdateModal = true; 
    this.isCreate = false;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this._api.get('/api/v1/products/product_get_detail/'+ row.id).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.user = res.data;       
          this.formdata = this.fb.group({
            'name': [this.user.name, Validators.required],
            'price': [this.user.price],
            'description': [this.user.description, Validators.required],
            'imgUrl': [this.user.imgUrl],
          }, {
          
          }); 
          this.doneSetupForm = true;
        }); 
    }, 700);
  }

  closeModal() {
    $('#createUserModal').closest('.modal').modal('hide');
  }

}
