import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductsComponent } from './show-products.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ShowProductsComponent', () => {
  let component: ShowProductsComponent;
  let fixture: ComponentFixture<ShowProductsComponent>;
  let httpClient: HttpClient;
  let http: HttpClientTestingModule;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProductsComponent ],
      imports:[HttpClientTestingModule, DxDataGridModule, DxButtonModule, FormsModule, ReactiveFormsModule]
    })
    .compileComponents();

    httpClient = TestBed.inject(HttpClient);
    fixture = TestBed.createComponent(ShowProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
