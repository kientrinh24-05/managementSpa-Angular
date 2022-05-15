
import { MustMatch } from '../../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import * as moment from 'moment';
import 'rxjs/add/operator/takeUntil';
declare var $: any;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent extends BaseComponent implements OnInit {
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
    this.search();
  }
  search() { 
    this.page = 1;
    this.pageSize = 10
    this._api.post('/api/v1/contact/contact_get_list_paging_sort_search_filter',{pageNumber: this.pageNumber, pageSize: this.pageSize,sortCase:this.sortCase,ascSort:this.ascSort}).takeUntil(this.unsubscribe).subscribe(res => {
      this.users = res.data.content;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }
  handleChange(id,value) {
    // let data_image = data == '' ? null : data;
    let tmp = {
      status:parseInt(value),
      contactId:id,          
      };
      console.log(tmp ,'tmp');
      
    this._api.post('/api/v1/contact/contact_change_status',tmp).takeUntil(this.unsubscribe).subscribe(res => {
        alert('Cập nhật trạng thái thành công');
        this.search();
      });

}
  loadPage(pageNumber) { 
    this._api.post('/api/v1/contact/contact_get_list_paging_sort_search_filter',{pageNumber: this.pageNumber , pageSize: this.pageSize,sortCase:this.sortCase,ascSort:this.ascSort}).takeUntil(this.unsubscribe).subscribe(res => {
      this.users = res.data.content;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  } 
}
