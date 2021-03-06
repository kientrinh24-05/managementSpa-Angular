import { MustMatch } from '../../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import * as moment from 'moment';
import 'rxjs/add/operator/takeUntil';
declare var $: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent extends BaseComponent implements OnInit {
  public users: any;
  public user: any;
  public totalRecords:any;
  public pageSize = 10;
  public pageNumber = 1;
  public ascSort = true;
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
  constructor(private fb: FormBuilder, injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.formsearch = this.fb.group({
      'username': [''],
      'taikhoan': [''],     
    });
   
   this.search();
  //  this.loadPage(1);
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
    this._api.post('/api/v1/user/user_get_list_paging_sort_search_filter',{pageNumber: this.pageNumber, pageSize: this.pageSize,searchKey:this.searchKey,sortCase:this.sortCase,ascSort:this.ascSort,status:this.status}).takeUntil(this.unsubscribe).subscribe(res => {
      this.users = res.data.content;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }
  searchName() { 
    this.page = 1;
    this.pageSize = 10
    this._api.post('/api/v1/user/user_get_list_paging_sort_search_filter',{pageNumber: this.pageNumber, pageSize: this.pageSize,sortCase:this.sortCase,ascSort:this.ascSort,status:this.status, searchKey: this.formsearch.get('username').value}).takeUntil(this.unsubscribe).subscribe(res => {
      this.users = res.data.content;
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

  onSubmit(value) {
    this.submitted = true;
    if (this.formdata.invalid) {
      return;
    } 
    if(this.isCreate) { 
      this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
        let data_image = data == '' ? null : data;
        let tmp = {
          //  image_url:data_image,
            address:value.address,
           gender:value.gender,
           email:value.email,
           username:value.username,
           password:value.password,
           role:value.role,
           birthDay: moment(value.birthDay).format('YYYY/DD/MM')         
          };
          console.log(tmp ,'tmp');
          
        this._api.post('/api/v1/user/user_create',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Th??m th??nh c??ng');
          this.search();
          this.closeModal();     
          });
      });
    } else { 
      this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
        // let data_image = data == '' ? null : data;
        let tmp = {
          address:value.address,
          gender:value.gender,
          email:value.email,
          username:value.username,
          password:value.password,
          role:value.role,
          birthDay:moment(value.birthDay).format('YYYY/DD/MM'),
          id:this.user.id,          
          };
        console.log(tmp ,'tmp');
        
        this._api.put('/api/v1/user/user_update',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('C???p nh???t th??nh c??ng');
          this.search();
          this.closeModal();
          });
      });
    }

    this.loadPage(1);
   
  } 

  onDelete(row) { 
    this._api.post('/api/v1/user/user_delete',[row.id]).takeUntil(this.unsubscribe).subscribe(res => {
      alert('X??a th??nh c??ng');
      this.search(); 
      // this.loadPage(1);
      });
  }

  Reset() {  
    this.user = null;
    this.formdata = this.fb.group({
      'username': ['', Validators.required],
      'birthDay': [this.today, Validators.required],
      'address': [''],
      'gender': [this.gender[0].value, Validators.required],
      'email': ['', [Validators.required,Validators.email]],
      'password': ['', [this.pwdCheckValidator]],
      'role': [this.role[0].value, Validators.required],
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
        'username': ['', Validators.required],
        'birthDay': ['', Validators.required],
        'address': [''],
        'gender': ['', Validators.required],
        'email': ['', [Validators.required,Validators.email]],
        'password': ['', [this.pwdCheckValidator]],
        'role': ['', Validators.required],
      }, {
      });
      this.formdata.get('birthDay').setValue(this.today);
      this.formdata.get('gender').setValue(this.gender[0].value); 
      this.formdata.get('role').setValue(this.role[0].value);
      this.doneSetupForm = true;
    });
  }

  public openUpdateModal(row) {
    console.log(row,'row');
    
    this.doneSetupForm = false;
    this.showUpdateModal = true; 
    this.isCreate = false;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this._api.get('/api/v1/user/user_get_detail/'+ row.id).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.user = res.data; 
        console.log(res);
        
        let birthDay = new Date(this.user.birthDay);
          this.formdata = this.fb.group({
            'username': [this.user.username, Validators.required],
            'birthDay': [birthDay, Validators.required],
            'address': [this.user.address],
            'gender': [this.user.gender, Validators.required],
            'email': [this.user.email, [Validators.required,Validators.email]],
            'password': [this.user.password, [this.pwdCheckValidator]],
            'role': [this.user.role, Validators.required],
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
